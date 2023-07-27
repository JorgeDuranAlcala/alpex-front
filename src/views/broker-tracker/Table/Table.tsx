// import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import ButtonFilter from '@components/button-filter'

// ** Next Import

// import CustomModal from '@components/modals/modal-alpex'
import Button from '@mui/material/Button'

import CustomPagination from 'src/views/accounts/Table/CustomPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

// import ModalReinsurers from '../ModalReinsurers'
import { Link } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import HeaderTable from './HeaderTable'
import { brokers, data } from './data'

// ** Custom Hooks imports

interface INearlyPaymentStatus {
  accountId: number
  insured: string
  installment: string
  accountDebt: string
  actions: string
}

const userThemeConfig: any = Object.assign({}, UserThemeOptions())

const inter = userThemeConfig.typography?.fontFamilyInter

const onAction = async (id: number) => {
  localStorage.setItem('idAccountIntallments', String(id))

  // window.location.href = `/installments/payment-record/?&id=${String(id)}`
}

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
    field: 'installments',
    headerName: 'INSTALLMENTS',
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
    field: 'accountDebt',
    headerName: 'ACCOUNT DEBT',
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
        {row.accountDebt}
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
    renderCell: ({ row }) => (
      <div>
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            onAction(row.accountId)
          }}
        >
          <Button
            variant='text'
            sx={{
              width: 'auto',
              height: '30px',
              fontSize: '13px',
              color: userThemeConfig.palette?.buttonText.primary,
              fontFamily: inter
            }}
          >
            SEE ACCOUNT
          </Button>
        </Link>
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
