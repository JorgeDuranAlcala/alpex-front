// import { Button } from '@mui/material'

import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

// ** Next Import
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store'
import ColumnHeader from './ColumnHeader'
import HeaderTable from './HeaderTable'

// import CustomModal from '@components/modals/modal-alpex'
import Button from '@mui/material/Button'

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import CustomPagination from './CustomPagination'

// import ModalReinsurers from '../ModalReinsurers'
import { Link } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Next Import
import { useRouter } from 'next/router'

// ** Custom Hooks imports
import { fetchBrokerTracker } from 'src/store/apps/installments/brokerTracker'

interface INearlyPaymentStatus {
  idAccount: number
  insured: string
  installments: string
  accountDebt: string
  actions: string
  currency: string
}

export enum EFieldColumn {
  idAccount = 'idAccount',
  insured = 'insured',
  installments = 'installments',
  accountDebt = 'accountDebt'
}

const userThemeConfig: any = Object.assign({}, UserThemeOptions())

const inter = userThemeConfig.typography?.fontFamilyInter

const Table = () => {
  // ** Hooks
  const router = useRouter()

  const onAction = async (id: number) => {
    localStorage.setItem('idAccount', String(id))
    router.push(`/broker-tracker/broker-record/?&id=${String(id)}`)
  }

  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  //** State
  const [accounts, setAccounts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  // **Reducers
  const dispatch = useAppDispatch()
  const installmentsReducer = useAppSelector(state => state.brokerTracker)

  useEffect(() => {
    setAccounts(installmentsReducer.accounts || [])
    setLoading(installmentsReducer.loading)
    //eslint-disable-next-line
  }, [installmentsReducer.accounts])

  useEffect(() => {
    dispatch(fetchBrokerTracker(installmentsReducer))
    //eslint-disable-next-line
  }, [installmentsReducer.filters])

  const column: GridColumns<INearlyPaymentStatus> = [
    {
      flex: 0.1,
      field: EFieldColumn.idAccount,
      headerName: 'ACCOUNT ID',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>{`#${row.idAccount}`}</Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.insured,
      headerName: 'INSURED',
      minWidth: 150,
      maxWidth: 210,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
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
      field: EFieldColumn.installments,
      headerName: 'INSTALLMENTS',
      minWidth: 150,
      maxWidth: 210,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader showIcon={false} colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          variant='body2'
          sx={{ color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
        >
          {row.installments}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.accountDebt,
      headerName: 'ACCOUNT DEBT',
      minWidth: 150,
      maxWidth: 210,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          variant='body2'
          sx={{ fontFamily: fonts.inter, fontSize: fonts.size.px14, color: colors.text.light, fontWeight: 400 }}
        >
          ${row.accountDebt} {row.currency}
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
              onAction(row.idAccount)
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
      )
    }
  ]

  return (
    <>
      <HeaderTable />
      <DataGrid
        loading={loading}
        autoHeight
        disableSelectionOnClick
        rows={accounts}
        columns={column}
        pagination
        pageSize={10}
        getRowId={(row: any) => row.idAccount}
        components={{
          Pagination: CustomPagination
        }}
      />
    </>
  )
}

export default Table
