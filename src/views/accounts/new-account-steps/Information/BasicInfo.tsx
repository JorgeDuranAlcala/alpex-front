/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ForwardedRef, ReactNode, forwardRef, useEffect, useState } from 'react' //ReactNode

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  SxProps,
  TextField,
  Theme
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select' //SelectChangeEvent

//Components
import { ContactModal } from '@/views/accounts/new-account-steps/Information/ContactModal'

//hooks para base info y  modal contac
import { useGetAllCountries as useCountyGetAll } from 'src/hooks/catalogs/country'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}

interface BasicInfoErrors {
  insuredError: boolean
  countryError: boolean
  brokerError: boolean
  cedantError: boolean
  lineOfBusinessError: boolean

  // underwriterError: boolean
  // leadUnderwriterError: boolean
  // technicalAssistantError: boolean
  industryCodeError: boolean
  riskActivityError: boolean
  riskClassError: boolean
  receptionDateError: boolean
  effectiveDateError: boolean
  expirationDateError: boolean
}
type BasicInputType = {
  insured: string
  country: number | string
  broker: number | string
  brokerContact: number | null | string
  brokerContactEmail: string
  brokerContactPhone: string
  brokerContactCountry: string
  cedant: number | string
  cedantContact: number | null | string
  cedantContactEmail: string
  cedantContactPhone: string
  cedantContactCountry: string
  lineOfBusiness: number | string
  underwriter: number | string | null
  leadUnderwriter: number | string | null
  technicalAssistant: number | string | null
  industryCode: number | string
  riskActivity: string
  riskClass: number
  receptionDate: Date | null
  effectiveDate: Date | null
  expirationDate: Date | null
}
type BasicInfoProps = {
  basicInfo: BasicInputType
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInputType>>
  makeValidations: boolean
  onValidationComplete: (valid: boolean) => void
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

import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import { ROLES } from '@/configs/api'
import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker'
import { useGetAllByIdBroker } from 'src/hooks/catalogs/broker-contact/'
import { useGetAll as useCedantGetAll } from 'src/hooks/catalogs/cedant'
import { useGetAllByCedant } from 'src/hooks/catalogs/cedant-contact'
import { useGetAllLineOfBussines } from 'src/hooks/catalogs/lineOfBussines'
import { useGetAllRiskActivities } from 'src/hooks/catalogs/riskActivity'
import { useGetByIdRole } from 'src/hooks/catalogs/users/'

const BasicInfo: React.FC<BasicInfoProps> = ({ basicInfo, setBasicInfo, makeValidations, onValidationComplete }) => {
  //cargamos la informacion de los catalogos de base de datos
  const { countries } = useCountyGetAll()
  const { brokers } = useBrokerGetAll()
  const { cedant } = useCedantGetAll()
  const [validateForm, setValidateForm] = useState<boolean>(true)
  const { brokerContacts, setIdBroker, findByIdBroker } = useGetAllByIdBroker()
  const { contacts: cedantContacts, setIdCedant, findByIdCedant } = useGetAllByCedant()
  const { riskActivities } = useGetAllRiskActivities()
  const { lineOfBussines } = useGetAllLineOfBussines()
  const { users: underwriters } = useGetByIdRole(ROLES.UNDERWRITER)
  const { users: leadUnderwriters } = useGetByIdRole(ROLES.LEAD_UNDERWRITER)
  const { users: technicalAssistants } = useGetByIdRole(ROLES.TECHNICAL_ASSISTANT)

  const [bussinesFields, setBussinesFields] = useState(true)

  // const [valid, setValid]= useState(false)
  const [errors, setErrors] = useState<BasicInfoErrors>({
    insuredError: false,
    countryError: false,
    brokerError: false,
    cedantError: false,
    lineOfBusinessError: false,
    // underwriterError: false,
    // leadUnderwriterError: false,
    // technicalAssistantError: false,
    receptionDateError: false,
    effectiveDateError: false,
    expirationDateError: false,
    industryCodeError: false,
    riskActivityError: false,
    riskClassError: false
  })

  const updateBrokerContact = async (id: number) => {
    await findByIdBroker(id)
  }

  const updateCedantContact = async (id: number) => {
    await findByIdCedant(id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBasicInfo({ ...basicInfo, [name]: value })

    !validateForm && validations({ ...basicInfo, [name]: value })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>, child?: ReactNode) => {
    const target = event.target
    const name = target.name
    const value = target.value

    let basicInfoTem = { ...basicInfo }

    if (name == 'lineOfBusiness') {
      setBussinesFields(false)
    }

    if (name === 'broker') {
      //reset del  valor del contact
      basicInfoTem.brokerContact = ''
      setIdBroker(Number(value))
    }

    if (name === 'cedant') {
      //reset del  valor del contact
      basicInfoTem.cedantContact = ''
      setIdCedant(Number(value))
    }

    if (name === 'industryCode') {
      const riskActivity = riskActivities.find(r => r.id === Number(value))
      if (riskActivity) {
        basicInfoTem.riskActivity = riskActivity.riskActivity
        basicInfoTem.riskClass = riskActivity.class
      }
    }

    basicInfoTem = {
      ...basicInfoTem,
      [name]: value
    }
    !validateForm && validations(basicInfoTem)
    setBasicInfo(basicInfoTem)
  }

  const handleReceptionDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, receptionDate: date })
    !validateForm && validations({ ...basicInfo, receptionDate: date })
  }

  const handleEffectiveDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, effectiveDate: date })
    !validateForm && validations({ ...basicInfo, effectiveDate: date })
  }

  const handleExpirationDateChange = (date: Date | null) => {
    setBasicInfo({ ...basicInfo, expirationDate: date })
    !validateForm && validations({ ...basicInfo, expirationDate: date })
  }

  const validations = (basicInfoParama: BasicInputType | null = null) => {
    const basicInfoTemp = basicInfoParama ? basicInfoParama : basicInfo
    const newErrors: BasicInfoErrors = {
      insuredError: basicInfoTemp.insured === '',
      countryError: basicInfoTemp.country === '',
      brokerError: basicInfoTemp.broker === '',
      cedantError: basicInfoTemp.cedant === '',
      lineOfBusinessError: basicInfoTemp.lineOfBusiness === '',
      // underwriterError: basicInfoTemp.underwriter === '',
      // leadUnderwriterError: basicInfoTemp.leadUnderwriter === '',
      // technicalAssistantError: basicInfoTemp.technicalAssistant === '',
      industryCodeError: basicInfoTemp.industryCode === '',
      riskActivityError: basicInfoTemp.riskActivity === '',
      riskClassError: basicInfoTemp.riskClass === 0,
      receptionDateError: basicInfoTemp.receptionDate === null,
      effectiveDateError: basicInfoTemp.effectiveDate === null,
      expirationDateError: basicInfoTemp.expirationDate === null
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      onValidationComplete(true)
      setValidateForm(true)
    } else {
      onValidationComplete(false)
      setValidateForm(false)
    }
  }

  const getErrorMessage = (name: keyof BasicInfoErrors) => {
    return errors[name] ? 'This field is required' : ''
  }

  useEffect(() => {
    setIdBroker(Number(basicInfo.broker))
  }, [basicInfo.broker, brokers])

  useEffect(() => {
    setIdCedant(Number(basicInfo.cedant))
  }, [basicInfo.cedant, cedant])

  useEffect(() => {
    //get broker contact info
    const idBrokerContact = basicInfo.brokerContact ? parseInt(basicInfo.brokerContact.toString()) : 0
    const brokerContactInfo = brokerContacts.find(brokerContact => brokerContact.id === idBrokerContact)
    setBasicInfo(prevBasicInfo => ({
      ...prevBasicInfo,
      brokerContactEmail: brokerContactInfo?.email || 'test',
      brokerContactPhone: brokerContactInfo?.phone || '123123',
      brokerContactCountry: brokerContactInfo?.idCCountry.toString() || '1'
    }))
  }, [basicInfo.brokerContact, brokerContacts])

  useEffect(() => {
    setTimeout(() => {
      //get cedant contact info
      const idCedantContact = basicInfo.cedantContact ? parseInt(basicInfo.cedantContact.toString()) : 0
      const cedantContactInfo = cedantContacts.find(cedantContact => cedantContact.id === idCedantContact)
      setBasicInfo(prevBasicInfo => ({
        ...prevBasicInfo,
        cedantContactEmail: cedantContactInfo?.email || '',
        cedantContactPhone: cedantContactInfo?.phone || '',
        cedantContactCountry: cedantContactInfo?.idCCountry.toString() || ''
      }))
    }, 0)
  }, [basicInfo.cedantContact, cedantContacts])

  useEffect(() => {
    let riskActivity = {
      riskActivity: '',
      riskClass: 0
    }

    const industryCode = riskActivities.find(r => r.id === Number(basicInfo.industryCode))

    if (industryCode) {
      riskActivity.riskActivity = industryCode.riskActivity
      riskActivity.riskClass = industryCode.class
    }

    setBasicInfo(state => ({
      ...state,
      riskActivity: riskActivity.riskActivity,
      riskClass: riskActivity.riskClass
    }))
  }, [basicInfo.industryCode, riskActivities])

  useEffect(() => {
    if (makeValidations) {
      validations()
      setValidateForm(false)
    }
  }, [makeValidations])

  React.useEffect(() => {
    console.log('basic info cambio')
    console.log(basicInfo)
  }, [basicInfo])

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
              label='Insured'
              defaultValue=''
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
              defaultValue={''}
              value={String(basicInfo.country)}
              onChange={handleSelectChange}
              labelId='invoice-country'
            >
              {countries.length > 0 ? (
                countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
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
              value={String(basicInfo.broker)}
              onChange={handleSelectChange}
              labelId='broker'
            >
              {brokers.length > 0 ? (
                brokers.map(broker => {
                  return (
                    <MenuItem key={broker.id} value={broker.id}>
                      {broker.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
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
              value={String(basicInfo.brokerContact)}
              disabled={basicInfo.broker !== '' ? false : true}
              defaultValue=''
              onChange={handleSelectChange}
              labelId='broker-contact'
            >
              {brokerContacts.length > 0 ? (
                brokerContacts.map(contact => {
                  return (
                    <MenuItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {basicInfo.brokerContact !== '' && (
            <>
              <FormControl fullWidth sx={{ marginBottom: '0.7rem', mt: 2 }}>
                <TextField autoFocus disabled fullWidth label='Contact email' value={basicInfo.brokerContactEmail} />
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: '0.7rem', mt: 2 }}>
                <TextField autoFocus fullWidth disabled label='Contact phone' value={basicInfo.brokerContactPhone} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <InputLabel>Contact country'</InputLabel>
                <Select
                  label='Contact country'
                  value={basicInfo.brokerContactCountry}
                  labelId='Contactcountry'
                  disabled
                >
                  {countries?.map(country => (
                    <MenuItem key={country.name} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <ContactModal
            service={'broker'}
            disabledBtn={basicInfo.broker !== '' ? false : true}
            id={Number(basicInfo.broker)}
            updateContacts={updateBrokerContact}
            setIdCreated={setBasicInfo}
          />
        </div>
        <div className='form-col'>
          <div className='title'>Cedant</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.cedantError}>
            <InputLabel>Select Cedant</InputLabel>

            <Select
              name='cedant'
              label='Select Cedant'
              value={String(basicInfo.cedant)}
              onChange={handleSelectChange}
              labelId='cedant'
            >
              {cedant.length > 0 ? (
                cedant.map(cedant => {
                  return (
                    <MenuItem key={cedant.id} value={cedant.id}>
                      {cedant.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
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
              value={`${basicInfo.cedantContact == 0 ? '' : basicInfo.cedantContact}`}
              disabled={basicInfo.cedant !== '' ? false : true}
              onChange={handleSelectChange}
              defaultValue=''
              labelId='cedant-contact'
            >
              {cedantContacts.length > 0 ? (
                cedantContacts.map(contact => {
                  return (
                    <MenuItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {basicInfo.cedantContact !== '' && (
            <>
              <FormControl fullWidth sx={{ marginBottom: '0.7rem', mt: 2 }}>
                <TextField autoFocus disabled fullWidth label='Contact email' value={basicInfo.cedantContactEmail} />
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: '0.7rem', mt: 2 }}>
                <TextField autoFocus fullWidth disabled label='Contact phone' value={basicInfo.cedantContactPhone} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <InputLabel>Contact country'</InputLabel>
                <Select
                  label='Contact country'
                  value={basicInfo.cedantContactCountry}
                  labelId='Contactcountry'
                  disabled
                >
                  {countries?.map(country => (
                    <MenuItem key={country.name} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <ContactModal
            service={'cedant'}
            disabledBtn={basicInfo.cedant !== '' ? false : true}
            id={Number(basicInfo.cedant)}
            updateContacts={updateCedantContact}
            setIdCreated={setBasicInfo}
          />
        </div>
        <div className='form-col'>
          <div className='title'>Business</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.lineOfBusinessError}>
            <InputLabel>Line of business</InputLabel>

            <Select
              name='lineOfBusiness'
              label='Line of Business'
              value={String(basicInfo.lineOfBusiness)}
              onChange={handleSelectChange}
              labelId='business'
            >
              {lineOfBussines.length > 0 ? (
                lineOfBussines.map(lineOfBussine => {
                  return (
                    <MenuItem key={lineOfBussine.id} value={lineOfBussine.id}>
                      {lineOfBussine.lineOfBussines}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
            {errors.lineOfBusinessError && (
              <FormHelperText sx={{ color: 'error.main' }} id='industryCode-error'>
                {getErrorMessage('industryCodeError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Industry code</InputLabel>
            <Select
              name='industryCode'
              label='Industry Code'
              value={String(basicInfo.industryCode)}
              onChange={handleSelectChange}
              labelId='industryCode'
            >
              {riskActivities.length > 0 ? (
                riskActivities.map(riskActivities => {
                  return (
                    <MenuItem key={riskActivities.id} value={riskActivities.id}>
                      {riskActivities.industryCode} / {riskActivities.riskActivity}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
            {errors.industryCodeError && (
              <FormHelperText sx={{ color: 'error.main' }} id='business-error'>
                {getErrorMessage('lineOfBusinessError')}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name='riskActivity'
              label='Risk activity'
              value={basicInfo.riskActivity}
              disabled={true}
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
              disabled={true}
              onChange={handleInputChange}
              error={!!errors.riskClassError}
              helperText={getErrorMessage('riskClassError')}
            />
          </FormControl>
        </div>
        <div className='form-col'>
          <div className='title'>Dates</div>
          <Grid item xs={12} sm={12} sx={{ width: '100%' }}>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                selected={basicInfo.receptionDate}
                shouldCloseOnSelect
                id='reception-date'
                customInput={<CustomInput label='Reception date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
                onChange={handleReceptionDateChange}
                className={errors.receptionDateError ? 'error' : ''}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
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
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
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
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
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
          </Grid>
        </div>
        <div className='form-col'>
          <div className='title'>Underwriting team</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Underwriter</InputLabel>

            <Select
              name='underwriter'
              label='Underwriter'
              value={String(basicInfo.underwriter)}
              onChange={handleSelectChange}
              labelId='underwriter'
            >
              {underwriters.length > 0 ? (
                underwriters.map(underwriter => {
                  return (
                    <MenuItem key={underwriter.id} value={underwriter.id}>
                      {`${underwriter.name} ${underwriter.surname} ${underwriter.secondSurname}`}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Lead underwriter</InputLabel>

            <Select
              name='leadUnderwriter'
              label='Lead Underwriter'
              value={String(basicInfo.leadUnderwriter)}
              onChange={handleSelectChange}
              labelId='lead-underwriter'
            >
              {leadUnderwriters.length > 0 ? (
                leadUnderwriters.map(leadUnderwriter => {
                  return (
                    <MenuItem key={leadUnderwriter.id} value={leadUnderwriter.id}>
                      {`${leadUnderwriter.name} ${leadUnderwriter.surname} ${leadUnderwriter.secondSurname}`}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Technical assistant</InputLabel>

            <Select
              name='technicalAssistant'
              label='Technical assistant'
              value={String(basicInfo.technicalAssistant)}
              onChange={handleSelectChange}
              labelId='assistant'
            >
              {technicalAssistants.length > 0 ? (
                technicalAssistants.map(technicalAssistant => {
                  return (
                    <MenuItem key={technicalAssistant.id} value={technicalAssistant.id}>
                      {`${technicalAssistant.name} ${technicalAssistant.surname} ${technicalAssistant.secondSurname}`}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}
export default BasicInfo
