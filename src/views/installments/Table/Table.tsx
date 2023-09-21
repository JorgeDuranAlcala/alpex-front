// import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

import ColumnHeader from './ColumnHeader'

// ** Next Import
import { useRouter } from 'next/router'

// import CustomModal from '@components/modals/modal-alpex'
import Button from '@mui/material/Button'

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import CustomPagination from './CustomPagination'

// import ModalReinsurers from '../ModalReinsurers'
import { Link } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { useAppDispatch, useAppSelector } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'
import { fetchInstallments } from 'src/store/apps/installments'
import HeaderTable from './HeaderTable'
import Status from './Status'

// ** Custom Hooks imports

interface INearlyPaymentStatus {
  idAccount: number
  idInstallment: number
  status: string
  broker: string
  insured: string
  installment: string
  balanceDue: string
  dueDate: string
  actions: string
}

export enum EFieldColumn {
  idAccount = 'idAccount',
  idInstallment = 'idInstallment',
  status = 'status',
  broker = 'broker',
  insured = 'insured',
  installment = 'installment',
  balanceDue = 'balanceDue',
  dueDate = 'dueDate'
}

const Table = () => {
  const router = useRouter()
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter

  const onAction = async (id: number, idInstallment: number) => {
    dispatch(
      updateFormsData({
        form1: {
          basicInfo: {},
          placementStructure: {},
          userFile: {},
          id
        }
      })
    )
    localStorage.setItem('idAccount', String(id))
    localStorage.setItem('idAccountInstallment', String(idInstallment))
    router.push(`/installments/payment-record/?&id=${String(id)}`)
  }

  const onDataSheet = async (id: number) => {
    localStorage.setItem('idAccountIntallments', String(id))
    router.push(`/installments/data-sheet/?&id=${String(id)}`)
  }
  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  //** State
  const [accounts, setAccounts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  // **Reducers
  const dispatch = useAppDispatch()
  const installmentsReducer = useAppSelector(state => state.installments)

  useEffect(() => {
    setAccounts(installmentsReducer.accounts || [])
    setLoading(installmentsReducer.loading)
    //eslint-disable-next-line
  }, [installmentsReducer.accounts])

  useEffect(() => {
    dispatch(fetchInstallments(installmentsReducer))
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
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onDataSheet(row.idAccount)
            }}
          >{`#${row.idAccount}`}</Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.idInstallment,
      headerName: 'INSTALLMENT ID',
      minWidth: 180,
      maxWidth: 180,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          variant='body2'
          sx={{ pl: 0, color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
        >
          {row.idInstallment}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.status,
      headerName: 'STATUS',
      minWidth: 150,
      maxWidth: 210,
      type: 'string',
      align: 'left',
      cellClassName: 'account-column-cell-pl-0',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 3 }}>
          <Status status={row.status} />
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.broker,
      headerName: 'BROKER',
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
          sx={{ pl: 0, color: colors.text.light, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
        >
          {row.broker}
        </Typography>
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
      field: EFieldColumn.installment,
      headerName: 'INSTALLMENT',
      minWidth: 150,
      maxWidth: 210,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
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
      field: EFieldColumn.dueDate,
      headerName: 'DUE DATE',
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
          {row.dueDate}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.balanceDue,
      headerName: 'BALANCE DUE',
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
      renderCell: ({ row }) => (
        <div>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onAction(row.idAccount, row.idInstallment)
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
              RECORD
            </Button>
          </Link>
        </div>

        // <Button variant='outlined' sx={{ width: '100%', height: '30px', fontSize: '13px' }}>
        //   Record
        // </Button>
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
        getRowId={(row: any) => row.idInstallment}
        components={{
          Pagination: CustomPagination
        }}
      />
    </>
  )
}

export default Table
