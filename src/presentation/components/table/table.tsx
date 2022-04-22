import React from "react";
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdEdit, MdDelete } from 'react-icons/md';
import Tooltip from "@mui/material/Tooltip";
import Styles from './table-styles.scss'
import { DataGrid, gridClasses, GridColDef, GridRenderCellParams, GridValueFormatterParams, ptBR } from '@mui/x-data-grid';
import { format } from 'date-fns'

const TableComponent = ({ rows = [] }) => {

  function getAppointmentDate(params) {
    return format(new Date(params.row.appointment_date), 'dd/MM/yyyy');
  }

  function getAppointmentTime(params) {
    return format(new Date(params.row.appointment_date),'HH:mm');
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

  const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Tooltip title="Editar">
            <IconButton>
              <MdEdit className={Styles.editIcon}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton>
              <MdDelete className={Styles.deleteIcon}/>
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

  return (
    <div className={Styles.formRoot}>
      <div className={Styles.formContent}>
        <div style={{ flexGrow: 1 }}>
          <StripedDataGrid
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            //hideFooter={true}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        </div>
      </div>
    </div>
  );
};


export default TableComponent;