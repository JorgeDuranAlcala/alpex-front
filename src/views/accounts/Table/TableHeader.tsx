// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GridRowId } from '@mui/x-data-grid';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import { EStatus, EStatusString } from './Status';
import ModalAction from './modal';

// ** Custom Hooks imports
import useAccountTable from 'src/hooks/accounts/Table/useAccountTable';

enum EActions {
  DELETE_ALL = 'Delete All',
  CHANGE_STATUS = 'Change Status',
}

interface ITableHeader {
  selectedRows: GridRowId[]
}

const TableHeader: React.FC<ITableHeader> = ({ selectedRows }) => {
  // ** Custom Hooks
  const { deleteAccounts, changeStatusAccounts } = useAccountTable()

  // ** State
  const [actionMenu, setActionMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal]= useState(false)
  const [textDeleteModal, setTextDeleteModal]= useState('')
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openStatusChangeMenu = Boolean(anchorEl)
  const [showChangeStatusModal, setShowChangeStatusModal]= useState(false)
  const [textChangeStatusModal, setTextChangeStatusModal]= useState('')
  const [changeStatusTo, setChangeStatusTo] = useState<EStatus | null>(null)

 // ** Handlers for Action menu
  const handleActionMenuOpen = () =>{
    setActionMenu(true)
  }
  const handleActionMenuClose = () =>{
    setActionMenu(false)
    setAnchorEl(null)
  }

  const handleActionMenuOnclick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
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
        break;
      case EActions.CHANGE_STATUS:
        const el = document.querySelector('#statusChangeActionMenu')
        setAnchorEl(el)
        break;
      default:
        break;
    }

  }; 

   // ** Handlers for Change Status
   const handleChangeStatusAction = () => {
    if (changeStatusTo) {
      changeStatusAccounts(selectedRows, changeStatusTo)
    }
  }

  const HandleChangeStatus = (newStatus: EStatus) => {
    setChangeStatusTo(newStatus)
    handleTextChangeStatusModal(selectedRows, newStatus)
    setShowChangeStatusModal(true)
    setAnchorEl(null)
    handleActionMenuClose()
  }

  type EStatusKeys = keyof typeof EStatus;
  
  const handleTextChangeStatusModal = (selectedRows:GridRowId[], newStatus:EStatus) => {
    const msg = 'You are about to change'
    let textSelectedRows = ''
    if (selectedRows.length > 10) {
      const slice = selectedRows.slice(0, 8)
      textSelectedRows = `${slice.join(', #')}, ... #${selectedRows[selectedRows.length - 1]}`
    } else {
      textSelectedRows = selectedRows.join(', #')
    }

    const keyStatusString = Object.keys(EStatus).find((key) => {
      if (typeof key === 'string') {
        return EStatus[key as EStatusKeys] === newStatus;
      }
      
      return false;
    }) as EStatusKeys | undefined;
    
    if (keyStatusString) {
      setTextChangeStatusModal(`${msg} #${textSelectedRows} to a ${EStatusString[keyStatusString]}.`)
    }
    
  }

  // ** Handlers for Delete All
  const handleTextDeleteModal = (selectedRows:GridRowId[]) => {
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
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Select
          size='small'
          displayEmpty
          open={actionMenu}
          onOpen={handleActionMenuOpen}
          onClick={(e)=>handleActionMenuOnclick(e)}
          onChange={handleSelectedAction}
          defaultValue=''
          sx={{ mr: 4, mb: 2 }}
          disabled={selectedRows && selectedRows.length === 0}
          renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
        >
          <MenuItem value={''}>
            Actions
          </MenuItem>
          <MenuItem value={EActions.DELETE_ALL}>
            {EActions.DELETE_ALL}
          </MenuItem>
          <MenuItem id='statusChangeActionMenu'  value={EActions.CHANGE_STATUS}>
            {EActions.CHANGE_STATUS}
            <Menu open={openStatusChangeMenu} anchorEl={anchorEl}>
              <MenuItem onClick={() => HandleChangeStatus(EStatus.PENDING)}>
               {EStatusString.PENDING}
              </MenuItem>
              <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_MATERIALIZED)}>
               {EStatusString.NOT_MATERIALIZED}
              </MenuItem>
              <MenuItem onClick={() => HandleChangeStatus(EStatus.NOT_TAKEN_UP)}>
               {EStatusString.NOT_TAKEN_UP}
              </MenuItem>
              <MenuItem onClick={() => HandleChangeStatus(EStatus.DECLINED)}>
               {EStatusString.DECLINED}
              </MenuItem>
              <MenuItem onClick={() => HandleChangeStatus(EStatus.BOUND)}>
               {EStatusString.BOUND}
              </MenuItem>
            </Menu>
          </MenuItem>
        </Select>

        {/* DeleteModal */}
        <ModalAction
          renderButton={() => <span> </span>}
          headingText={textDeleteModal}
          text='These accounts will remain in “Deleted accounts” for 30 days and then they’ll be deleted permanently. If you want to restore them you can go to: Configuration > Deleted accounts'
          handleClickContinue={handleDeleteAction}
          setShow={showDeleteModal}
          onClose={()=>{
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
          onClose={()=>{
            setShowChangeStatusModal(false)
          }}
        />
      </Box>

      <Button sx={{ mb: 2 }} variant='contained'>
          ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
      </Button>
    </Box>
  )
}

export default TableHeader