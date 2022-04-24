import React, { useState } from 'react'
import { alpha, styled } from '@mui/material/styles'
import Styles from './table-styles.scss'
import { DataGrid, gridClasses, ptBR, DataGridProps, GridCallbackDetails, GridValidRowModel, GridColumns } from '@mui/x-data-grid'

type Props = {
  loading: boolean
  page: number
  onPageChange: (page: number, details: GridCallbackDetails) => void
  rows: GridValidRowModel[]
  columns: GridColumns<GridValidRowModel>
}

const TableComponent = (props: Props) => {
  const [filter, setFilter] = useState({
    items: []
  })
  const ODD_OPACITY = 0.2
  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
          ),
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            )
          }
        }
      }
    }
  }))

  return (
    <div className={Styles.formRoot}>
      <div className={Styles.formContent}>
        <div style={{ flexGrow: 1 }}>
          <StripedDataGrid
            loading={props.loading}
            page={props.page}
            onPageChange={(newPage) => props.onPageChange(newPage, {})}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rows={props.rows ? props.rows : []}
            columns={props.columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            filterModel={filter}
            onFilterModelChange={(newFilterModel) => setFilter(newFilterModel)}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TableComponent
