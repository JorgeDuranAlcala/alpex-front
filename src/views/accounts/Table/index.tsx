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

// ** Next Import
import { useRouter } from 'next/router'

// ** Custom Hooks imports

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import Status, { EStatus, EStatusString } from './Status'
import TableHeader from './TableHeader'
import ModalAction from './modal'

// ** Custom utilities
import useAccountTable from '@/hooks/accounts/Table/useAccountTable'
import { timestampToOnlyDate } from '@/utils/formatDates'
import { formatStatus } from '@/utils/formatStatus'
import { Link } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/store'
import {
  deleteAccountFilter,
  fetchAccounts,
  handleAccountFilter,
  resetAccountFilter,
  updateFormsData
} from 'src/store/apps/accounts'
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
  const [selectAll, setSelectAll] = useState<any>([])
  const [selectAllFlag, setSelectAllFlag] = useState(false)
  const [accounts, setAccounts] = useState<any>([])
  const [loading, setLoading] = useState<any>([])
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    status: undefined,
    icon: undefined
  })
  const [typeofCount, settypeofCount] = useState('')

  // **Reducers
  const dispatch = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  // console.log({ selectAll })

  const selectAllOption = accountsReducer.accounts.map(account => account.id)

  // console.log({ selectAllOption })
  // console.log(accounts.effectiveDate)

  // ** Custom Hooks
  //const { accounts, getAccounts } = useAccountTable()
  const { duplicateAccounts } = useAccountTable()

  // ** Hooks
  const router = useRouter()

  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  useEffect(() => {
    const page = 1
    dispatch(fetchAccounts(page))

    //eslint-disable-next-line
  }, [accountsReducer.filters])

  useEffect(() => {
    dispatch(resetAccountFilter())

    if (status === undefined) dispatch(deleteAccountFilter('status'))
    else {
      const index: string = Object.keys(EStatus)[Object.values(EStatus).indexOf(status as any)]
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
    const rawRows = accountsReducer.accounts

    if (rawRows && rawRows.length > 0) {
      for (const rawRow of rawRows) {
        formatedRows.push({
          id: rawRow?.id,
          status: formatStatus(rawRow?.idAccountStatus?.status),
          insured: rawRow?.informations[0]?.insured,
          lob: rawRow?.informations[0]?.idLineOfBussines?.lineOfBussines,
          effectiveDate: timestampToOnlyDate(rawRow?.informations[0]?.effectiveDate),
          expirationDate: timestampToOnlyDate(rawRow?.informations[0]?.expirationDate)
        })
      }
    }

    setAccounts(formatedRows || [])
    settypeofCount(formatedRows[0]?.status)
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
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type={'idAccount'} />
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onEdit(+row.id)
            }}
          >{`#${row.id}`}</Link>
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
        <ColumnHeader
          colDef={colDef}
          action={status === undefined ? handleClickColumnHeader : undefined}
          type={'status'}
        />
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
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='insured' />,
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
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='idLineOfBusiness' />
      ),
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
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='effectiveDate' />
      ),
      renderCell: ({ row }) => {
        if (!row || !row.effectiveDate) return

        const replaceDashes = row.effectiveDate.replace(/-/g, '/')
        const fromatDate = new Date(replaceDashes)

        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }

        const effectiveDate = fromatDate.toLocaleDateString('Es-MX', options).replace(/\//g, '-')

        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {effectiveDate}
          </Typography>
        )
      }
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
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='expirationDate' />
      ),
      renderCell: ({ row }) => {
        if (!row || !row.expirationDate) return

        const replaceDashes = row.expirationDate.replace(/-/g, '/')
        const fromatDate = new Date(replaceDashes)

        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }

        const expirationDate = fromatDate.toLocaleDateString('Es-MX', options).replace(/\//g, '-')

        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {/* {row.expirationDate} */}
            {expirationDate}
          </Typography>
        )
      }
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <IconButton
            onClick={() => {
              onEdit(+row.id)
            }}
            size='small'
            sx={{ mr: 1 }}
          >
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

  // ACTIONS buttons functions
  const onDownload = (id: number) => {
    setBadgeData({
      message: `DOWNLOADING #${id.toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false })}`,
      status: 'secondary',
      open: true,
      icon: <CircularProgress size={20} color='primary' />,
      backgroundColor: '#828597',
      theme: 'info'
    })

    setTimeout(() => {
      setBadgeData({
        message: `#${id.toLocaleString('en-US', {
          minimumIntegerDigits: 4,
          useGrouping: false
        })} DOWNLOADED SUCCESSFULLY`,
        status: 'success',
        open: true,
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

  const onDuplicated = async (id: number) => {
    await duplicateAccounts([id])

    setBadgeData({
      message: `#${id.toLocaleString('en-US', {
        minimumIntegerDigits: 4,
        useGrouping: false
      })} WAS DUPLICATED SUCCESSFULLY`,
      status: 'success',
      open: true,
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

  const onEdit = async (id: number) => {
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
    router.push(`/accounts/view/?&${typeofCount}/?&id=${id}`)
  }

  console.log('esta cuenta es: ', typeofCount)

  return (
    <>
      <TableHeader
        selectedRows={selectedRows}
        badgeData={badgeData}
        setSelectAll={setSelectAll}
        selectAllOption={selectAllOption}
        setSelectAllFlag={setSelectAllFlag}
        setSelectedRows={setSelectedRows}
      />
      <DataGrid
        loading={loading}
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
        selectionModel={selectAllFlag ? selectAll : undefined}
        onSelectionModelChange={rows => setSelectedRows(rows)}
      />
    </>
  )
}

export default Table
