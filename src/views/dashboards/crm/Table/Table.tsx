// import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import ButtonFilter from 'src/pages/components/button-filter'
import CustomModal from 'src/pages/components/modal'

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import CustomPagination from 'src/views/accounts/Table/CustomPagination'
import ModalReinsurers from '../ModalReinsurers'
import { brokers, data, debt, status } from './data'
import HeaderTable from './HeaderTable'
import Status from './Status'

interface INearlyPaymentStatus {
  statId: number
  insured: string
  broker: string
  nextDueDate: string
  debt: string
  status: string
  actions: string
}

const column: GridColumns<INearlyPaymentStatus> = [
  {
    flex: 0.1,
    field: 'insured',
    headerName: 'INSURED',
    minWidth: 150,
    maxWidth: 191,
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
          <ButtonFilter dataFilter={brokers} insured />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.insured}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'broker',
    headerName: 'BROKER',
    minWidth: 150,
    maxWidth: 191,
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
          <ButtonFilter dataFilter={brokers} />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ pl: 0, color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.broker}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'nextDueDate',
    headerName: 'NEXT DUE DATE',
    minWidth: 150,
    maxWidth: 191,
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
          <ButtonFilter dataFilter={brokers} date />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 500 }}
      >
        {row.nextDueDate}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'debt',
    headerName: 'DEBT',
    minWidth: 150,
    maxWidth: 191,
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
          <ButtonFilter dataFilter={debt} />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 500 }}
      >
        {row.debt}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'status',
    headerName: 'STATUS',
    minWidth: 150,
    maxWidth: 191,
    type: 'string',
    align: 'left',
    cellClassName: 'account-column-cell-pl-0',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
          <ButtonFilter dataFilter={status} />
        </div>
      )
    },
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 3 }}>
        <Status status={row.status} />
      </Box>
    )
  },
  {
    flex: 0.1,
    field: 'actions',
    headerName: 'ACTIONS',
    minWidth: 150,
    maxWidth: 191,
    sortable: false,
    disableColumnMenu: true,
    cellClassName: 'account-column-cell-pl-0',
    renderHeader: ({ colDef }) => {
      const { headerName } = colDef

      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            component={'span'}
            variant='body1'
            sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px12, color: colors.text.light, fontWeight: 500 }}
          >
            {headerName}
          </Typography>
        </div>
      )
    },
    renderCell: () => (
      <CustomModal width={'41%'} height={'66.5%'} bgColor={'background.paper'} top={'50%'} left={'50%'}>
        <ModalReinsurers />
      </CustomModal>

      // <Button variant='outlined' sx={{ width: '100%', height: '30px', fontSize: '13px' }}>
      //   Balance Preview
      // </Button>
    )
  }
]

const Table = () => {
  return (
    <>
      <HeaderTable />
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rows={data}
        columns={column}
        pagination
        pageSize={4}
        getRowId={(row: any) => row.statId}
        components={{
          Pagination: CustomPagination
        }}
        sx={{ width: '100%' }}
      />
    </>
  )
}

export default Table
