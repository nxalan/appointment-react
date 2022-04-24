import React, { useState, useEffect } from 'react'
import { DeleteAppointment, LoadAppointments } from '@/domain/usecases'
import { Header, Footer, Table, Snackbar, AlertDialog } from '@/presentation/components'
import Styles from './dashboard-styles.scss'
import IconButton from '@mui/material/IconButton'
import { MdEdit, MdDelete, MdDescription } from 'react-icons/md'
import Tooltip from '@mui/material/Tooltip'
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const DashboardPage: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  const [appointmentsList, setAppointmentsList] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState({ 
    id: '',
    name: '' ,
    birthday: null,
    appointment_date: null,
    status: '',
    status_comment: ''
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [deleteSnackbarSuccessOpen, setDeleteSnackbarSuccessOpen] = useState(false)
  const [deleteSnackbarErrorOpen, setDeleteSnackbarErrorOpen] = useState(false)
  const [gridPage, setGridPage] = useState(0)
  const [refresh, setRefresh] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    loadAppointments.loadAll().then((appointments) => {
      setAppointmentsList(appointments)
      setLoading(false)
    })
  }, [refresh])

  function getAppointmentDate(params) {
    return format(new Date(params.row.appointment_date), 'dd/MM/yyyy')
  }

  function getAppointmentTime(params) {
    return format(new Date(params.row.appointment_date), 'HH:mm')
  }

  function getStatusTranslated(params) {
    let message = ''
    switch (params.row.status) {
      case 'NOT VACCINED':
        message = 'NÃO ATENDIDO'
        break
      case 'VACCINED':
        message = 'ATENDIDO'
        break
      default:
        message = params.row.status
    }
    return message
  }

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.4,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Tooltip title="Editar">
            <IconButton disabled={loading} onClick={() => history.push(`/agendamento/${params.row.id}`)}>
              <MdEdit className={Styles.editIcon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton disabled={loading} onClick={() => handleOpenDeleteDialog(params.row)}>
              <MdDelete className={Styles.deleteIcon} />
            </IconButton>
          </Tooltip>
        </>
      )
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'birthday',
      headerName: 'Data de Nascimento',
      type: 'date',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(new Date(params.value), 'dd/MM/yyyy')
      }
    },
    {
      field: 'appointment_date_day',
      headerName: 'Data de Agendamento',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getAppointmentDate
    },
    {
      field: 'appointment_date_hour',
      headerName: 'Horário de Agendamento',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getAppointmentTime
    },
    {
      field: 'status-translated',
      headerName: 'Status',
      headerAlign: 'center',
      flex: 0.8,
      align: 'center',
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          {getStatusTranslated(params)}
          {params.row.status === 'VACCINED' && (
            <Tooltip title="Conclusão do Atendimento">
              <IconButton disabled={loading} onClick={() => handleOpenStatusDialog(params.row)}>
                <MdDescription className={Styles.descriptionIcon} />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) 
    },
  ]

  const handleDeleteAppointmentSubmit = async (): Promise<void> => {
    if (!loading) {
      setLoading(true)
      setDeleteDialogOpen(false)
      try {
        await deleteAppointment.delete({ id: selectedAppointment.id })
        setRefresh(refresh + 1)
        setDeleteSnackbarSuccessOpen(true)
      } catch (error) {
        setDeleteSnackbarErrorOpen(true)
      }
      setLoading(false)
    }
  }

  const handleOpenDeleteDialog = (appointment) => {
    setSelectedAppointment(appointment)
    setDeleteDialogOpen(true)
  }

  const handleOpenStatusDialog = (appointment) => {
    setSelectedAppointment(appointment)
    setStatusDialogOpen(true)
  }

  const handleSnackbarSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setDeleteSnackbarSuccessOpen(false)
  }

  const handleSnackbarErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setDeleteSnackbarErrorOpen(false)
  }

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <Snackbar
          severity={'success'}
          open={deleteSnackbarSuccessOpen}
          message={'Agendamento excluido com sucesso!'}
          onClose={() => handleSnackbarSuccessClose()}
        />
        <Snackbar
          severity={'error'}
          open={deleteSnackbarErrorOpen}
          message={'Erro ao excluir agendamento!'}
          onClose={() => handleSnackbarErrorClose()}
        />
        <AlertDialog
          type="dialogConfirmation"
          open={deleteDialogOpen}
          closeDialog={setDeleteDialogOpen}
          handleConfirm={async () => handleDeleteAppointmentSubmit()}
          title={'Deseja realmente excluir o agendamento?'}
          message={`O agendamento de ${selectedAppointment.name} será permanentemente excluido do sistema`}
        />
        <AlertDialog
          type="dialogInformation"
          open={statusDialogOpen}
          closeDialog={setStatusDialogOpen}
          title={`Como foi a conclusão do atendimento de ${selectedAppointment.name}`}
          message={selectedAppointment.status_comment}
        />
        <Table
          rows={appointmentsList}
          columns={columns}
          page={gridPage}
          onPageChange={setGridPage}
          loading={loading}
        />
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardPage
