// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { GridRowId } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { EStatus, EStatusString } from './Status'
import ModalAction from './modal'

// ** Custom Hooks imports
import { formatStatusToNumber } from '@/utils/formatStatus'
import { Grid } from '@mui/material'
import Chip from 'src/@core/components/mui/chip'
import useAccountTable from 'src/hooks/accounts/Table/useAccountTable'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteAccountFilter } from 'src/store/apps/accounts'
import { IFilters } from 'src/types/apps/accountsTypes'
import CustomAlert, { IAlert } from 'src/views/custom/alerts'

enum EActions {
  SELECT_ALL = 'Select all',
  CHANGE_STATUS = 'Change status',
  DELETE_ALL = 'Delete accounts'
}

interface ITableHeader {
  selectedRows: GridRowId[]
  badgeData: IAlert
}

const TableHeader: React.FC<ITableHeader> = ({ selectedRows, badgeData }) => {
  console.log({ selectedRows })

  // ** Custom Hooks
  const router = useRouter()
  const { deleteAccounts, changeStatusAccounts } = useAccountTable()

  const dispatch = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  // ** State
  const [actionMenu, setActionMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [textDeleteModal, setTextDeleteModal] = useState('')
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openStatusChangeMenu = Boolean(anchorEl)
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [textChangeStatusModal, setTextChangeStatusModal] = useState('')
  const [changeStatusTo, setChangeStatusTo] = useState<EStatus | null>(null)
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false)

  console.log(accountsReducer.filters)

  // ** Handlers for Action menu
  const handleActionMenuOpen = () => {
    setActionMenu(true)
  }
  const handleActionMenuClose = () => {
    setActionMenu(false)
    setAnchorEl(null)
  }

  const handleSubMenu = () => {
    setIsOpenSubMenu(true)
    console.log('CLickkkkkk')
  }
  const handleActionMenuOnclick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement
    if (target.value === undefined) {
      handleActionMenuClose()
    }
  }

  const handleSelectedAction = async (event: SelectChangeEvent<string>) => {
    switch (event.target.value) {
      case EActions.DELETE_ALL:
        handleTextDeleteModal(selectedRows)
        setShowDeleteModal(true)
        handleActionMenuClose()
        break
      case EActions.CHANGE_STATUS:
        const el = document.querySelector('#statusChangeActionMenu')
        setAnchorEl(el)
        break
      default:
        break
    }
  }

  // ** Handlers for Change Status
  const handleChangeStatusAction = async () => {
    if (changeStatusTo) {
      const changeStatusArray = [{}]

      if (selectedRows.length > 0) {
        for (const [idx, row] of selectedRows.entries()) {
          changeStatusArray[idx] = {
            idAccount: row,
            status: formatStatusToNumber(changeStatusTo)
          }
        }

        await changeStatusAccounts({
          updateStatus: changeStatusArray
        })
      }
    }
  }

  const HandleChangeStatus = (newStatus: EStatus) => {
    setChangeStatusTo(newStatus)
    handleTextChangeStatusModal(selectedRows, newStatus)
    setShowChangeStatusModal(true)
    setAnchorEl(null)
    handleActionMenuClose()
  }

  type EStatusKeys = keyof typeof EStatus

  const handleDelete = (filter: IFilters) => {
    dispatch(deleteAccountFilter(filter.type))
  }

  const handleTextChangeStatusModal = (selectedRows: GridRowId[], newStatus: EStatus) => {
    const msg = 'You are about to change'
    let textSelectedRows = ''
    if (selectedRows.length > 10) {
      const slice = selectedRows.slice(0, 8)
      textSelectedRows = `${slice.join(', #')}, ... #${selectedRows[selectedRows.length - 1]}`
    } else {
      textSelectedRows = selectedRows.join(', #')
    }

    const keyStatusString = Object.keys(EStatus).find(key => {
      if (typeof key === 'string') {
        return EStatus[key as EStatusKeys] === newStatus
      }

      return false
    }) as EStatusKeys | undefined

    if (keyStatusString) {
      setTextChangeStatusModal(`${msg} #${textSelectedRows} to a ${EStatusString[keyStatusString]}.`)
    }
  }

  // ** Handlers for Delete All
  const handleTextDeleteModal = (selectedRows: GridRowId[]) => {
    const msg = 'Are you sure you want to delete accounts'
    let textSelectedRows = ''
    if (selectedRows.length > 10) {
      const slice = selectedRows.slice(0, 8)
      textSelectedRows = `${slice.join(', #')}, ... #${selectedRows[selectedRows.length - 1]}`
    } else {
      textSelectedRows = selectedRows.join(', #')
    }

    setTextDeleteModal(`${msg} #${textSelectedRows}?`)
  }

  const handleDeleteAction = () => {
    deleteAccounts(selectedRows)
  }

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 'auto'
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        sx={{
          display: 'felx',
          alignItems: 'center',
          justifyContent: accountsReducer.filters.length === 0 ? 'space-between' : null
        }}
      >
        <Grid item xs={12} sm={3} md={2}>
          <Select
            displayEmpty
            open={actionMenu}
            onOpen={handleActionMenuOpen}
            onClick={e => handleActionMenuOnclick(e)}
            onChange={handleSelectedAction}
            defaultValue=''
            sx={{ mr: 4, mb: 2, width: '100%', height: '42px' }}
            disabled={selectedRows && selectedRows.length === 0}
            renderValue={selected => (selected.length === 0 ? 'Action' : selected)}
          >
            <MenuItem sx={{ minWidth: '172px', display: 'flex', gap: '5%' }} value={EActions.SELECT_ALL}>
              <Icon icon='material-symbols:select-all' fontSize={24} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.SELECT_ALL}
            </MenuItem>
            <MenuItem
              id='statusChangeActionMenu'
              value={EActions.CHANGE_STATUS}
              sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}
              onClick={handleSubMenu}
            >
              <Icon icon='ic:outline-replay' fontSize={24} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.CHANGE_STATUS}
              {isOpenSubMenu && (
                <Menu
                  open={openStatusChangeMenu}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={() => HandleChangeStatus(EStatus.PENDING)}>{EStatusString.PENDING}</MenuItem>
                  <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_MATERIALIZED)}>
                    {EStatusString.NOT_MATERIALIZED}
                  </MenuItem>
                  <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_TAKEN_UP)}>
                    {EStatusString.NOT_TAKEN_UP}
                  </MenuItem>
                  <MenuItem onClick={() => HandleChangeStatus(EStatus.DECLINED)}>{EStatusString.DECLINED}</MenuItem>
                  <MenuItem onClick={() => HandleChangeStatus(EStatus.BOUND)}>{EStatusString.BOUND}</MenuItem>
                </Menu>
              )}
            </MenuItem>
            <MenuItem value={EActions.DELETE_ALL} sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}>
              <Icon icon='ic:outline-delete' fontSize={30} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.DELETE_ALL}
            </MenuItem>
          </Select>

          {/* DeleteModal */}
          <ModalAction
            renderButton={() => <span> </span>}
            headingText={textDeleteModal}
            text='These accounts will remain in “Deleted accounts” for 30 days and then they’ll be deleted permanently. If you want to restore them you can go to: Configuration > Deleted accounts'
            handleClickContinue={handleDeleteAction}
            setShow={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false)
            }}
          />
          {/* ChangeStatusModal */}
          <ModalAction
            renderButton={() => <span> </span>}
            headingText={textChangeStatusModal}
            text='Do you want to proceed?'
            handleClickContinue={handleChangeStatusAction}
            setShow={showChangeStatusModal}
            onClose={() => {
              setShowChangeStatusModal(false)
            }}
          />
        </Grid>
        {accountsReducer.filters.length === 0 ? null : (
          <Grid item xs={12} sm={6} md={7} sx={{ height: '42px' }}>
            {accountsReducer.filters.map((filter, index) =>
              filter.unDeleteable ? (
                <Chip
                  key={index}
                  label={filter.text}
                  sx={{
                    backgroundColor: '#174BC125',
                    marginRight: '6px',
                    color: '#2535A8',
                    fontWeight: 500,
                    fontFamily: 'Inter'
                  }}
                />
              ) : (
                <Chip
                  key={index}
                  label={filter.text}
                  sx={{
                    backgroundColor: '#174BC125',
                    marginRight: '6px',
                    color: '#2535A8',
                    fontWeight: 500,
                    fontFamily: 'Inter'
                  }}
                  onDelete={() => {
                    handleDelete(filter)
                  }}
                  deleteIcon={<Icon icon='mdi:close-circle' style={{ color: '2535A8' }} />}
                />
              )
            )}
          </Grid>
        )}
        <Grid item xs={12} sm={3} md={3}>
          {!badgeData.status ? (
            <Button
              variant='contained'
              onClick={() => router.push('/accounts/new-account')}
              sx={{ width: '100%', height: '42px', mb: 2 }}
            >
              ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
            </Button>
          ) : (
            <CustomAlert {...badgeData} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableHeader
