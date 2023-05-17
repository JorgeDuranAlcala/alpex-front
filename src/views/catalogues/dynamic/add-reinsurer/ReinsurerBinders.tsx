// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, IconButton, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'

import FormHelperText from '@mui/material/FormHelperText'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomPagination from '../CustomPagination'
import TableHeader from '../TableHeader'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IBinder {
  id: number | undefined
  referenceNumber: string

}

const initialData: IBinder = {
  id: 0,
  referenceNumber: '1234'
}


const ReinsurerBinders = () => {
  // ** State


  // Handle Data
  const [binderList, setBinderList] = useState<IBinder[]>([])
  const [binderData, setBinderData] = useState<IBinder>(initialData)
  const [currentBinder, setCurrentBinder] = useState<IBinder | null>(null);
  const [selectedRow, setSelectedRow] = useState<IBinder | null>(null);
  const [binderToDelete, setBinderToDelete] = useState<number | undefined>(0)

  //Handle View
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [btnDisable, setBtnDisable] = useState(true)
  const [btnEditDisable, setBtnEditDisable] = useState(true)

  // Handle new binder validations
  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)

  //Handle edit binder validations
  const [startEditValidations, setStartEditValidations] = useState(false)
  const [errorEdit, setErrorEdit] = useState(true)

  // Handle modals
  const [openNewBinder, setOpenNewBinder] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  // Handle alerts
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertIcon, setAlertIcon] = useState('');

  const column: GridColumns<IBinder> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'contact-name ',
      headerName: 'REFERENCE NUMBER',
      minWidth: 170,
      type: 'string',
      align: 'left',
      sortable: false,
      headerClassName: ' broker-contacts-header',
      renderHeader: () =>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            REFERENCE NUMBER
          </Typography>

        </Box>,
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.referenceNumber}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'Actions',
      minWidth: 70,
      maxWidth: 70,
      sortable: false,
      align: 'right',
      disableColumnMenu: true,
      cellClassName: 'catalogue-column-cell-pl-0',
      renderHeader: ({ }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        </Box>),

      renderCell: ({ row }) => {
        const showActions = row === selectedRow;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
            <div className='actions-wrapper'>
              <IconButton
                onClick={() => {
                  if (showActions) {
                    setSelectedRow(null);
                  } else {
                    setSelectedRow(row);
                  }
                }}
                size='small'
                sx={{ mr: 1 }}
              >
                <Icon icon='mdi:dots-vertical' />
              </IconButton>
              {showActions &&
                <div className='actions-menu'>
                  <div className='menu-option' onClick={() => handleEditBinder(row)}>
                    Edit
                  </div>
                  <div className='menu-option' onClick={() => handleDeleteBinder(row.id)}>
                    Delete
                  </div>
                </div>}
            </div>

          </Box>
        )
      }
    }
  ]

  const triggerAlert = (type: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText('NEW BINDER ADDED')
        setAlertIcon('mdi:check-circle-outline')
        break;
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break;
      case 'warn':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break;
      default:
        break
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);


  };

  // const handleRowClick = (row: any) => {
  //   setSelectedRow(row);
  //   console.log("handle row")
  // };

  const getContactList = () => { //must be replaced with the respective broker service
    const data: IBinder[] = []

    for (let index = 1; index <= 100; index++) {
      const id = index
      const referenceNumber = `#DR00000${(Math.floor(Math.random() * 9000) + 1000).toString()}HYT`;

      data.push({
        id,
        referenceNumber
      })
    }

    return data
  }

  const handleChangeModal = (field: keyof IBinder, value: any) => {
    setStartValidations(true)
    setBinderData({ ...binderData, [field]: value })
  }

  const handleDeleteBinder = (id: number | undefined) => {
    setBinderToDelete(id);
    setSelectedRow(null);
    setOpenDelete(true);
  }

  const handleEditBinder = (row: IBinder) => {
    console.log(row)
    setCurrentBinder(row)
    setSelectedRow(null);
    setOpenEdit(true)
  }

  const searchBinders = (value: string) => { //must be replaced with the respective broker service
    console.log("Call search service", value)
  }

  const editBinder = () => { //must be replaced with the respective broker service
    console.log("call method to edit Binder", currentBinder)
    setOpenEdit(false)
  }

  const deleteBinder = () => {  //must be replaced with the respective broker service
    const newBinderList = binderList.filter(binder => binder.id !== binderToDelete)
    setBinderList(newBinderList)
    setOpenDelete(false)
  }

  const handleCreateBinder = () => {//must be replaced with the respective broker service
    console.log('Cal create contact service', binderData)
    setOpenNewBinder(false)

    triggerAlert("success")

    // triggerAlert("error")
    // triggerAlert("warn")
  }

  useEffect(() => {
    if (binderData.referenceNumber == undefined) {
      setError(true)
    }

    if (startValidations) {
      if (binderData.referenceNumber.length < 14) {
        setError(true)
      } else {
        setError(false)
      }
    }
    if (error) setBtnDisable(true)
    else if (!error) setBtnDisable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    binderData.referenceNumber,
    error,
  ])

  useEffect(() => {
    if (currentBinder) {
      if (currentBinder.referenceNumber == undefined) {
        setErrorEdit(true)
      }

      if (startEditValidations) {
        if (currentBinder.referenceNumber.length < 14) {
          setErrorEdit(true)
        } else {
          setErrorEdit(false)
        }
      }
      if (errorEdit) setBtnEditDisable(true)
      else if (!errorEdit) setBtnEditDisable(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentBinder?.referenceNumber,
    errorEdit,
  ])

  useEffect(() => {
    setBinderList(getContactList)
    //eslint-disable-next-line
  }, [])



  return (
    <>
      <div className='contacts-wrapper'>
        <div className='title'>Binder</div>
        <div className='description'>
          Here you will find the Binders linked to
          this specific Reinsurer, you can add one
          or more Binders.
        </div>
        <div className='table-header'>
          <TableHeader
            onSearch={searchBinders}
            textBtn="ADD NEW CONTACT"
            onClickBtn={() => { setOpenNewBinder(true) }}
          />
          {showAlert &&
            <div className={`${alertType} contacts-alert`}>
              <div className='btn-icon'>
                <Icon icon={alertIcon} />
              </div>
              {alertText}
            </div>}
        </div>

        <div className='contact-list'>

          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={binderList}

            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            className={'catalogue-datagrid'}
            onSelectionModelChange={rows => setSelectedRows(rows)}
          />
        </div>

      </div>
      <Modal className='create-contact-modal' open={openNewBinder} onClose={() => setOpenNewBinder(false)}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Add Binder</Typography>
            <ButtonClose onClick={() => setOpenNewBinder(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                className='reference-number'
                label='Reference Number'
                value={binderData.referenceNumber}
                onChange={e => handleChangeModal('referenceNumber', e.target.value)}
              />

              {error && <FormHelperText sx={{ color: 'error.main' }}>Invalid Reference Number</FormHelperText>}
            </FormControl>

          </div>
          <Button
            className='create-contact-modal'
            disabled={btnDisable}
            variant='contained'
            onClick={handleCreateBinder}
          >
            CREATE
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpenNewBinder(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
      <Modal
        className='delete-modal'
        open={openDelete}
        onClose={() => {
          setOpenDelete(false)
        }}
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6' sx={{ maxWidth: "450px" }}>Are you sure you want to delete this Binder?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteBinder}>
            DELETE
          </Button>
          <Button
            className='close-modal header-modal-btn'
            onClick={() => {
              setOpenDelete(false)
            }}
          >
            CANCEL
          </Button>
        </Box>
      </Modal>
      <Modal className='create-contact-modal' open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Add Binder</Typography>
            <ButtonClose onClick={() => setOpenEdit(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                className='reference-number'
                label='Reference Number'
                value={currentBinder?.referenceNumber}
                onChange={e => {
                  setCurrentBinder({ id: currentBinder?.id, referenceNumber: e.target.value })
                  setStartEditValidations(true)
                }}
              />

              {errorEdit && <FormHelperText sx={{ color: 'error.main' }}>Invalid Reference Number</FormHelperText>}
            </FormControl>

          </div>
          <Button
            className='create-contact-modal'
            disabled={btnEditDisable}
            variant='contained'
            onClick={editBinder}
          >
            EDIT
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpenEdit(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ReinsurerBinders
