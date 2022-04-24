import React, { useState, useEffect } from 'react'
import { DeleteAppointment, LoadAppointments } from '@/domain/usecases'
import { Header, Footer, Table, Snackbar, AlertDialog } from '@/presentation/components'
import Styles from './dashboard-styles.scss'
import IconButton from '@mui/material/IconButton'
import { MdEdit, MdDelete } from 'react-icons/md'
import Tooltip from '@mui/material/Tooltip'
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const Dashboard: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  const [appointmentsList, setAppointmentsList] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState({ id: '', name: '' })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
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

  function getAppointmentDate (params) {
    return format(new Date(params.row.appointment_date), 'dd/MM/yyyy')
  }

  function getAppointmentTime (params) {
    return format(new Date(params.row.appointment_date), 'HH:mm')
  }

  function getStatusTranslated (params) {
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
            <IconButton disabled={loading} onClick={() => handleOpenDialog(params.row.id, params.row.name)}>
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
      flex: 0.5,
      align: 'center',
      valueGetter: getStatusTranslated
    }
  ]

  const handleDeleteAppointmentSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      const result = await deleteAppointment.delete({ id: selectedAppointment.id })
      if (result) {
        setDeleteDialogOpen(false)
        setRefresh(refresh + 1)
        setDeleteSnackbarSuccessOpen(true)
      } else {
        setDeleteDialogOpen(false)
        setDeleteSnackbarErrorOpen(true)
      }
    } catch (error) {
      setDeleteDialogOpen(false)
      setDeleteSnackbarErrorOpen(true)
    }
    setLoading(false)
  }

  const handleOpenDialog = (id: string, name: string) => {
    setSelectedAppointment({ id, name })
    setDeleteDialogOpen(true)
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
          open={deleteDialogOpen}
          closeDialog={setDeleteDialogOpen}
          handleConfirm={async () => handleDeleteAppointmentSubmit()}
          title={'Deseja realmente excluir o agendamento?'}
          message={`O agendamento de ${selectedAppointment.name} será permanentemente excluido do sistema`}
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

export default Dashboard
