import React, { useState, useEffect } from "react"
import { DeleteAppointment, LoadAppointments } from "@/domain/usecases"
import { Header, Footer, Table, Snackbar, AlertDialog } from "@/presentation/components"
import Styles from './dashboard-styles.scss'
import IconButton from '@mui/material/IconButton';
import { MdEdit, MdDelete } from 'react-icons/md';
import Tooltip from "@mui/material/Tooltip";
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useHistory } from "react-router-dom";

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  const [appointmentsList, setAppointmentsList] = useState([])
  const history = useHistory()

  useEffect(() => {
    loadAppointments.loadAll().then((appointments) => {
      setAppointmentsList(appointments)
    })
  }, [])

  function getAppointmentDate(params) {
    return format(new Date(params.row.appointment_date), 'dd/MM/yyyy');
  }

  function getAppointmentTime(params) {
    return format(new Date(params.row.appointment_date), 'HH:mm');
  }

  function getStatusTranslated(params) {
    let message = ''
    switch (params.row.status) {
      case 'NOT VACCINED':
        message = 'NÃO ATENDIDO'
        break;
      case 'VACCINED':
        message = 'ATENDIDO'
        break;
      default:
        message = params.row.status
    }
    return message
  }

  /*
  function openDeleteDialog(appointment) {
    setCurrentAppointment(appointment)
    setDeleteDialog(true)
  }

  function closeDeleteDialog() {
    setDeleteDialog(false)
  }
  */

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
            <IconButton onClick={() => history.push(`/agendamento/${params.row.id}`)}>
              <MdEdit className={Styles.editIcon} />
            </IconButton>
          </Tooltip>
          {/*}
          <Tooltip title="Excluir">
            <IconButton onClick={() => openDeleteDialog(params.row)}>
              <MdDelete className={Styles.deleteIcon} />
            </IconButton>
          </Tooltip>
      */}
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'birthday',
      headerName: 'Data de Nascimento',
      type: 'date',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(new Date(params.value), 'dd/MM/yyyy');
      },
    },
    {
      field: 'appointment_date_day',
      headerName: 'Data de Agendamento',
      flex: 0.5,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getAppointmentDate,
    },
    {
      field: 'appointment_date_hour',
      headerName: 'Horário de Agendamento',
      flex: 0.5,
      headerAlign: 'center',
      disableColumnMenu: true,
      align: 'center',
      valueGetter: getAppointmentTime,
    },
    {
      field: 'status-translated',
      headerName: 'Status',
      headerAlign: 'center',
      flex: 0.5,
      disableColumnMenu: true,
      align: 'center',
      valueGetter: getStatusTranslated,
    }
  ];

  /*const handleDeleteSubmit = async (appointment_id: string): Promise<void> => {
    console.log(appointment_id)
    try {
      await deleteAppointment.delete()
      closeDeleteDialog()
      setRefresh((prevValues) => prevValues + 1)
      setSuccessMessage(true)
    } catch (error) {
      closeDeleteDialog()
      setErrorMessage(true);
    }
  }
  */

  /*
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
  }

  const handleErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage(false);
  }
  */

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <Table
          rows={appointmentsList}
          columns={columns}
        />
        {/*
        <Snackbar 
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleErrorClose={handleErrorClose}
        handleSuccessClose={handleSuccessClose}
        />
        <AlertDialog
          dialogStatus={deleteDialog}
          openDialog={openDeleteDialog}
          closeDialog={closeDeleteDialog}
          handleConfirm={() => handleDeleteSubmit(currentAppointment.id)}
          title={'Deseja realmente excluir o agendamento?'}
          message={`O agendamento de ${currentAppointment.name} será permanentemente excluido do sistema`}
        />
         */}
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard