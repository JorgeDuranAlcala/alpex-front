// import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import ButtonFilter from '@components/button-filter'

// ** Next Import

// import CustomModal from '@components/modals/modal-alpex'

import CustomPagination from 'src/views/accounts/Table/CustomPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

// import ModalReinsurers from '../ModalReinsurers'
import { data, executive } from './data'

// ** Custom Hooks imports

interface INearlyPaymentStatus {
  accountId: number
  note: string
  date: string
  executive: string
  files: string
  actions: string
}

const column: GridColumns<INearlyPaymentStatus> = [
  {
    flex: 0.1,
    field: 'note',
    headerName: 'NOTE',
    minWidth: 150,
    maxWidth: 650,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
          <ButtonFilter dataFilter={executive} insured />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>{`${row.note}`}</Typography>
    )
  },
  {
    flex: 0.1,
    field: 'date',
    headerName: 'DATE',
    minWidth: 150,
    maxWidth: 210,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
          <ButtonFilter dataFilter={executive} insured />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.date}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'executive',
    headerName: 'EXECUTIVE',
    minWidth: 150,
    maxWidth: 250,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
          <ButtonFilter dataFilter={executive} insured />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.executive}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'files',
    headerName: 'FILES',
    minWidth: 150,
    maxWidth: 250,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
          <ButtonFilter dataFilter={executive} date />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 400 }}
      >
        {row.files}
      </Typography>
    )
  }
]

const TableHistory = () => {
  return (
    <>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rows={data}
        columns={column}
        pagination
        pageSize={4}
        getRowId={(row: any) => row.accountId}
        components={{
          Pagination: CustomPagination
        }}
      />
    </>
  )
}

export default TableHistory
