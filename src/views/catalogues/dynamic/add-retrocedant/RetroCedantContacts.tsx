// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, TextField, Typography } from '@mui/material'
import Select from '@mui/material/Select'
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

export interface IContact {
  id: number
  name: string
  phone: string
  email: string
  country: string
}

const initialNewContact: IContact = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  country: ''
}

const expresions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email:
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
  phone: /^\d{10}$/ // 7 a 10 numeros.
}

const BrokerContacts = () => {
  // ** State
  // Handle Data
  const [contactList, setContactList] = useState<IContact[]>([])
  const [contactData, setContactData] = useState<IContact>(initialNewContact)
  const [currentContact, setCurrentContact] = useState<IContact>(initialNewContact); //saves the row data to be edited
  const [selectedRow, setSelectedRow] = useState<IContact | null>(null); // saves the row wehen user click on actions button
  const [contactToDelete, setContactToDelete] = useState(0) //Saves id of contact to be deleted.

  // Handle view
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [btnDisable, setBtnDisable] = useState(true)
  const [btnEditDisable, setBtnEditDisable] = useState(true)

  // Handle new contact validations
  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [emptyForm, setEmptyForm] = useState(true)


  // Handle edit contact validations
  const [startEditValidations, setStartEditValidations] = useState(false)
  const [editError, setEditError] = useState(true)
  const [editNameError, setEditNameError] = useState(false)
  const [editEmailError, setEditEmailError] = useState(false)
  const [editPhoneError, setEditPhoneError] = useState(false)
  const [editCountryError, setEditCountryError] = useState(false)
  const [emptyEditForm, setEmptyEditForm] = useState(true)

  // Handle modals
  const [openNewContact, setOpenNewContact] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)

  // Handle Alerts
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertIcon, setAlertIcon] = useState('');

  const triggerAlert = (type: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText('NEW CONTACT ADDED')
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

  const column: GridColumns<IContact> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: 'contact-name ',
      headerName: 'CONTACT NAME',
      minWidth: 300,
      maxWidth: 300,
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
            CONTACT NAME
          </Typography>

        </Box>,
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: "phone-number",
      headerName: 'PHONE NUMBER',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            PHONE NUMBER
          </Typography>

        </Box>),
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.phone}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: 'email',
      headerName: 'EMAIL',
      minWidth: 100,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () =>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            EMAIL
          </Typography>

        </Box>,
      renderCell: ({ row }) => (
        <Typography
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px14, fontFamily: fonts.inter }}
        >
          {row.email}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'country',
      headerName: 'COUNTRY',
      minWidth: 100,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () => <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography
          component={'span'}
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
        >
          COUNTRY
        </Typography>

      </Box>,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.country}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'ACTIONS',
      minWidth: 50,
      maxWidth: 70,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'reinsurer-contacts-header',
      renderHeader: () => <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>

      </Box>,
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
                }
                }
                size='small'
                sx={{ mr: 1 }}
              >
                <Icon icon='mdi:dots-vertical' />
              </IconButton>
              {showActions &&
                <div className='actions-menu'>

                  <div className='menu-option' onClick={() => handleEditContact(row)}>
                    Edit
                  </div>
                  <div className='menu-option' onClick={() => handleDeleteContact(row.id)}>
                    Delete
                  </div>
                </div>}
            </div>

          </Box>
        )
      }
    },

  ]

  const getContactList = () => { //must be replaced with the respective broker service
    const data: IContact[] = []

    for (let index = 1; index <= 100; index++) {
      const id = index
      const name = `Contact ${index}`

      data.push({
        id,
        name,
        phone: '2221334455',
        email: 'user@mail.com',
        country: 'México'
      })
    }

    return data
  }

  const handleChangeModal = (field: keyof IContact, value: IContact[keyof IContact]) => {
    setStartValidations(true)
    setContactData({ ...contactData, [field]: value })
  }

  const handleEditModal = (field: keyof IContact, value: IContact[keyof IContact]) => {
    setStartEditValidations(true)
    setCurrentContact({ ...currentContact, [field]: value })
  }

  const handleDeleteContact = (id: number) => {
    setContactToDelete(id);
    setSelectedRow(null);
    setOpenDelete(true);
  }

  const handleEditContact = (row: IContact) => {
    setCurrentContact(row)
    setSelectedRow(null);
    setOpenEdit(true)
  }

  const searchContacts = (value: string) => { //must be replaced with the respective broker service
    console.log("Call search service", value)
  }
  const handleCreateContact = () => {
    console.log('Cal create contact service', contactData)
    setOpenNewContact(false)

    triggerAlert("success")

    // triggerAlert("error")
    // triggerAlert("warn")
  }

  const editContact = () => { //must be replaced with the respective reinsurers service
    console.log("call method to edit contact", currentContact)
    setOpenEdit(false)
  }

  const deleteContact = () => {  //must be replaced with the respective reinsurers service
    const newContactList = contactList.filter(contact => contact.id !== contactToDelete)
    setContactList(newContactList)
    setOpenDelete(false)
  }

  const deleteRows = () => {  //must be replaced with the respective broker service
    // const newContactList = // Service return new list
    // setContactList(newBinderList)
    setOpenDeleteRows(false)
  }


  useEffect(() => {
    if (
      contactData.name !== undefined &&
      contactData.name !== '' &&
      contactData.email !== undefined &&
      contactData.email !== '' &&
      contactData.phone !== undefined &&
      contactData.phone !== '' &&
      contactData.country !== undefined &&
      contactData.country !== ''
    ) {
      setEmptyForm(false)
    } else {
      setEmptyForm(true)
      setError(true)
    }

    if (startValidations) {
      if (expresions.name.test(contactData.name)) {
        setNameError(false)
      } else {
        setNameError(true)
        setError(true)
      }

      if (expresions.email.test(contactData.email)) {
        setEmailError(false)
      } else {
        setEmailError(true)
        setError(true)
      }

      if (expresions.phone.test(contactData.phone)) {
        setPhoneError(false)
      } else {
        setPhoneError(true)
        setError(true)
      }

      if (contactData.country !== undefined && contactData.country !== '') {
        setCountryError(false)
      } else {
        setCountryError(true)
        setError(true)
      }

      if (!nameError && !emailError && !phoneError && !countryError && !emptyForm) {
        setError(false)
      } else {
        setError(true)
      }
    }
    if (error) setBtnDisable(true)
    else if (!error) setBtnDisable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contactData.name,
    contactData.email,
    contactData.phone,
    contactData.country,
    error,
    nameError,
    emailError,
    phoneError,
    countryError,
    emptyForm
  ])

  useEffect(() => {
    if (
      currentContact.name !== undefined &&
      currentContact.name !== '' &&
      currentContact.email !== undefined &&
      currentContact.email !== '' &&
      currentContact.phone !== undefined &&
      currentContact.phone !== '' &&
      currentContact.country !== undefined &&
      currentContact.country !== ''
    ) {
      setEmptyEditForm(false)
    } else {
      setEmptyEditForm(true)
      setEditError(true)
    }

    if (startEditValidations) {
      if (expresions.name.test(currentContact.name)) {
        setEditNameError(false)
      } else {
        setEditNameError(true)
        setEditError(true)
      }

      if (expresions.email.test(currentContact.email)) {
        setEditEmailError(false)
      } else {
        setEditEmailError(true)
        setEditError(true)
      }

      if (expresions.phone.test(currentContact.phone)) {
        setEditPhoneError(false)
      } else {
        setEditPhoneError(true)
        setEditError(true)
      }

      if (currentContact.country !== undefined && currentContact.country !== '') {
        setEditCountryError(false)
      } else {
        setEditCountryError(true)
        setEditError(true)
      }

      if (!editNameError && !editEmailError && !editPhoneError && !editCountryError && !emptyEditForm) {
        setEditError(false)
      } else {
        setEditError(true)
      }
    }
    if (editError) setBtnEditDisable(true)
    else if (!editError) setBtnEditDisable(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentContact.name,
    currentContact.email,
    currentContact.phone,
    currentContact.country,
    editError,
    editNameError,
    editEmailError,
    editPhoneError,
    editCountryError,
    emptyEditForm
  ])

  useEffect(() => {
    setContactList(getContactList)
    //eslint-disable-next-line
  }, [])


  return (
    <>
      <div className='contacts-wrapper'>
        <div className='title'>Contacts</div>
        <div className='description'>
          Here you will find the contacts linked
          to this specific Broker, you can add one
          or more contacts.
        </div>
        <div className='table-header'>
          <TableHeader
            onSearch={searchContacts}
            onDeleteRows={() => {
              setOpenDeleteRows(true)
            }}
            deleteBtn={selectedRows.length > 0 ? true : false}
            textBtn="ADD NEW CONTACT"
            onClickBtn={() => { setOpenNewContact(true) }}
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
            rows={contactList}
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
      <Modal className='create-contact-modal' open={openNewContact} onClose={() => setOpenNewContact(false)}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Create new contact</Typography>
            <ButtonClose onClick={() => setOpenNewContact(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Name'
                value={contactData.name}
                onChange={e => handleChangeModal('name', e.target.value)}
              />

              {nameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact email'
                value={contactData.email}
                onChange={e => handleChangeModal('email', e.target.value)}
              />

              {emailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={contactData.phone}
                onChange={e => handleChangeModal('phone', e.target.value)}
              />

              {phoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={contactData.country}
                onChange={e => handleChangeModal('country', e.target.value)}
                labelId='invoice-country'
              >
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
              </Select>

              {countryError && (
                <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                  Select a country
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button
            className='create-contact-modal'
            disabled={btnDisable}
            variant='contained'
            onClick={handleCreateContact}
          >
            CREATE
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpenNewContact(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>

      <Modal
        className='delete-modal'
        open={openDeleteRows}
        onClose={() => {
          setOpenDeleteRows(false)
        }}
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6' sx={{ maxWidth: '450px' }}>
              Are you sure you want to delete the selected contacts?
            </Typography>
            <ButtonClose
              onClick={() => {
                setOpenDeleteRows(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteRows}>
            DELETE
          </Button>
          <Button
            className='close-modal header-modal-btn'
            onClick={() => {
              setOpenDeleteRows(false)
            }}
          >
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
            <Typography variant='h6' sx={{ maxWidth: "450px" }}>Are you sure you want to delete this Contact?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteContact}>
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
            <Typography variant='h6'>Edit contact</Typography>
            <ButtonClose onClick={() => setOpenEdit(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Name'
                value={currentContact.name}
                onChange={e => handleEditModal('name', e.target.value)}
              />

              {editNameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact email'
                value={currentContact.email}
                onChange={e => handleEditModal('email', e.target.value)}
              />

              {editEmailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={currentContact.phone}
                onChange={e => handleEditModal('phone', e.target.value)}
              />

              {editPhoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={currentContact.country}
                onChange={e => handleEditModal('country', e.target.value)}
                labelId='invoice-country'
              >
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
              </Select>

              {editCountryError && (
                <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                  Select a country
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button
            className='create-contact-modal'
            disabled={btnEditDisable}
            variant='contained'
            onClick={editContact}
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

export default BrokerContacts
