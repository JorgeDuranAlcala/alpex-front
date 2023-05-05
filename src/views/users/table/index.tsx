// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import TableHeader from './TableHeader'

// ** Custom utilities
import { Link } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchAccounts } from 'src/store/apps/users'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { IAlert } from 'src/views/custom/alerts'
import StyledChip from 'src/views/custom/chips/styledChips'

interface IRolesUserGrid {
  id: number
  role: string
  level: string
  description: string
  active: boolean
}

export interface IUsersGrid {
  name: string
  roles: IRolesUserGrid[]
  idCompany: {
    alias: string
  }
  phone: string
  email: string
}

export enum EFieldColumn {
  NAME = 'name',
  PHONE_NUMBER = 'phone',
  EMAIL = 'email',
  COMPANY = 'company',
  ROLE = 'role'
}

interface IUsersTable {
  handleView: (view: string) => void
}

const Table = ({ handleView }: IUsersTable) => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [accounts, setAccounts] = useState<any>([])
  const [loading, setLoading] = useState<any>([])

  //WIP
  //eslint-disable-next-line
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    status: undefined,
    icon: undefined
  })

  // **Reducers
  const dispatch = useAppDispatch()
  const usersReducer = useAppSelector(state => state.users)

  // ** Hooks

  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  useEffect(() => {
    dispatch(fetchAccounts())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setAccounts(usersReducer.users || [])
    console.log(loading)
    setLoading(usersReducer.loading)
    //eslint-disable-next-line
  }, [usersReducer])

  //name, role, company, phone number, email
  const column: GridColumns<IUsersGrid> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: EFieldColumn.NAME,
      headerName: 'NAME',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {`${row.name}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.ROLE,
      headerName: 'ROLE',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      cellClassName: 'account-column-cell-pl-0',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>{row.roles[0]?.role || 'W/ role'}</Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.COMPANY,
      headerName: 'COMPANY',
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
            <StyledChip color='primary' sx={{}} label={row.idCompany.alias || 'W/ company'} />
          </Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.PHONE_NUMBER,
      headerName: 'PHONE NUMBER',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.phone}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.EMAIL,
      headerName: 'EMAIL',
      minWidth: 165,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.email}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: '',
      headerName: '',
      minWidth: 10,
      maxWidth: 60,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'account-column-cell-pl-0',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} />,
      renderCell: ({}) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' sx={{ mr: 1 }}>
            <Icon icon='ic:menu' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <TableHeader handleView={handleView} selectedRows={selectedRows} badgeData={badgeData} />
      <DataGrid
        sx={{ textTransform: 'capitalize' }}
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
