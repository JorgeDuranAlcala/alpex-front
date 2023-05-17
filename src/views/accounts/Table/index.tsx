// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import Status, { EStatusString } from './Status'
import TableHeader from './TableHeader'
import ModalAction from './modal'

// ** Custom utilities
import { Link } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteAccountFilter, fetchAccounts, handleAccountFilter, resetAccountFilter } from 'src/store/apps/accounts'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { IAlert } from 'src/views/custom/alerts'

export interface IAccount {
  id: string
  status: string
  insured: string
  lob: string
  effectiveDate: string
  expirationDate: string
}

export enum EFieldColumn {
  ACCOUNT_ID = 'id',
  STATUS = 'status',
  INSURED = 'insured',
  LOB = 'lob',
  EFFECTIVE_DATE = 'effectiveDate',
  EXPIRATION_DATE = 'expirationDate'
}

interface IAccountTable {
  status?: string
}

const Table = ({ status }: IAccountTable) => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [accounts, setAccounts] = useState<any>([])
  const [, setLoading] = useState<any>([])
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    status: undefined,
    icon: undefined
  })

  console.log("Id's Selected--->", selectedRows)

  // **Reducers
  const dispatch = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  // ** Custom Hooks
  //const { accounts, getAccounts } = useAccountTable()

  // ** Hooks

  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  useEffect(() => {
    dispatch(fetchAccounts())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(resetAccountFilter())
    if (status === undefined) dispatch(deleteAccountFilter('Status'))
    else {
      const index: string = Object.keys(EStatusString)[Object.values(EStatusString).indexOf(status as any)]
      dispatch(
        handleAccountFilter({
          type: 'status',
          value: status,
          text: EStatusString[index as keyof typeof EStatusString],
          unDeleteable: true
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    setLoading(accountsReducer.loading)

    const formatedRows = []
    console.log('losAccounts', accountsReducer.accounts)
    const rawRows = accountsReducer.accounts
    if (rawRows && rawRows.length > 0) {
      for (const rawRow of rawRows) {
        formatedRows.push({
          id: rawRow.id,
          status: rawRow.idAccountStatus.status,
          insured: rawRow?.informations[0]?.insured,
          lob: rawRow?.informations[0]?.idLineOfBussines?.lineOfBussines,
          effectiveDate: rawRow?.informations[0]?.effetiveDate,
          expirationDate: rawRow?.informations[0]?.expirationDate
        })
      }
    }

    console.log(formatedRows)

    setAccounts(formatedRows || [])
    //eslint-disable-next-line
  }, [accountsReducer])

  const column: GridColumns<IAccount> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: EFieldColumn.ACCOUNT_ID,
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
          <Link href='#'>{`#${row.id}`}</Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.STATUS,
      headerName: 'STATUS',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      cellClassName: 'account-column-cell-pl-0',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={status === undefined ? handleClickColumnHeader : undefined} />
      ),
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Status status={row.status} />
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.INSURED,
      headerName: 'INSURED',
      minWidth: 185,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px14, fontFamily: fonts.inter }}
        >
          <Link sx={{ color: colors.text.primary }} href='#'>
            {row.insured}
          </Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.LOB,
      headerName: 'LOB',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.lob}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.EFFECTIVE_DATE,
      headerName: 'EFFECTIVE DATE',
      minWidth: 165,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.effectiveDate}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.EXPIRATION_DATE,
      headerName: 'EXPIRATION DATE',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.expirationDate}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'ACTIONS',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'account-column-cell-pl-0',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} />,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' sx={{ mr: 1 }}>
            <Icon icon='ic:baseline-login' />
          </IconButton>
          <ModalAction
            renderButton={(handleOpen: () => void) => (
              <IconButton onClick={handleOpen} size='small' sx={{ mr: 1 }}>
                <Icon icon='mdi:content-copy' />
              </IconButton>
            )}
            headingText={`You are about to duplicate: #${row.id} ${row.insured} ${row.effectiveDate}`}
            text='With this action you’ll have two accounts with the same information as it is right now. Do you want to proceed?'
            handleClickContinue={() => {
              onDuplicated(+row.id)
            }}
            handleClickCancel={() => {
              console.log('Cancel')
            }}
          />

          <IconButton
            onClick={() => {
              onDownload(+row.id)
            }}
            size='small'
            sx={{ mr: 1 }}
          >
            <Icon icon='mdi:download' />
          </IconButton>
        </Box>
      )
    }
  ]

  const onDownload = (id: number) => {
    setBadgeData({
      message: `DOWNLOADING #${id.toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false })}`,
      status: 'secondary',
      icon: <CircularProgress size={20} color='secondary' />,
      backgroundColor: '#828597',
      theme: 'secondary'
    })

    setTimeout(() => {
      setBadgeData({
        message: `#${id.toLocaleString('en-US', {
          minimumIntegerDigits: 4,
          useGrouping: false
        })} DOWNLOADED SUCCESSFULLY`,
        status: 'success',
        icon: <Icon icon='ic:baseline-check-circle' />
      })
      setTimeout(() => {
        setBadgeData({
          message: '',
          status: undefined,
          icon: undefined
        })
      }, 3000)
    }, 1000)
  }
  const onDuplicated = (id: number) => {
    setBadgeData({
      message: `#${id.toLocaleString('en-US', {
        minimumIntegerDigits: 4,
        useGrouping: false
      })} WAS DUPLICATED SUCCESSFULLY`,
      status: 'success',
      icon: <Icon icon='ic:baseline-check-circle' />
    })
    setTimeout(() => {
      setBadgeData({
        message: '',
        status: undefined,
        icon: undefined
      })
    }, 3000)
  }

  return (
    <>
      <TableHeader selectedRows={selectedRows} badgeData={badgeData} />
      <DataGrid
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        rows={accounts}
        columns={column}
        pagination
        pageSize={10}
        components={{
          Pagination: CustomPagination
        }}
        className={'account-datagrid'}
        onSelectionModelChange={rows => setSelectedRows(rows)}
      />
    </>
  )
}

export default Table
