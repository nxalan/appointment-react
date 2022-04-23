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
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard: React.FC<Props> = ({ loadAppointments }: Props) => {
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
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'birthday',
      headerName: 'Data de Nascimento',
      type: 'date',
      flex: 0.5,
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
      headerAlign: 'center',
      align: 'center',
      valueGetter: getAppointmentDate,
    },
    {
      field: 'appointment_date_hour',
      headerName: 'Horário de Agendamento',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      valueGetter: getAppointmentTime,
    },
    {
      field: 'status-translated',
      headerName: 'Status',
      headerAlign: 'center',
      flex: 0.5,
      align: 'center',
      valueGetter: getStatusTranslated,
    }
  ];

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
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard