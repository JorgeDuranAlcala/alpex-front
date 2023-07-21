// import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import ButtonFilter from '@components/button-filter'

// import CustomModal from '@components/modals/modal-alpex'
import Button from '@mui/material/Button'

import CustomPagination from 'src/views/accounts/Table/CustomPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

// import ModalReinsurers from '../ModalReinsurers'
import { Link } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import HeaderTable from './HeaderTable'
import Status from './Status'
import { brokers, data, debt, status } from './data'

interface INearlyPaymentStatus {
  accountId: number
  installmentNumber: number
  status: string
  broker: string
  insured: string
  installment: string
  nextDueDate: string
  balanceDue: string
  actions: string
}

const userThemeConfig: any = Object.assign({}, UserThemeOptions())

const inter = userThemeConfig.typography?.fontFamilyInter

const column: GridColumns<INearlyPaymentStatus> = [
  {
    flex: 0.1,
    field: 'accountId',
    headerName: 'ACCOUNT ID',
    minWidth: 150,
    maxWidth: 150,
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
      <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        <Link sx={{ cursor: 'pointer' }}>{`#${row.accountId}`}</Link>
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'installmentNumber',
    headerName: 'INSTALLMENT ID',
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
          <ButtonFilter dataFilter={brokers} />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ pl: 0, color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.installmentNumber}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'status',
    headerName: 'STATUS',
    minWidth: 150,
    maxWidth: 210,
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
    field: 'broker',
    headerName: 'BROKER',
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
    field: 'insured',
    headerName: 'INSURED',
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
    field: 'installment',
    headerName: 'INSTALLMENT',
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
          <ButtonFilter dataFilter={brokers} insured />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
      >
        {row.installment}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'nextDueDate',
    headerName: 'DUE DATE',
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
          <ButtonFilter dataFilter={brokers} date />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 400 }}
      >
        {row.nextDueDate}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'balanceDue',
    headerName: 'BALANCE DUE',
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
          <ButtonFilter dataFilter={debt} />
        </Box>
      )
    },
    renderCell: ({ row }) => (
      <Typography
        variant='body2'
        sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 400 }}
      >
        {row.balanceDue}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'actions',
    headerName: 'ACTIONS',
    minWidth: 191,
    maxWidth: 200,
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
      <div>
        <Button
          variant='outlined'
          sx={{
            width: 'auto',
            height: '30px',
            fontSize: '13px',
            color: userThemeConfig.palette?.buttonText.primary,
            fontFamily: inter
          }}
        >
          RECORD
        </Button>
      </div>

      // <Button variant='outlined' sx={{ width: '100%', height: '30px', fontSize: '13px' }}>
      //   Record
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
        getRowId={(row: any) => row.accountId}
        components={{
          Pagination: CustomPagination
        }}
      />
    </>
  )
}

export default Table
