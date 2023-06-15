// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, TextField, Typography } from '@mui/material'
import Select from '@mui/material/Select'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'

import FormHelperText from '@mui/material/FormHelperText'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useAddReinsuranceCompanyContact } from '@/hooks/catalogs/reinsuranceCompanyContact/useAdd'
import { useDeleteReinsuranceCompanyContact } from '@/hooks/catalogs/reinsuranceCompanyContact/useDelete'
import useGetAllByIdReinsuranceCompanyAndPagination from '@/hooks/catalogs/reinsuranceCompanyContact/useGetAllByIdReinsuranceAndPagination'
import { useUpdateById } from '@/hooks/catalogs/reinsuranceCompanyContact/useUpdateById'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IContact {
  id: number
  name: string
  phone: string
  email: string
  idCCountry: ICountry
  idCReinsuranceCompany: number
}

export interface ICountry {
  id: number
  name?: string
  currency?: string
}

const initialNewContact: IContact = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  idCCountry: { id: 0 },
  idCReinsuranceCompany: 0
}

const expresions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email:
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
  phone: /^\d{10}$/ // 7 a 10 numeros.
}

interface IReinsuranceCompanyContacts {
  idReinsuranceCompany: number
}

const ReinsurerContacts = ({ idReinsuranceCompany }: IReinsuranceCompanyContacts) => {
  // Const declatation :

  // Handle Data
  const [newContactData, setNewContactData] = useState<IContact>(initialNewContact) //saves the new contact data
  const [currentContact, setCurrentContact] = useState<IContact>(initialNewContact) //saves the row data to be edited
  const [selectedRow, setSelectedRow] = useState<IContact | null>(null) // saves the row wehen user click on actions button
  const [contactToDelete, setContactToDelete] = useState(0) //Saves id of contact to be deleted.

  // Handle view
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<any[]>([])
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
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //hooks
  const { deleteReinsuranceCompanyContact } = useDeleteReinsuranceCompanyContact()
  const { saveReinsuranceCompanyContact } = useAddReinsuranceCompanyContact()
  const { countries } = useGetAllCountries()
  const { update } = useUpdateById()
  const {
    reinsuranceCompanyContactsPagination,
    reinsuranceCompanyContacts,
    setReinsuranceCompanyContactsPagination,
    getReinsuranceCompanyContactsByIdReinsuranceCompany,
    reinsuranceCompanyContactInfoPage
  } = useGetAllByIdReinsuranceCompanyAndPagination()

  useEffect(() => {
    idReinsuranceCompany != 0 &&
      setReinsuranceCompanyContactsPagination({
        ...reinsuranceCompanyContactsPagination,
        idCReinsuranceCompany: idReinsuranceCompany
      })
    //eslint-disable-next-line
  }, [idReinsuranceCompany])

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText(text || 'NEW CONTACT ADDED')
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break
      default:
        break
    }

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

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
      headerClassName: 'reinsurer-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            CONTACT NAME
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>{row.name}</Typography>
      )
    },
    {
      flex: 0.1,
      field: 'phone-number',
      headerName: 'PHONE NUMBER',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'reinsurer-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            PHONE NUMBER
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>{row.phone}</Box>
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
      headerClassName: 'reinsurer-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            EMAIL
          </Typography>
        </Box>
      ),
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
      headerClassName: 'reinsurer-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            COUNTRY
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.idCCountry.name}
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
      renderHeader: () => (
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
        ></Box>
      ),
      renderCell: ({ row }) => {
        const showActions = row === selectedRow

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div className='actions-wrapper'>
              <IconButton
                onClick={() => {
                  if (showActions) {
                    setSelectedRow(null)
                  } else {
                    setSelectedRow(row)
                  }
                }}
                size='small'
                sx={{ mr: 1 }}
              >
                <Icon icon='mdi:dots-vertical' />
              </IconButton>
              {showActions && (
                <div className='actions-menu'>
                  <div className='menu-option' onClick={() => handleEditContact(row)}>
                    Edit
                  </div>
                  <div className='menu-option' onClick={() => handleDeleteContact(row.id)}>
                    Delete
                  </div>
                </div>
              )}
            </div>
          </Box>
        )
      }
    }
  ]

  const handleChangeModal = (field: keyof IContact, value: IContact[keyof IContact]) => {
    setStartValidations(true)
    setNewContactData({ ...newContactData, [field]: value })
  }

  const handleEditModal = (field: keyof IContact, value: IContact[keyof IContact]) => {
    setStartEditValidations(true)
    setCurrentContact({ ...currentContact, [field]: value })
  }

  const handleDeleteContact = (id: number) => {
    setContactToDelete(id)
    setSelectedRow(null)
    setOpenDelete(true)
  }

  const handleEditContact = (row: IContact) => {
    setCurrentContact(row)
    setSelectedRow(null)
    setOpenEdit(true)
  }

  const searchContacts = (value: string) => {
    if (value === '') {
      setReinsuranceCompanyContactsPagination({
        ...reinsuranceCompanyContactsPagination,
        filters: [],
        info: { ...reinsuranceCompanyContactsPagination.info, page: 1 }
      })
    } else {
      setReinsuranceCompanyContactsPagination({
        ...reinsuranceCompanyContactsPagination,
        filters: [{ type: 'name', value: value, text: value }],
        info: { ...reinsuranceCompanyContactsPagination.info, page: 1 }
      })
    }
  }

  const createContact = async () => {
    const result = await saveReinsuranceCompanyContact({
      ...newContactData,
      idCReinsuranceCompany: idReinsuranceCompany,
      idCCountry: newContactData.idCCountry.id
    })
    if (result) {
      triggerAlert('success')
      setNewContactData(initialNewContact)
      getReinsuranceCompanyContactsByIdReinsuranceCompany(reinsuranceCompanyContactsPagination)
    }
    setOpenNewContact(false)
    triggerAlert('success')
  }

  const editContact = async () => {
    const result = await update(currentContact.id, {
      ...currentContact,
      idCReinsuranceCompany: idReinsuranceCompany,
      idCCountry: currentContact.idCCountry.id
    })
    if (result) {
      triggerAlert('success', 'CHANGES SAVED')
      getReinsuranceCompanyContactsByIdReinsuranceCompany(reinsuranceCompanyContactsPagination)
    }
    setOpenEdit(false)
  }

  const deleteContact = async () => {
    const result = await deleteReinsuranceCompanyContact({ idDeleteList: [contactToDelete] })
    if (result) {
      getReinsuranceCompanyContactsByIdReinsuranceCompany(reinsuranceCompanyContactsPagination)
      triggerAlert('success', 'DELETED')
    }
    setOpenDelete(false)
  }

  const deleteRows = async () => {
    const result = await deleteReinsuranceCompanyContact({ idDeleteList: selectedRows })
    if (result) {
      getReinsuranceCompanyContactsByIdReinsuranceCompany(reinsuranceCompanyContactsPagination)
      triggerAlert('success', 'DELETED')
    }
    setOpenDeleteRows(false)
  }

  useEffect(() => {
    if (
      newContactData.name !== undefined &&
      newContactData.name !== '' &&
      newContactData.email !== undefined &&
      newContactData.email !== '' &&
      newContactData.phone !== undefined &&
      newContactData.phone !== '' &&
      newContactData.idCCountry !== undefined &&
      newContactData.idCCountry.id !== 0
    ) {
      setEmptyForm(false)
    } else {
      setEmptyForm(true)
      setError(true)
    }

    if (startValidations) {
      if (expresions.name.test(newContactData.name)) {
        setNameError(false)
      } else {
        setNameError(true)
        setError(true)
      }

      if (expresions.email.test(newContactData.email)) {
        setEmailError(false)
      } else {
        setEmailError(true)
        setError(true)
      }

      if (expresions.phone.test(newContactData.phone)) {
        setPhoneError(false)
      } else {
        setPhoneError(true)
        setError(true)
      }

      if (newContactData.idCCountry !== undefined && newContactData.idCCountry.id !== 0) {
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
    newContactData.name,
    newContactData.email,
    newContactData.phone,
    newContactData.idCCountry,
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
      currentContact.idCCountry !== undefined &&
      currentContact.idCCountry.id !== 0
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

      if (currentContact.idCCountry !== undefined && currentContact.idCCountry.id !== 0) {
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
    currentContact.idCCountry,
    editError,
    editNameError,
    editEmailError,
    editPhoneError,
    editCountryError,
    emptyEditForm
  ])

  const handleDispatch = (e: any, value: number) => {
    setReinsuranceCompanyContactsPagination({
      ...reinsuranceCompanyContactsPagination,
      info: { ...reinsuranceCompanyContactsPagination.info, page: value }
    })
  }

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='title'>Contacts</div>
        <div className='description'>
          Here you will find the contacts linked to this specific ReinsuranceCompany, you can add one or more contacts.
        </div>
        <div className='table-header'>
          <TableHeader
            onSearch={searchContacts}
            onDeleteRows={() => {
              setOpenDeleteRows(true)
            }}
            deleteBtn={selectedRows.length > 0 ? true : false}
            textBtn='ADD NEW CONTACT'
            onClickBtn={() => {
              setOpenNewContact(true)
            }}
            addBtnDisable={idReinsuranceCompany === 0}
          />
          {showAlert && (
            <div className={`${alertType} contacts-alert`}>
              <div className='btn-icon'>
                <Icon icon={alertIcon} />
              </div>
              {alertText}
            </div>
          )}
        </div>

        <div className='contact-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={reinsuranceCompanyContacts}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...reinsuranceCompanyContactInfoPage } }
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
                value={newContactData.name}
                onChange={e => handleChangeModal('name', e.target.value)}
              />

              {nameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact email'
                value={newContactData.email}
                onChange={e => handleChangeModal('email', e.target.value)}
              />

              {emailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={newContactData.phone}
                onChange={e => handleChangeModal('phone', e.target.value)}
              />

              {phoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={newContactData.idCCountry.id}
                onChange={e => handleChangeModal('idCCountry', { id: parseInt(e.target.value.toString()) })}
                labelId='invoice-country'
              >
                {countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })}
              </Select>

              {countryError && (
                <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                  Select a country
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button className='create-contact-modal' disabled={btnDisable} variant='contained' onClick={createContact}>
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
            <Typography variant='h6' sx={{ maxWidth: '450px' }}>
              Are you sure you want to delete this Contact?
            </Typography>
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
                value={currentContact.idCCountry.id}
                onChange={e => handleEditModal('idCCountry', { id: parseInt(e.target.value.toString()) })}
                labelId='invoice-country'
              >
                {countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })}
              </Select>

              {editCountryError && (
                <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                  Select a country
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button className='create-contact-modal' disabled={btnEditDisable} variant='contained' onClick={editContact}>
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

export default ReinsurerContacts
