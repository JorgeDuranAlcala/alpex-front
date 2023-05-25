import { forwardRef, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'

// ** MUI Imports
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import SwitchAlpex from 'src/views/custom/switchs'

//Hooks
import { useAppSelector } from '@/store'
import { useGetAllCountries } from 'src/hooks/catalogs/country'
import { useGetAllByIdRetroCedant } from 'src/hooks/catalogs/retroCedantContact'

interface FormInfo extends BrokerFormInfo {
  [key: string]: string | boolean | undefined
  id?: string
  NetPremium: string
  SharePercent: string
  DynamicComissionPercent: string
  FrontingFee: string
  ReinsuranceCompany: string
  PremiumPerShare: string
  DynamicComission: string
  FrontingFeePercent: string
  NetInsurancePremium: string
  RetroCedant: string
  RetroCedantContact: string
  ContactEmail: string
  ContactPhone: string
  ContactCountry: string
  HasFrontingFee: boolean
  IsGross: boolean
}

interface BrokerFormInfo {
  BrokerAge: string
  Taxes: string
  BrokerAgePercent: string
  TaxesPercent: string
}

type TypeFormInfo =
  | 'BrokerAge'
  | 'Taxes'
  | 'BrokerAgePercent'
  | 'TaxesPercent'
  | 'NetPremium'
  | 'SharePercent'
  | 'DynamicComissionPercent'
  | 'FrontingFee'
  | 'ReinsuranceCompany'
  | 'PremiumPerShare'
  | 'DynamicComission'
  | 'FrontingFeePercent'
  | 'NetInsurancePremium'
  | 'RetroCedant'
  | 'RetroCedantContact'
  | 'ContactEmail'
  | 'ContactPhone'
  | 'ContactCountry'
  | 'HasFrontingFee'
  | 'IsGross'

// const SecurityForm: FormInfo = {
//   NetPremium: '',
//   SharePercent: '',
//   DynamicComissionPercent: '',
//   FrontingFee: '',
//   ReinsuranceCompany: '',
//   PremiumPerShare: '',
//   DynamicComission: '',
//   FrontingFeePercent: '',
//   NetInsurancePremium: '',
//   RetroCedant: '',
//   RetroCedantContact: '',
//   ContactEmail: 'mail@example.com',
//   ContactPhone: '55618475268',
//   ContactCountry: 'Mexico',
//   BrokerAge: '',
//   Taxes: '',
//   BrokerAgePercent: '',
//   TaxesPercent: '',
//   HasFrontingFee: false,
//   IsGross: false,
//   id: ''
// }

yup.setLocale({
  mixed: {
    required: 'This field is required',
    notType: 'This field must be a number'
  },
  number: {
    min: 'This field must be greater than ${min}',
    max: 'This field must be less than ${max}'
  }
})

interface FormSectionProps {
  index: number
  security: FormInfo
  onChangeItemList: (index: number, data: FormInfo) => void
  formErrors: FormInfo[]
  setFormErrors: (data: FormInfo[]) => void
  securities: FormInfo[]
}

interface FormInformation {
  frontingFee: number
  netPremium: number
  grossPremium: number
}
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  prefix: string
  suffix: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, prefix, suffix, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ? prefix : suffix ? '' : '$'}
      suffix={suffix ? suffix : ''}
    />
  )
})

export const FormSection = ({
  index,
  security,
  onChangeItemList,
  formErrors,
  setFormErrors,
  securities
}: FormSectionProps) => {
  const [localSecurity, setLocalSecurity] = useState<FormInfo>(security)
  const switchAlpex = useRef(null)
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)
  const [companiesSelect, setCompaniesSelect] = useState<any[]>([])
  const [avaliableReinsurers, setAvaliableReinsurers] = useState<typeof companiesSelect>(companiesSelect)
  const [isGross, setIsGross] = useState<boolean>(true)
  const [labelNetPremium, setLabelNetPremium] = useState<string>('Net premium at %100')
  const [formInformation, setFormInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: +localSecurity.NetPremium,
    grossPremium: 0
  })

  const { retroCedants } = useGetAllRetroCedants()
  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { countries } = useGetAllCountries()
  const accountData = useAppSelector(state => state.accounts)

  const handleSwitch = () => {
    setFrontingFeeEnabled(state => !state)
    handleUpdateInput('HasFrontingFee', !frontingFeeEnabled)
  }

  const calculateAvaliableReinsurers = () => {
    const data = [...companiesSelect]
    securities.map((form, ind) => {
      data.forEach((reinsurer, ind3) => {
        if (+form.ReinsuranceCompany === reinsurer.id && index !== ind) {
          data.splice(ind3, 1)
        }
      })
    })
    setAvaliableReinsurers(data)
  }

  const handleIsGross = () => {
    setLabelNetPremium('Gross premium at %100')
    frontingFeeEnabled && handleSwitch()
  }

  const handleIsNet = () => {
    setLabelNetPremium('Net premium at %100')
    if (+formInformation.frontingFee <= 0) {
      !frontingFeeEnabled && handleSwitch()
    } else {
      frontingFeeEnabled && handleSwitch()
    }
  }

  const validateNumber = (value: string, allowZero = false) => {
    const result =
      isNaN(+value) || +value <= 0 ? (allowZero ? Math.round(+value * 100) / 100 : '') : Math.round(+value * 100) / 100

    return result.toString()
  }

  const handleUpdateInput = (name: TypeFormInfo, value: any) => {
    setLocalSecurity({
      ...localSecurity,
      [name]: value
    })

    onChangeItemList(index, { ...localSecurity, [name]: value })
    const errors = [...formErrors]
    errors[index][name.toString()] = ''
    setFormErrors(errors)
  }

  const calculates = (calcule: TypeFormInfo, value?: any) => {
    const tempSecurity = {
      ...localSecurity,
      [calcule]: value
    }

    const totalNetPremium = tempSecurity.NetPremium
    const premiumPerShare = tempSecurity.PremiumPerShare
    const dynamicComission = tempSecurity.DynamicComission
    const sharePercent = tempSecurity.SharePercent
    const dynamicComissionPercent = tempSecurity.DynamicComissionPercent
    const BrokerAge = tempSecurity.BrokerAge
    const Taxes = tempSecurity.Taxes
    const BrokerAgePercent = tempSecurity.BrokerAgePercent
    const TaxesPercent = tempSecurity.TaxesPercent
    const FrontingFee = tempSecurity.FrontingFee
    const FrontingFeePercent = tempSecurity.FrontingFeePercent
    let NetInsurancePremium = ''

    const calculateNetInsurancePremium = () => {
      if (isGross) {
        NetInsurancePremium = validateNumber(
          (
            +tempSecurity.PremiumPerShare -
            +tempSecurity.DynamicComission -
            +tempSecurity.Taxes -
            +tempSecurity.BrokerAge -
            +tempSecurity.FrontingFee
          ).toString(),
          true
        )
      } else {
        NetInsurancePremium = validateNumber(
          (+tempSecurity.PremiumPerShare - +tempSecurity.DynamicComission - +tempSecurity.FrontingFee).toString(),
          true
        )
      }
      const dataError = [...formErrors]

      if (+NetInsurancePremium < 0)
        dataError[index]['NetInsurancePremium'] = 'ERROR: The number must be greater than 0!'
      else dataError[index]['NetInsurancePremium'] = ''
      setFormErrors(dataError)
      setFormErrors(formErrors)

      tempSecurity.NetInsurancePremium = NetInsurancePremium
    }

    switch (calcule) {
      case 'NetPremium': {
        //TODO:refactor this
        const result = validateNumber(((+sharePercent * +totalNetPremium) / 100).toString())
        const resultTaxes = isGross ? validateNumber(((+TaxesPercent * +result) / 100).toString()) : ''
        const resultBroger = isGross ? validateNumber(((+BrokerAgePercent * +result) / 100).toString()) : ''
        const resultFrontingFee = validateNumber(((+FrontingFeePercent * +result) / 100).toString())
        const resultDynamicComission = validateNumber(((+dynamicComissionPercent * +result) / 100).toString())

        tempSecurity.PremiumPerShare = result
        tempSecurity.Taxes = resultTaxes
        tempSecurity.BrokerAge = resultBroger
        tempSecurity.FrontingFee = resultFrontingFee
        tempSecurity.DynamicComission = resultDynamicComission
        tempSecurity.PremiumPerShare = result
        break
      }
      case 'SharePercent': {
        const result = validateNumber(((+sharePercent * +totalNetPremium) / 100).toString())
        const resultTaxes = isGross ? validateNumber(((+TaxesPercent * +result) / 100).toString()) : ''
        const resultBroger = isGross ? validateNumber(((+BrokerAgePercent * +result) / 100).toString()) : ''
        const resultFrontingFee = validateNumber(((+FrontingFeePercent * +result) / 100).toString())
        const resultDynamicComission = validateNumber(((+dynamicComissionPercent * +result) / 100).toString())

        tempSecurity.Taxes = resultTaxes
        tempSecurity.BrokerAge = resultBroger
        tempSecurity.FrontingFee = resultFrontingFee
        tempSecurity.DynamicComission = resultDynamicComission
        tempSecurity.PremiumPerShare = result
        break
      }

      case 'PremiumPerShare': {
        const resultShare = validateNumber(((+premiumPerShare / +totalNetPremium) * 100).toString())
        const resultTaxes = isGross ? validateNumber(((+TaxesPercent * +premiumPerShare) / 100).toString()) : ''
        const resultBroger = isGross ? validateNumber(((+BrokerAgePercent * +premiumPerShare) / 100).toString()) : ''
        const resultFrontingFee = validateNumber(((+FrontingFeePercent * +premiumPerShare) / 100).toString())
        const resultDynamicComission = validateNumber(((+dynamicComissionPercent * +premiumPerShare) / 100).toString())
        tempSecurity.SharePercent = resultShare
        tempSecurity.Taxes = resultTaxes
        tempSecurity.BrokerAge = resultBroger
        tempSecurity.FrontingFee = resultFrontingFee
        tempSecurity.DynamicComission = resultDynamicComission

        break
      }

      case 'DynamicComission': {
        const result = validateNumber(((+dynamicComission / +premiumPerShare) * 100).toString())
        tempSecurity.DynamicComissionPercent = result
        break
      }

      case 'DynamicComissionPercent': {
        const result = validateNumber(((+dynamicComissionPercent * +premiumPerShare) / 100).toString())
        tempSecurity.DynamicComission = result
        break
      }

      case 'Taxes': {
        const result = validateNumber(((+Taxes / +premiumPerShare) * 100).toString())
        tempSecurity.TaxesPercent = result
        break
      }

      case 'TaxesPercent': {
        const result = validateNumber(((+TaxesPercent * +premiumPerShare) / 100).toString())
        tempSecurity.Taxes = result
        break
      }

      case 'BrokerAge': {
        const result = validateNumber(((+BrokerAge / +premiumPerShare) * 100).toString())
        tempSecurity.BrokerAgePercent = result
        break
      }

      case 'BrokerAgePercent': {
        const result = validateNumber(((+BrokerAgePercent * +premiumPerShare) / 100).toString())
        tempSecurity.BrokerAge = result
        break
      }

      case 'FrontingFee': {
        const result = validateNumber(((+FrontingFee / +premiumPerShare) * 100).toString())
        tempSecurity.FrontingFeePercent = result
        break
      }

      case 'FrontingFeePercent': {
        const result = validateNumber(((+FrontingFeePercent * +premiumPerShare) / 100).toString())

        tempSecurity.FrontingFee = result
        break
      }
      case 'ReinsuranceCompany': {
        if (isGross) {
          tempSecurity.TaxesPercent = ''
          tempSecurity.BrokerAgePercent = ''
          tempSecurity.FrontingFeePercent = ''
          tempSecurity.Taxes = ''
          tempSecurity.BrokerAge = ''
          tempSecurity.FrontingFee = ''
          tempSecurity.RetroCedant = ''
          tempSecurity.ContactCountry = ''
          tempSecurity.ContactEmail = ''
          tempSecurity.ContactPhone = ''
        }
      }
    }

    if (!frontingFeeEnabled) {
      tempSecurity.FrontingFeePercent = '0'
      tempSecurity.FrontingFee = '0'
    }

    calculateNetInsurancePremium()

    onChangeItemList(index, { ...tempSecurity })
    setLocalSecurity({ ...tempSecurity })
    const errors = [...formErrors]
    errors[index][calcule.toString()] = ''
    setFormErrors(errors)
  }

  useEffect(() => {
    const company = companiesSelect.find(company => company.id === +localSecurity.ReinsuranceCompany)

    if (company) {
      setIsGross(true)
      setIsGross(company.isGross)
      const newNetPremium = company.isGross
        ? formInformation.grossPremium.toString()
        : formInformation.netPremium.toString()
      calculates('NetPremium', newNetPremium)
    } else {
      setIsGross(false)
      const newNetPremium = formInformation.netPremium.toString()
      calculates('NetPremium', newNetPremium)
    }

    if (company?.isGross) {
      handleIsGross()
    } else handleIsNet()

    //eslint-disable-next-line
  }, [localSecurity.ReinsuranceCompany])

  useEffect(() => {
    calculateAvaliableReinsurers()
    //eslint-disable-next-line
  }, [companiesSelect])

  useEffect(() => {
    const data = accountData.formsData.form1.placementStructure as FormInformation
    setFormInformation(data)
    localSecurity.NetPremium = '' + formInformation.netPremium
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.formsData.form1])

  useEffect(() => {
    const companies = reinsuranceCompany?.map(company => {
      return {
        id: company.id,
        name: company.name,
        isGross: company.special,
        active: true
      }
    })
    setCompaniesSelect(companies || [])
  }, [reinsuranceCompany])

  useEffect(() => {
    setIdRetroCedant(Number(localSecurity.RetroCedant))

    localSecurity.RetroCedantContact = ''
    localSecurity.ContactEmail = ''
    localSecurity.ContactPhone = ''
    localSecurity.ContactCountry = ''
    // eslint-disable-next-line
  }, [localSecurity.RetroCedant, retroCedants])

  useEffect(() => {
    const id = Number(localSecurity.RetroCedantContact)
    console.log(localSecurity.RetroCedantContact)

    const retroCedant = retroCedantContacts.find(contact => (contact.id = id))
    if (retroCedant) {
      localSecurity.RetroCedantContact = String(retroCedant.id)
      localSecurity.ContactEmail = retroCedant.email
      localSecurity.ContactPhone = retroCedant.phone
      localSecurity.ContactCountry = String(retroCedant.idCCountry)
    } else {
      localSecurity.RetroCedantContact = ''
      localSecurity.ContactEmail = ''
      localSecurity.ContactPhone = ''
      localSecurity.ContactCountry = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSecurity.RetroCedantContact])

  useEffect(() => {
    const securityTem = { ...security }
    setLocalSecurity(securityTem)

    setIsGross(localSecurity.IsGross)
    setFrontingFeeEnabled(localSecurity.HasFrontingFee)
    calculates('NetPremium', security.NetPremium)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log({ localSecurity, security })
  }, [])

  useEffect(() => {
    onChangeItemList(index, {
      ...localSecurity
    })
  }, [localSecurity])

  useEffect(() => {
    setLocalSecurity({
      ...security
    })
    calculates('NetPremium', security.NetPremium)
  }, [security.id])

  return (
    <>
      {(formInformation.frontingFee <= 0 || isGross) && (
        <>
          <span className='switch-text'>Fronting fee </span>
          <SwitchAlpex innerRef={switchAlpex} checked={frontingFeeEnabled} onClick={handleSwitch} />
        </>
      )}
      <div className='form-wrapper space-top'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label={labelNetPremium}
              value={localSecurity.NetPremium}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              defaultValue={formInformation.netPremium.toString()}
              onChange={e => calculates('NetPremium', e.target.value)}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.NetPremium}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={localSecurity.SharePercent}
              onChange={e => {
                calculates('SharePercent', e.target.value)
              }}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                suffix: '%'
              }}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.SharePercent}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage %'
                value={localSecurity.BrokerAgePercent}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                onChange={e => calculates('BrokerAgePercent', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.BrokerAgePercent}</FormHelperText>
            </FormControl>
          )}

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={localSecurity.DynamicComissionPercent}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                suffix: '%'
              }}
              onChange={e => calculates('DynamicComissionPercent', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.DynamicComissionPercent}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Taxes %'
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                value={localSecurity.TaxesPercent}
                onChange={e => calculates('TaxesPercent', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.TaxesPercent}</FormHelperText>
            </FormControl>
          )}

          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={localSecurity.FrontingFeePercent}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                onChange={e => calculates('FrontingFeePercent', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.FrontingFeePercent}</FormHelperText>
            </FormControl>
          )}
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Reinsurance companies</InputLabel>

            <Select
              value={localSecurity.ReinsuranceCompany}
              onChange={e => calculates('ReinsuranceCompany', e.target.value)}
              labelId='broker'
            >
              {avaliableReinsurers.map(reinsurer => (
                <MenuItem key={reinsurer.id} value={reinsurer.id}>
                  {reinsurer.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.ReinsuranceCompany}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Premium per share'
              value={localSecurity.PremiumPerShare}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={e => calculates('PremiumPerShare', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.PremiumPerShare}</FormHelperText>
          </FormControl>

          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage'
                value={localSecurity.BrokerAge}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => calculates('BrokerAge', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.BrokerAge}</FormHelperText>
            </FormControl>
          )}

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={localSecurity.DynamicComission}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={e => calculates('DynamicComission', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.DynamicComission}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Taxes'
                value={localSecurity.Taxes}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => calculates('Taxes', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.Taxes}</FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={localSecurity.FrontingFee}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => calculates('FrontingFee', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.FrontingFee}</FormHelperText>
            </FormControl>
          )}
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={localSecurity.NetInsurancePremium}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              disabled={true}
              onChange={e => calculates('NetInsurancePremium', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.NetInsurancePremium}</FormHelperText>
          </FormControl>
          {frontingFeeEnabled && (localSecurity.SharePercent !== '' || localSecurity.PremiumPerShare !== '') && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select Retro cedant</InputLabel>

              <Select
                label='Select Retro cedant'
                value={localSecurity.RetroCedant}
                onChange={e => {
                  handleUpdateInput('RetroCedant', e.target.value)
                }}
                labelId='Retrocedant'
              >
                {retroCedants?.map(cedant => (
                  <MenuItem key={cedant.name} value={cedant.id}>
                    {cedant.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.RetroCedant}</FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (localSecurity.SharePercent !== '' || localSecurity.PremiumPerShare !== '') && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select Retro Cedant contact</InputLabel>
              <Select
                label='Select Retro Cedant contact '
                value={localSecurity.RetroCedantContact}
                onChange={e => handleUpdateInput('RetroCedantContact', e.target.value)}
                labelId='RetroCedantcontact'
                disabled={localSecurity.RetroCedant === ''}
              >
                {retroCedantContacts?.map(contact => (
                  <MenuItem key={contact.name} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.RetroCedantContact}</FormHelperText>
            </FormControl>
          )}
          {localSecurity.RetroCedantContact !== '' && frontingFeeEnabled && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  disabled
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={localSecurity.ContactEmail}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  disabled
                  size='small'
                  label='Contact phone'
                  value={localSecurity.ContactPhone}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <InputLabel>Contact country'</InputLabel>
                <Select label='Contact country' value={localSecurity.ContactCountry} labelId='Contactcountry' disabled>
                  {countries?.map(country => (
                    <MenuItem key={country.name} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </div>
      </div>
    </>
  )
}
