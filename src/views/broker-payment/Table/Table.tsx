// import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import ButtonFilter from '@components/button-filter'

// ** Next Import
import { useRouter } from 'next/router'

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
import { brokers, data, status } from './data'

// ** Custom Hooks imports

interface INearlyPaymentStatus {
  accountId: number
  status: string
  insured: string
  reinsurer: string
  dueDate: string
  contributionPremium: string
  actions: string
}

const Table = () => {
  const router = useRouter()
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter

  const onAction = async (id: number) => {
    localStorage.setItem('idAccountIntallments', String(id))
    router.push(`/reinsurer-payment/record-payment/?&id=${String(id)}`)
  }

  const onDataSheet = async (id: number) => {
    localStorage.setItem('idAccountIntallments', String(id))
    router.push(`/reinsurer-payment/record-payment/?&id=${String(id)}`)
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
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onDataSheet(row.accountId)
            }}
          >{`#${row.accountId}`}</Link>
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
            <ButtonFilter dataFilter={brokers} />
          </Box>
        )
      },
      renderCell: ({ row }) => (
        <Typography
          variant='body2'
          sx={{ pl: 0, color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
        >
          {row.insured}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'reinsurer',
      headerName: 'REINSURER',
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
          {row.reinsurer}
        </Typography>
      )
    },

    {
      flex: 0.1,
      field: 'dueDate',
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
          {row.dueDate}
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
              variant='outlined'
              sx={{
                width: 'auto',
                height: '30px',
                fontSize: '13px',
                color: userThemeConfig.palette?.buttonText.primary,
                fontFamily: inter
              }}
            >
              RECORD PAYMENT
            </Button>
          </Link>
        </div>
      )
    }
  ]

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
