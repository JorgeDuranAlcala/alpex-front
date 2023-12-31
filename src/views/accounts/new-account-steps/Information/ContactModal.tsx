import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

// ** Icon Imports
import CloseIcon from '@mui/icons-material/Close'
import Icon from 'src/@core/components/icon'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

//Hooks
import { useAddBrokerContact } from 'src/hooks/catalogs/broker-contact'
import { useAddCedantContact } from 'src/hooks/catalogs/cedant-contact'
import { useGetAllCountries } from 'src/hooks/catalogs/country'

//interfaces
import { BasicInfoInterface } from 'src/views/accounts/new-account-steps/Information/Information'

type Service = 'broker' | 'cedant'

interface Props {
  service: Service
  id: number
  disabledBtn: boolean
  updateContacts: (id: number) => void
  setIdCreated: React.Dispatch<React.SetStateAction<BasicInfoInterface>>
  setUpdateInfo: (valid: boolean) => void
}

interface ContactData {
  name: string
  email: string
  phone: string
  country: string
}

const initialContactData: ContactData = {
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

export const ContactModal = ({ id, service, updateContacts, setIdCreated, disabledBtn, setUpdateInfo }: Props) => {
  const [contactData, setContactData] = useState<ContactData>(initialContactData)
  const [open, setOpen] = useState<boolean>(false)

  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [, setEmptyForm] = useState(true)

  const { countries } = useGetAllCountries()
  const { saveBrokerContact } = useAddBrokerContact()
  const { saveCedantContact } = useAddCedantContact()
  const ALPHA_REGEX = /^[a-zA-ZÀ-ÿ\s]+$/;

  // const {  saveCedant } = useAddCedant()

  const closeModal = () => {
    setOpen(false)
    setContactData({ ...initialContactData })
    setNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setCountryError(false)
    setEmptyForm(false)
    setStartValidations(false)
  }

  const saveContact = async () => {
    switch (service) {
      case 'broker':
        saveBrokerContact({
          email: contactData.email,
          name: contactData.name,
          phone: contactData.phone,
          idCCountry: Number(contactData.country),
          idCBroker: id
        })
          .then(contactBroker => {
            setIdCreated(state => ({
              ...state,
              brokerContact: contactBroker.id
            }))
            setUpdateInfo(true)
            setStartValidations(false)
            setError(true)
            updateContacts(id)
          })
          .catch(err => {
            console.error('ERROR-SERVICE [saveBrokerContact]', err)
          })

        break

      case 'cedant':
        saveCedantContact({
          email: contactData.email,
          name: contactData.name,
          phone: contactData.phone,
          idCCountry: Number(contactData.country),
          idCCedant: id
        })
          .then(contactCedant => {
            setIdCreated(state => ({
              ...state,
              cedantContact: contactCedant.id
            }))
            setStartValidations(false)
            setError(true)
            updateContacts(id)
          })
          .catch(err => {
            console.error('ERROR-SERVICE [saveCedantContact]', err)
          })

        break
    }
    closeModal()
  }

  const handleChange = (field: keyof ContactData, value: ContactData[keyof ContactData]) => {
    setContactData({ ...contactData, [field]: value })
    switch (field) {
      case 'name':
        setNameError(false)
        break
      case 'email':
        setEmailError(false)
        break
      case 'phone':
        setPhoneError(false)
        break
      case 'country':
        setCountryError(false)
        break

      default:
        break
    }
    setStartValidations(false)
  }

  const validateForm = () => {
    const nameErrorTemp = !expresions.name.test(contactData.name)
    const phoneErrorTemp = contactData.phone === undefined || contactData.phone === ''
    const countryErrorTemp = contactData.country === undefined || contactData.country === ''
    const emailErrorTemp = !expresions.email.test(contactData.email)

    const errorTemp = nameErrorTemp || emailErrorTemp || phoneErrorTemp || countryErrorTemp


    setError(errorTemp)
    setEmptyForm(errorTemp)
    setNameError(nameErrorTemp)
    setEmailError(emailErrorTemp)
    setPhoneError(phoneErrorTemp)
    setCountryError(countryErrorTemp)
    setStartValidations(false)
  }

  useEffect(() => {
    startValidations && validateForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValidations, setStartValidations])

  useEffect(() => {
    !error && saveContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, setError])

  return (
    <>
      <Button className='create-contact-btn' disabled={disabledBtn} onClick={() => setOpen(true)}>
        CREATE NEW CONTACT
        <div className='btn-icon'>
          <Icon icon='mdi:plus-circle-outline' />
        </div>
      </Button>
      <Modal
        className='create-contact-modal'
        open={open}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Create new contact</Typography>
            <ButtonClose onClick={closeModal}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Name'
                value={contactData.name}
                onChange={e => handleChange('name', e.target.value)}
                onKeyDown={(event) => {
                  if (!ALPHA_REGEX.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />

              {nameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact email'
                value={contactData.email}
                onChange={e => handleChange('email', e.target.value)}
              />

              {emailError && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {contactData.email == '' || contactData.email == undefined
                    ? 'This field is required'
                    : 'Enter a valid email, example name@email.com'}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={contactData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />

              {phoneError && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {contactData.phone == '' || contactData.phone == undefined
                    ? 'This field is required'
                    : ''}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={contactData.country}
                onChange={(e: any) => handleChange('country', e.target.value)}
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
          <Button
            className='create-contact-modal'
            variant='contained'
            onClick={() => {
              setStartValidations(true)
            }}
          >
            CREATE
          </Button>
          <Button className='create-contact-modal' onClick={closeModal}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}
