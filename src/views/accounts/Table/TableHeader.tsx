// ** React Imports
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { AbilityContext } from '@/layouts/components/acl/Can'

// ** MUI Imports
import { Grid, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { EStatus, EStatusString } from './Status'
import ModalAction from './modal'

// ** Custom Hooks imports
import { formatStatusToNumber } from '@/utils/formatStatus'
import Chip from 'src/@core/components/mui/chip'
import useAccountTable from 'src/hooks/accounts/Table/useAccountTable'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteAccountFilter } from 'src/store/apps/accounts'
import { IFilters } from 'src/types/apps/accountsTypes'
import CustomAlert, { IAlert } from 'src/views/custom/alerts'

//Google Analytics
import { useMultiTabButtons } from '@/layouts/components/multiTabButtons/hooks/useMultiTabButtons'
import Analytics from '@/utils/analytics'
import ModalBordereaux from './modalBordereaux'

const AddAccountButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: 2,
  width: '100%',
  minWidth: '209px',
  maxWidth: '209px',
  height: '42px',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))
enum EActions {
  SELECT_ALL = 'Select all',
  CHANGE_STATUS = 'Change status',
  DOWNLOAD_BORDEREAUX = 'Download Bordereaux',
  DELETE_ALL = 'Delete accounts',
  UNSELECT_ALL = 'Unselect all'
}

interface ITableHeader {
  selectedRows: GridRowId[]
  badgeData: IAlert
  setSelectAll: any
  selectAllOption: number[]
  setSelectAllFlag: any
  setSelectedRows: any
}

const TableHeader: React.FC<ITableHeader> = ({
  selectedRows,
  badgeData,
  setSelectAll,
  selectAllOption,
  setSelectAllFlag,
  setSelectedRows
}) => {
  // ** Custom Hooks
  const router = useRouter()
  const { deleteAccounts, changeStatusAccounts } = useAccountTable()
  const { addNewTabButton } = useMultiTabButtons()

  const dispatch = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  // ** State
  const [actionMenu, setActionMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBordereauxModal, setShowBordereauxModal] = useState(false)
  const [textDeleteModal, setTextDeleteModal] = useState('')
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openStatusChangeMenu = Boolean(anchorEl)
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [textChangeStatusModal, setTextChangeStatusModal] = useState('')
  const [changeStatusTo, setChangeStatusTo] = useState<EStatus | null>(null)
  const [value, setValue] = useState<string>('')
  const ability = useContext(AbilityContext)
  const [disableForm] = useState(ability?.cannot('update', 'selectHeaderBound'))

  // useEffect(() => {
  //   setSelectAll(selectAllOption)
  // }, [])

  // ** Handlers for Action menu
  const handleActionMenuOpen = () => {
    setActionMenu(true)
  }
  const handleActionMenuClose = () => {
    setActionMenu(false)
    setValue('')
    setSelectAllFlag(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleActionMenuOnclick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement
    if (target.value === undefined) {
      handleActionMenuClose()
    }
  }

  const handleSelectedAction = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value
    setValue(selectedOption)
    switch (event.target.value) {
      case EActions.SELECT_ALL:
        setSelectAll(selectAllOption)
        setSelectedRows(selectAllOption)
        setSelectAllFlag(true)
        break
      case EActions.DELETE_ALL:
        handleTextDeleteModal(selectedRows)
        setShowDeleteModal(true)
        handleActionMenuClose()
        break
      case EActions.DOWNLOAD_BORDEREAUX:
        setShowBordereauxModal(true)
        handleActionMenuClose()
        console.log('open Modal')
        break
      case EActions.CHANGE_STATUS:
        const el = document.querySelector('#statusChangeActionMenu')
        setAnchorEl(el)
        break
      case EActions.UNSELECT_ALL:
        setSelectAll([])
        setSelectedRows([])
        setSelectAllFlag(true)
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

  const handleAddAccount = () => {
    Analytics.event({
      category: 'add_account',
      action: 'Add Account'
    })

    router.push('/accounts/new-account')
    addNewTabButton({
      text: 'New Account',
      link: `/accounts/new-account`,
      isActive: true
    })
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
          display: 'flex',
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
            value={value}
            sx={{ mr: 4, mb: 2, width: '100%', height: '42px' }}
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
              disabled={selectedRows.length === 0 ? true : false}
            >
              <Icon icon='ic:outline-replay' fontSize={24} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.CHANGE_STATUS}
              <Menu
                open={openStatusChangeMenu}
                keepMounted
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem disabled={disableForm} onClick={() => HandleChangeStatus(EStatus.PENDING)}>{EStatusString.PENDING}</MenuItem>
                <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_MATERIALIZED)}>
                  {EStatusString.NOT_MATERIALIZED}
                </MenuItem>
                <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_TAKEN_UP)}>
                  {EStatusString.NOT_TAKEN_UP}
                </MenuItem>
                <MenuItem onClick={() => HandleChangeStatus(EStatus.DECLINED)}>{EStatusString.DECLINED}</MenuItem>
                <MenuItem disabled={disableForm} onClick={() => HandleChangeStatus(EStatus.BOUND)}>{EStatusString.BOUND}</MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem value={EActions.DOWNLOAD_BORDEREAUX} sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}>
              <Icon icon='ic:baseline-download' fontSize={34} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.DOWNLOAD_BORDEREAUX}
            </MenuItem>
            <MenuItem
              value={EActions.UNSELECT_ALL}
              sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}
              disabled={selectedRows.length === 0 ? true : false}
            >
              <Icon icon='carbon:close-filled' fontSize={23} color={'rgba(87, 90, 111, 0.54)'} />
              {EActions.UNSELECT_ALL}
            </MenuItem>
            <MenuItem
              value={EActions.DELETE_ALL}
              sx={{ minWidth: '172px', display: 'flex', gap: '4%' }}
              disabled={selectedRows.length === 0 ? true : false}
            >
              <Icon icon='ic:outline-delete' fontSize={24} color={'rgba(87, 90, 111, 0.54)'} />
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
          <ModalBordereaux
            renderButton={() => <span> </span>}
            headingText={'BDX Subscribed Premium'}
            text='Select the Reinsurer and Binder to download Bordereaux.'
            setShow={showBordereauxModal}
            onClose={() => {
              setShowBordereauxModal(false)
            }}
          />
        </Grid>
        {accountsReducer.filters.length === 0 ? null : (
          <Grid item xs={12} sm={5} md={7} sx={{ height: 'auto' }}>
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
                    fontFamily: 'Inter',
                    mb: 2
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
                    fontFamily: 'Inter',
                    mb: 2
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
        <Grid item xs={12} sm={4} md={3}>
          {!badgeData.status ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <AddAccountButton variant='contained' onClick={handleAddAccount}>
                ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
              </AddAccountButton>
            </Box>
          ) : (
            <CustomAlert {...badgeData} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableHeader
