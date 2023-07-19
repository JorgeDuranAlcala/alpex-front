// ** React Imports
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  GRID_ACTIONS_COL_DEF,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColumns,
  GridRowId
} from '@mui/x-data-grid'

// ** Icon Imports

// ** Custom Hooks imports

import { useDeleteUser } from '@/hooks/catalogs/users/deleteUser'

// import { UsersDeleteDto } from '@/services/users/dtos/UsersDto'

// ** Custom Components Imports

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'

// import { Icon } from '@iconify/react'
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import TableHeader from './TableHeader'

// ** Custom utilities
import { IconButton, Link, Menu, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchAccounts } from 'src/store/apps/users'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { IAlert } from 'src/views/custom/alerts'
import StyledChip from 'src/views/custom/chips/styledChips'
import ModalAction from 'src/views/custom/modal'

interface IRolesUserGrid {
  id: number
  role: string
  level: string
  description: string
  active: boolean
}

export interface IUsersGrid {
  id: number
  name: string
  roles: IRolesUserGrid[]
  idCompany: {
    alias?: string
    name: string
  }
  phone: string
  email: string
  surname: string
}

export enum EFieldColumn {
  NAME = 'name',
  PHONE_NUMBER = 'phone',
  EMAIL = 'email',
  COMPANY = 'company',
  ROLE = 'role'
}

interface IUsersTable {
  handleView: Dispatch<SetStateAction<number>>
  setSelectUser: (id: number | null) => void
}

const Table = ({ handleView, setSelectUser }: IUsersTable) => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [accounts, setAccounts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<IUsersGrid | null>()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [idMultiple, setIdMultiple] = useState<any>([])

  // const [deleteModal, setDeleteModal] = useState<boolean>(false)

  // console.log({ selectedRows })
  // console.log({ idMultiple })
  console.log({ selectedUser })

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

  // console.log('Redux_Store--->', usersReducer.users)

  // ** Hooks
  const { deleteUser } = useDeleteUser()

  // console.log(deleteUser)

  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }

  useEffect(() => {
    setAccounts(usersReducer.users || [])
    console.log('Loading--->', loading)
    setLoading(usersReducer.loading)
    //eslint-disable-next-line
  }, [usersReducer.users])

  useEffect(() => {
    dispatch(fetchAccounts(usersReducer))
    //eslint-disable-next-line
  }, [usersReducer.filters])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser({ idUsersList: [selectedUser.id] })
      setSelectedUser(null)
    } else {
      deleteUser({ idUsersList: idMultiple })
    }

    setTimeout(() => {
      dispatch(fetchAccounts(usersReducer))
    }, 50)
  }

  // const handleDeleteModal = (id: number[] | undefined) => {
  //   deleteUser({ idUsersList: id })

  //   setTimeout(() => {
  //     dispatch(fetchAccounts(usersReducer))
  //   }, 50)
  // }

  const ModalActions = () => {
    return (
      <>
        <Menu
          disableScrollLock={true}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem
            onClick={() => {
              setSelectUser(selectedUser!.id)
              handleClose()
            }}
            sx={{ minWidth: '172px', display: 'flex', justifyContent: 'space-between' }}
          >
            Edit
            <Icon icon='mdi:pencil' fontSize={24} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              // setDeleteModal(true)

              setModalShow(true)
              handleClose()
            }}
            sx={{ minWidth: '172px', display: 'flex', justifyContent: 'space-between' }}
          >
            Delete
            <Icon icon='ic:baseline-delete-outline' fontSize={24} />
          </MenuItem>
        </Menu>
      </>
    )
  }

  //name, role, company, phone number, email
  const column: GridColumns<IUsersGrid> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      resizable: false,
      type: 'string',
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: EFieldColumn.NAME,
      headerName: 'NAME',
      minWidth: 270,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          sx={{
            color: colors.primary.main,
            fontSize: fonts.size.px14,
            fontFamily: fonts.inter,
            overflow: 'elipsis',
            marginLeft: '-3%'
          }}
        >
          {`${row.name} ${row.surname}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.ROLE,
      headerName: 'ROLE',
      minWidth: 130,
      type: 'string',
      align: 'left',
      cellClassName: 'account-column-cell-pl-0',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.roles.map(rol => rol.role).join(', ') || 'W/ role'}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.COMPANY,
      headerName: 'COMPANY',
      minWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Box sx={{ marginLeft: '-6%' }}>
          <Box
            sx={{
              color: colors.text.primary,
              fontWeight: 500,
              fontSize: fonts.size.px14,
              fontFamily: fonts.inter
            }}
          >
            <Link sx={{ color: colors.text.primary }} href='#'>
              <StyledChip color='primary' sx={{}} label={row.idCompany?.name || 'W/ company'} />
            </Link>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.PHONE_NUMBER,
      headerName: 'PHONE NUMBER',
      minWidth: 135,
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
      minWidth: 250,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} action={handleClickColumnHeader} />,
      renderCell: ({ row }) => (
        <Typography
          sx={{
            color: colors.text.secondary,
            fontSize: fonts.size.px14,
            fontFamily: fonts.inter,
            textTransform: 'lowercase',
            marginLeft: '-5%'
          }}
        >
          {row.email}
        </Typography>
      )
    },
    {
      flex: 0.1,
      ...GRID_ACTIONS_COL_DEF,
      field: 'Actions',
      sortable: false,
      resizable: false,
      maxWidth: 50,
      disableColumnMenu: true,
      type: 'string',
      cellClassName: 'account-column-cell-pl-0 ',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} />,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton
              size='small'
              onClick={e => {
                // console.log(row)
                setSelectedUser(row)
                handleClick(e)
              }}
            >
              <Icon icon='mdi:dots-vertical' />
            </IconButton>
          </>
        )
      }
    }
  ]

  const onDelete = () => {
    setBadgeData({
      message: `${selectedUser?.name} ${selectedUser?.surname} WAS DELETED SUCCESSFULLY`,
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
      <ModalActions />
      <ModalAction
        headingText={`Are you sure you want to delete ${selectedUser?.name} ${selectedUser?.surname}`}
        text='This user will no longer have access to the platform.'
        setShow={modalShow}
        handleClickContinue={() => {
          setModalShow(false)
          onDelete()
          handleDelete()
        }}
        handleClickCancel={() => {
          setModalShow(false)
        }}
        continueText='Delete'
      />
      <TableHeader
        handleView={handleView}
        selectedRows={selectedRows}
        badgeData={badgeData}
        setModalShow={setModalShow}
      />
      <DataGrid
        loading={loading}
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
        onSelectionModelChange={rows => {
          setSelectedRows(rows)
          setIdMultiple(rows)
        }}
      />
    </>
  )
}

export default Table

// deleteModal ? handleDeleteModal([selectedUser !== undefined ? selectedUser!.id : 0]) : handleDelete()
