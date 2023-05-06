import React, { ForwardedRef, ReactNode, forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Components

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}

interface ContactData {
  name: string
  email: string
  phone: string
  country: string
}

interface IModal {
  id: string
}

interface BasicInfoErrors {
  insuredError: boolean
  countryError: boolean
  brokerError: boolean
  cedantError: boolean
  lineOfBusinessError: boolean
  underwriterError: boolean
  leadUnderwriterError: boolean
  technicalAssistantError: boolean
  industryCodeError: boolean
  riskActivityError: boolean
  riskClassError: boolean
  receptionDateError: boolean
  effectiveDateError: boolean
  expirationDateError: boolean
}

type BasicInfoProps = {
  basicInfo: {
    insured: string
    country: string
    broker: string
    brokerContact: string
    cedant: string
    cedantContact: string
    lineOfBusiness: string
    underwriter: string
    leadUnderwriter: string
    industryCode: string
    riskActivity: string
    riskClass: string
    technicalAssistant: string
    receptionDate: Date | null
    effectiveDate: Date | null
    expirationDate: Date | null
  }
  setBasicInfo: React.Dispatch<
    React.SetStateAction<{
      insured: string
      country: string
      broker: string
      brokerContact: string
      cedant: string
      cedantContact: string
      lineOfBusiness: string
      underwriter: string
      leadUnderwriter: string
      industryCode: string
      riskActivity: string
      riskClass: string
      technicalAssistant: string
      receptionDate: Date | null
      effectiveDate: Date | null
      expirationDate: Date | null
    }>
  >
  makeValidations: boolean
  resetMakeValidations: () => void
  isValidForm?: (valid: boolean) => void
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

/* eslint-disable */
const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id='date-textfield'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})

const ModalContact = ({ id }: IModal) => {
  const [contactData, setContactData] = useState<ContactData>(initialContactData)
  const [open, setOpen] = useState<boolean>(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [emptyForm, setEmptyForm] = useState(true)

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

  const handleChange = (field: keyof ContactData, value: ContactData[keyof ContactData]) => {
    setStartValidations(true)
    setContactData({ ...contactData, [field]: value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateContact = () => {
    console.log('createContact')
  }
  return (
    <>
      <Button className='create-contact-btn' onClick={() => setOpen(true)}>
        <div className='btn-icon'>
          <Icon icon='mdi:plus-circle-outline' />
        </div>
        CREATE NEW CONTACT
      </Button>
      <Modal className='create-contact-modal' open={open} onClose={handleClose}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Create new contact</Typography>
            <ButtonClose onClick={handleClose}>
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

              {emailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={contactData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />

              {phoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={contactData.country}
                onChange={e => handleChange('country', e.target.value)}
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
          <Button className='create-contact-modal' onClick={() => setOpen(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker'
import { useGetAllByIdBroker } from 'src/hooks/catalogs/broker-contact'
import { useGetAll as useCedantGetAll } from 'src/hooks/catalogs/cedant'
import { useGetAllByIdCedant } from 'src/hooks/catalogs/cedant-contact'

const BasicInfo: React.FC<BasicInfoProps> = ({
  basicInfo,
  setBasicInfo,
  makeValidations,
  resetMakeValidations,
  isValidForm
}) => {
  //cargamos la información de los catálogos de base de datos
  const { brokers } = useBrokerGetAll()
  const { cedant } = useCedantGetAll()
  const { contacts: brokerContacts, findByIdBroker } = useGetAllByIdBroker()
  const { contacts: cedantContacts, findByIdCedant } = useGetAllByIdCedant()

  const [bussinesFields, setBussinesFields] = useState(true)
  const [errors, setErrors] = useState<BasicInfoErrors>({
    insuredError: false,
    countryError: false,
    brokerError: false,
    cedantError: false,
    lineOfBusinessError: false,
    underwriterError: false,
    leadUnderwriterError: false,
    technicalAssistantError: false,
    receptionDateError: false,
    effectiveDateError: false,
    expirationDateError: false,
    industryCodeError: false,
    riskActivityError: false,
    riskClassError: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBasicInfo({ ...basicInfo, [name]: value })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const target = event.target
    const name = target.name
    const value = target.value

    setBasicInfo({
      ...basicInfo,
      [name]: value
    })
    if (name == 'lineOfBusiness') {
      setBussinesFields(false)
    }

    if (name === 'broker') findByIdBroker(Number(value))
    if (name === 'cedant') findByIdCedant(Number(value))
  }
  const handleReceptionDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, receptionDate: date })
  }

  const handleEffectiveDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, effectiveDate: date })
  }

  const handleExpirationDateChange = (date: Date | null) => {
    setBasicInfo({ ...basicInfo, expirationDate: date })
  }

  const validations = () => {
    console.log('entro a la validación')
    const newErrors: BasicInfoErrors = {
      insuredError: basicInfo.insured === '',
      countryError: basicInfo.country === '',
      brokerError: basicInfo.broker === '',
      cedantError: basicInfo.cedant === '',
      lineOfBusinessError: basicInfo.lineOfBusiness === '',
      underwriterError: basicInfo.underwriter === '',
      leadUnderwriterError: basicInfo.leadUnderwriter === '',
      technicalAssistantError: basicInfo.technicalAssistant === '',
      industryCodeError: basicInfo.industryCode === '',
      riskActivityError: basicInfo.riskActivity === '',
      riskClassError: basicInfo.riskClass === '',
      receptionDateError: basicInfo.receptionDate === null,
      effectiveDateError: basicInfo.effectiveDate === null,
      expirationDateError: basicInfo.expirationDate === null
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      // enviar formulario si no hay errores
      console.log('Formulario enviado')
      if (isValidForm) {
        isValidForm(true)
      }
    }
  }

  const getErrorMessage = (name: keyof BasicInfoErrors) => {
    return errors[name] ? 'This field is required' : ''
  }

  useEffect(() => {
    if (makeValidations) {
      validations()
      resetMakeValidations()
    }
  }, [makeValidations])

  return (
    <>
      <div className='title'>Basic info</div>
      <div className='form-wrapper'>
        <div className='form-col'>
          <div className='title'>Insured</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name='insured'
              label='insured'
              value={basicInfo.insured}
              onChange={handleInputChange}
              error={!!errors.insuredError}
              helperText={getErrorMessage('insuredError')}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.countryError}>
            <InputLabel>Country</InputLabel>

            <Select
              name='country'
              label='Country'
              value={basicInfo.country}
              onChange={handleSelectChange}
              labelId='invoice-country'
            >
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Russia'>Russia</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
            </Select>

            {errors.countryError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('countryError')}
              </FormHelperText>
            )}
          </FormControl>
        </div>

        <div className='form-col'>
          <div className='title'>Broker</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.brokerError}>
            <InputLabel>Select Broker</InputLabel>

            <Select
              name='broker'
              label='Select Broker'
              value={basicInfo.broker}
              onChange={handleSelectChange}
              labelId='broker'
            >
              {brokers?.map(broker => {
                return (
                  <MenuItem key={broker.id} value={broker.id}>
                    {broker.name}
                  </MenuItem>
                )
              })}
            </Select>
            {errors.brokerError && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                {getErrorMessage('countryError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Broker Contact</InputLabel>

            <Select
              name='brokerContact'
              label='Select Broker Contact'
              value={basicInfo.brokerContact}
              onChange={handleSelectChange}
              labelId='broker-contact'
            >
              {brokerContacts?.map(contact => {
                return (
                  <MenuItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className='form-col'>
          <div className='title'>Cedant</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.cedantError}>
            <InputLabel>Select Cedant</InputLabel>

            <Select
              name='cedant'
              label='Select Cedant'
              value={basicInfo.cedant}
              onChange={handleSelectChange}
              labelId='cedant'
            >
              {cedant?.map(cedant => {
                return (
                  <MenuItem key={cedant.id} value={cedant.id}>
                    {cedant.name}
                  </MenuItem>
                )
              })}
            </Select>

            {errors.cedantError && (
              <FormHelperText sx={{ color: 'error.main' }} id='select-cedant-error'>
                {getErrorMessage('cedantError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Cedant Contact</InputLabel>

            <Select
              name='cedantContact'
              label='Select Cedant Contact'
              value={basicInfo.cedantContact}
              onChange={handleSelectChange}
              labelId='cedant-contact'
            >
              {cedantContacts?.map(contact => {
                return (
                  <MenuItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className='form-col'>
          <div className='title'>Business</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.lineOfBusinessError}>
            <InputLabel>Line of business</InputLabel>

            <Select
              name='lineOfBusiness'
              label='Line of Business'
              value={basicInfo.lineOfBusiness}
              onChange={handleSelectChange}
              labelId='business'
            >
              <MenuItem value='lb1'>Lb 1</MenuItem>
              <MenuItem value='lb2'>Lb 2</MenuItem>
              <MenuItem value='lb3'>Lb 3</MenuItem>
            </Select>
            {errors.lineOfBusinessError && (
              <FormHelperText sx={{ color: 'error.main' }} id='business-error'>
                {getErrorMessage('lineOfBusinessError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name='industryCode'
              label='Industry Code'
              value={basicInfo.industryCode}
              disabled={bussinesFields}
              onChange={handleInputChange}
              error={!!errors.industryCodeError}
              helperText={getErrorMessage('industryCodeError')}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name='riskActivity'
              label='Risk activity'
              value={basicInfo.riskActivity}
              disabled={bussinesFields}
              onChange={handleInputChange}
              error={!!errors.riskActivityError}
              helperText={getErrorMessage('riskActivityError')}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name='riskClass'
              label='Risk class'
              value={basicInfo.riskClass}
              disabled={bussinesFields}
              onChange={handleInputChange}
              error={!!errors.riskClassError}
              helperText={getErrorMessage('riskClassError')}
            />
          </FormControl>
        </div>
        <div className='form-col'>
          <div className='title'>Dates</div>
          <DatePickerWrapper>
            <DatePicker
              selected={basicInfo.receptionDate}
              shouldCloseOnSelect
              id='reception-date'
              customInput={<CustomInput label='Reception date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleReceptionDateChange}
              className={errors.receptionDateError ? 'error' : ''}
            />
            {errors.receptionDateError && (
              <FormHelperText
                sx={{
                  color: 'error.main',
                  marginTop: '-5px',
                  marginBottom: '6px',
                  marginLeft: '10px'
                }}
                id='receptionDate-error'
              >
                {getErrorMessage('receptionDateError')}
              </FormHelperText>
            )}
            <DatePicker
              selected={basicInfo.effectiveDate}
              shouldCloseOnSelect
              id='effective-date'
              customInput={<CustomInput label='Effective date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleEffectiveDateChange}
              className={errors.effectiveDateError ? 'error' : ''}
            />
            {errors.effectiveDateError && (
              <FormHelperText
                sx={{
                  color: 'error.main',
                  marginTop: '-5px',
                  marginBottom: '5px',
                  marginLeft: '10px'
                }}
                id='effectiveDate-error'
              >
                {getErrorMessage('effectiveDateError')}
              </FormHelperText>
            )}
            <DatePicker
              selected={basicInfo.expirationDate}
              shouldCloseOnSelect
              id='expiration-date'
              customInput={<CustomInput label='Expiration date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleExpirationDateChange}
              className={errors.expirationDateError ? 'error' : ''}
            />
            {errors.expirationDateError && (
              <FormHelperText
                sx={{
                  color: 'error.main',
                  marginTop: '-5px',
                  marginBottom: '6px',
                  marginLeft: '10px'
                }}
                id='expirationDate-error'
              >
                {getErrorMessage('expirationDateError')}
              </FormHelperText>
            )}
          </DatePickerWrapper>
        </div>
        <div className='form-col'>
          <div className='title'>Underwriter team</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.underwriterError}>
            <InputLabel>Underwriter</InputLabel>

            <Select
              name='underwriter'
              label='Underwriter'
              value={basicInfo.underwriter}
              onChange={handleSelectChange}
              labelId='underwriter'
            >
              <MenuItem value='u1'>U1</MenuItem>
              <MenuItem value='u2'>U2</MenuItem>
              <MenuItem value='u3'>U3</MenuItem>
            </Select>
            {errors.underwriterError && (
              <FormHelperText sx={{ color: 'error.main' }} id='expirationDate-error'>
                {getErrorMessage('underwriterError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.leadUnderwriterError}>
            <InputLabel>Lead underwriter</InputLabel>

            <Select
              name='leadUnderwriter'
              label='Lead Underwriter'
              value={basicInfo.leadUnderwriter}
              onChange={handleSelectChange}
              labelId='lead-underwriter'
            >
              <MenuItem value='Lu1'>LU1</MenuItem>
              <MenuItem value='Lu2'>LU2</MenuItem>
              <MenuItem value='Lu3'>LU3</MenuItem>
            </Select>
            {errors.leadUnderwriterError && (
              <FormHelperText sx={{ color: 'error.main' }} id='expirationDate-error'>
                {getErrorMessage('leadUnderwriterError')}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.technicalAssistantError}>
            <InputLabel>Technical assistant</InputLabel>

            <Select
              name='technicalAssistant'
              label='Technical assistant'
              value={basicInfo.technicalAssistant}
              onChange={handleSelectChange}
              labelId='assistant'
            >
              <MenuItem value='assistant1'>Assistant 1</MenuItem>
              <MenuItem value='assistant2'>Assistant 2</MenuItem>
              <MenuItem value='assistant3'>Assistant 3</MenuItem>
            </Select>
            {errors.technicalAssistantError && (
              <FormHelperText sx={{ color: 'error.main' }} id='expirationDate-error'>
                {getErrorMessage('technicalAssistantError')}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
    </>
  )
}
export default BasicInfo
