import { forwardRef, useEffect, useRef, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import * as yup from 'yup'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import { useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSecurities } from '@/hooks/accounts/security'
import { useAddSecurityTotal } from '@/hooks/accounts/securityTotal'
import { useGetAllByCedant } from '@/hooks/catalogs/cedant-contact'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { updateFormsData } from '@/store/apps/accounts'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import SwitchAlpex from 'src/views/custom/switchs'

interface FormInfo extends BrokerFormInfo {
  [key: string]: string | boolean | undefined
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

interface PreviousFormInfo {
  RecievedNetPremium: string
  DistribuitedNetPremium: string
  Diference: string
}

interface BrokerFormInfo {
  BrokerAge: string
  Taxes: string
  BrokerAgePercent: string
  TaxesPercent: string
}

const SecurityForm: FormInfo = {
  NetPremium: '',
  SharePercent: '',
  DynamicComissionPercent: '',
  FrontingFee: '',
  ReinsuranceCompany: '',
  PremiumPerShare: '',
  DynamicComission: '',
  FrontingFeePercent: '',
  NetInsurancePremium: '',
  RetroCedant: '',
  RetroCedantContact: '',
  ContactEmail: 'mail@example.com',
  ContactPhone: '55618475268',
  ContactCountry: 'Mexico',
  BrokerAge: '',
  Taxes: '',
  BrokerAgePercent: '',
  TaxesPercent: '',
  HasFrontingFee: false,
  IsGross: false
}

interface FormSecurity extends PreviousFormInfo {
  FormData: FormInfo[]
}

type SecurityProps = {
  onStepChange?: (step: number) => void
}
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

const schemaNetPremium = yup.object().shape(
  {
    HasFrontingFee: yup.boolean(),
    IsGross: yup.boolean(),
    NetPremium: yup
      .number()
      .optional()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    SharePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComissionPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    FrontingFee: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .when('HasFrontingFee', {
        is: true,
        then: yup.number().required()
      }),
    ReinsuranceCompany: yup
      .string()
      .test('is-valid', 'This field is required', value => value !== '-1')
      .required(),
    PremiumPerShare: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComission: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    FrontingFeePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .when('HasFrontingFee', {
        is: true,
        then: yup
          .number()
          .transform(value => (isNaN(value) ? undefined : value))
          .required('This field is required')
      }),
    NetInsurancePremium: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required()
      .test('Is positive?', 'ERROR: The number must be greater than 0!', value => {
        const valueVal = value || 0

        return +valueVal > 0
      })
  },
  [['IsGross', 'frontingFeeEnabled']]
)

const schema = yup.object().shape(
  {
    HasFrontingFee: yup.boolean(),
    IsGross: yup.boolean(),
    NetPremium: yup
      .number()
      .optional()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    SharePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComissionPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    FrontingFee: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .when('HasFrontingFee', {
        is: true,
        then: yup.number().required()
      }),
    ReinsuranceCompany: yup
      .string()
      .test('is-valid', 'This field is required', value => value !== '-1')
      .required(),
    PremiumPerShare: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComission: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    FrontingFeePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .when('HasFrontingFee', {
        is: true,
        then: yup
          .number()
          .transform(value => (isNaN(value) ? undefined : value))
          .required('This field is required')
      }),
    NetInsurancePremium: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required()
      .test('Is positive?', 'ERROR: The number must be greater than 0!', value => {
        const valueVal = value || 0

        return +valueVal > 0
      }),
    RetroCedant: yup.string().when('HasFrontingFee', {
      is: true,
      then: yup.string().required()
    }),
    RetroCedantContact: yup.string().when('HasFrontingFee', {
      is: true,
      then: yup.string().notRequired()
    }),
    BrokerAge: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    Taxes: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    BrokerAgePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    TaxesPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      })
  },
  [['IsGross', 'frontingFeeEnabled']]
)

interface FormSectionProps {
  index: number
  formData: FormInfo[]
  setFormData: (data: FormInfo[]) => void
  formErrors: FormInfo[]
  setFormErrors: (data: FormInfo[]) => void
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
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, prefix, ...other } = props

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
      prefix={prefix ? prefix : '$'}
    />
  )
})

const FormSection = ({ index, formData, setFormData, formErrors, setFormErrors }: FormSectionProps) => {
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)
  const [companiesSelect, setCompaniesSelect] = useState<any[]>([])
  const [avaliableReinsurers, setAvaliableReinsurers] = useState<typeof companiesSelect>(companiesSelect)
  const [isGross, setIsGross] = useState<boolean>(false)
  const [labelNetPremium, setLabelNetPremium] = useState<string>('Net premium at %100')
  const [formInformation, setFormInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })

  const { retroCedants } = useGetAllRetroCedants()
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { setIdCedant, contacts } = useGetAllByCedant()

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

  const accountData = useAppSelector(state => state.accounts)
  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    const data = [...formData]
    data[index][field] = value
    setFormData(data)
    const errors = [...formErrors]
    errors[index][field] = ''
    setFormErrors(errors)
  }
  const handleSwitch = () => {
    const data = [...formData]
    data[index]['HasFrontingFee'] = !frontingFeeEnabled
    setFormData(data)
    setFrontingFeeEnabled(!frontingFeeEnabled)
  }

  const calculateAvaliableReinsurers = () => {
    const data = [...companiesSelect]
    formData.map((form, ind) => {
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

  const resetValues = () => {
    const data = [...formData]

    data[index]['SharePercent'] = '' + 0
    data[index]['PremiumPerShare'] = '' + 0

    data[index]['DynamicComissionPercent'] = '' + 0
    data[index]['DynamicComission'] = '' + 0

    data[index]['BrokerAge'] = '' + 0
    data[index]['BrokerAgePercent'] = '' + 0

    data[index]['TaxesPercent'] = '' + 0
    data[index]['Taxes'] = '' + 0

    data[index]['NetInsurancePremium'] = '' + 0
  }

  const setValues = (field: keyof FormInfo) => {
    const data = formData.map(obj => ({ ...obj }))
    const totalNetPremium = data[index]['NetPremium']
    const premiumPerShare = data[index]['PremiumPerShare']
    const dynamicComission = data[index]['DynamicComission']
    const sharePercent = data[index]['SharePercent']
    const dynamicComissionPercent = data[index]['DynamicComissionPercent']
    const BrokerAge = data[index]['BrokerAge']
    const Taxes = data[index]['Taxes']
    const BrokerAgePercent = data[index]['BrokerAgePercent']
    const TaxesPercent = data[index]['TaxesPercent']
    const FrontingFee = data[index]['FrontingFee']
    const FrontingFeePercent = data[index]['FrontingFeePercent']
    let NetInsurancePremium = ''

    const calculateNetInsurancePremium = () => {
      if (isGross) {
        NetInsurancePremium = validateNumber(
          (+premiumPerShare - +dynamicComission - +Taxes - +BrokerAge - +FrontingFee).toString(),
          true
        )
      } else {
        NetInsurancePremium = validateNumber((+premiumPerShare - +dynamicComission - +FrontingFee).toString(), true)
      }
      const dataError = [...formErrors]

      if (+NetInsurancePremium < 0)
        dataError[index]['NetInsurancePremium'] = 'ERROR: The number must be greater than 0!'
      else dataError[index]['NetInsurancePremium'] = ''
      setFormErrors(dataError)
      setFormErrors(formErrors)
      if (+totalNetPremium === 0) {
        data[index]['NetPremium'] = formInformation.netPremium.toString()
      }
    }

    calculateNetInsurancePremium()

    switch (field) {
      case 'NetPremium':
        data[index]['PremiumPerShare'] = validateNumber(((+sharePercent * +totalNetPremium) / 100).toString())

        break

      case 'SharePercent':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['PremiumPerShare'] = validateNumber(((+sharePercent * +totalNetPremium) / 100).toString())

        break

      case 'PremiumPerShare':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['SharePercent'] = validateNumber(((+premiumPerShare / +totalNetPremium) * 100).toString())
        data[index]['Taxes'] = isGross ? validateNumber(((+TaxesPercent * +premiumPerShare) / 100).toString()) : ''
        data[index]['BrokerAge'] = isGross
          ? validateNumber(((+BrokerAgePercent * +premiumPerShare) / 100).toString())
          : ''
        data[index]['FrontingFee'] = validateNumber(((+FrontingFeePercent * +premiumPerShare) / 100).toString())
        data[index]['DynamicComission'] = validateNumber(
          ((+dynamicComissionPercent * +premiumPerShare) / 100).toString()
        )

        break

      case 'DynamicComission':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['DynamicComissionPercent'] = validateNumber(
          ((+dynamicComission / +premiumPerShare) * 100).toString()
        )
        break

      case 'DynamicComissionPercent':
        data[index]['DynamicComission'] = validateNumber(
          ((+dynamicComissionPercent * +premiumPerShare) / 100).toString()
        )
        break

      case 'Taxes':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['TaxesPercent'] = validateNumber(((+Taxes / +premiumPerShare) * 100).toString())
        break

      case 'TaxesPercent':
        data[index]['Taxes'] = validateNumber(((+TaxesPercent * +premiumPerShare) / 100).toString())
        break

      case 'BrokerAge':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['BrokerAgePercent'] = validateNumber(((+BrokerAge / +premiumPerShare) * 100).toString())
        break

      case 'BrokerAgePercent':
        data[index]['BrokerAge'] = validateNumber(((+BrokerAgePercent * +premiumPerShare) / 100).toString())
        break

      case 'RetroCedant':
        data[index]['RetroCedantContact'] = ''
        break

      case 'FrontingFee':
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['FrontingFeePercent'] = validateNumber(((+FrontingFee / +premiumPerShare) * 100).toString())
        break

      case 'FrontingFeePercent':
        data[index]['FrontingFee'] = validateNumber(((+FrontingFeePercent * +premiumPerShare) / 100).toString())
    }
    if (!frontingFeeEnabled) {
      data[index]['FrontingFeePercent'] = '0'
      data[index]['FrontingFee'] = '0'
    }

    setFormData(data)
  }

  //** SET VALUES USEEFFECTS */

  useEffect(() => {
    setValues('NetPremium')
    //eslint-disable-next-line
  }, [formData[index].NetPremium])

  useEffect(() => {
    setValues('PremiumPerShare')
    //eslint-disable-next-line
  }, [formData[index].PremiumPerShare])

  useEffect(() => {
    setValues('DynamicComission')
    //eslint-disable-next-line
  }, [formData[index].DynamicComission])

  useEffect(() => {
    setValues('Taxes')
    //eslint-disable-next-line
  }, [formData[index].Taxes])

  useEffect(() => {
    setValues('BrokerAge')
    //eslint-disable-next-line
  }, [formData[index].BrokerAge])

  useEffect(() => {
    setValues('RetroCedant')
    setIdCedant(+formData[index].RetroCedant)
    //eslint-disable-next-line
  }, [formData[index].RetroCedant])

  useEffect(() => {
    setValues('FrontingFee')
    //eslint-disable-next-line
  }, [formData[index].FrontingFee])

  useEffect(() => {
    calculateAvaliableReinsurers()
    //eslint-disable-next-line
  }, [formData, companiesSelect])

  useEffect(() => {
    const data = accountData.formsData.form1.placementStructure as FormInformation
    setFormInformation(data)
  }, [accountData.formsData.form1])

  useEffect(() => {
    const data = [...formData]
    data[index]['IsGross'] = isGross
    setFormData(data)
    //eslint-disable-next-line
  }, [isGross])

  useEffect(() => {
    const company = companiesSelect.find(company => company.id === +formData[index].ReinsuranceCompany)
    const data = [...formData]

    if (company) {
      setIsGross(true)
      resetValues()
      setIsGross(company.isGross)
      company.isGross
        ? (data[index]['NetPremium'] = formInformation.grossPremium.toString())
        : (data[index]['NetPremium'] = formInformation.netPremium.toString())

      setValues('NetPremium')
    } else {
      setIsGross(false)
      data[index]['NetPremium'] = formInformation.netPremium.toString()
      setValues('NetPremium')
    }

    if (company?.isGross) {
      handleIsGross()
    } else handleIsNet()
    //eslint-disable-next-line
  }, [formData[index].ReinsuranceCompany])

  useEffect(() => {
    const data = [...formData]
    data[index].NetPremium = formInformation.netPremium.toString()
    setFormData(data)
    //eslint-disable-next-line
  }, [])

  const switchAlpex = useRef(null)

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
              value={formData[index].NetPremium}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              defaultValue={formInformation.netPremium.toString()}
              onChange={e => handleFormChange('NetPremium', e.target.value)}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.NetPremium}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={formData[index].SharePercent}
              onChange={e => handleFormChange('SharePercent', e.target.value)}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                prefix: '%'
              }}
              onKeyUp={() => setValues('SharePercent')}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.SharePercent}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage %'
                value={formData[index].BrokerAgePercent}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  prefix: '%'
                }}
                onChange={e => handleFormChange('BrokerAgePercent', e.target.value)}
                onKeyUp={() => setValues('BrokerAgePercent')}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.BrokerAgePercent}</FormHelperText>
            </FormControl>
          )}

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={formData[index].DynamicComissionPercent}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                prefix: '%'
              }}
              onChange={e => handleFormChange('DynamicComissionPercent', e.target.value)}
              onKeyUp={() => setValues('DynamicComissionPercent')}
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
                  prefix: '%'
                }}
                value={formData[index].TaxesPercent}
                onChange={e => handleFormChange('TaxesPercent', e.target.value)}
                onKeyUp={() => setValues('TaxesPercent')}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.TaxesPercent}</FormHelperText>
            </FormControl>
          )}

          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={formData[index].FrontingFeePercent}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  prefix: '%'
                }}
                onChange={e => handleFormChange('FrontingFeePercent', e.target.value)}
                onKeyUp={() => setValues('FrontingFeePercent')}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.FrontingFeePercent}</FormHelperText>
            </FormControl>
          )}
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Reinsurance companies</InputLabel>

            <Select
              value={formData[index].ReinsuranceCompany}
              onChange={e => handleFormChange('ReinsuranceCompany', e.target.value)}
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
              value={formData[index].PremiumPerShare}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={e => handleFormChange('PremiumPerShare', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.PremiumPerShare}</FormHelperText>
          </FormControl>

          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage'
                value={formData[index].BrokerAge}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => handleFormChange('BrokerAge', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.BrokerAge}</FormHelperText>
            </FormControl>
          )}

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={formData[index].DynamicComission}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={e => handleFormChange('DynamicComission', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.DynamicComission}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Taxes'
                value={formData[index].Taxes}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => handleFormChange('Taxes', e.target.value)}
              />

              <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.Taxes}</FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={formData[index].FrontingFee}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={e => handleFormChange('FrontingFee', e.target.value)}
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
              value={formData[index].NetInsurancePremium}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              disabled={true}
              onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
            />

            <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.NetInsurancePremium}</FormHelperText>
          </FormControl>

          {frontingFeeEnabled && (formData[index]?.SharePercent !== '' || formData[index]?.PremiumPerShare !== '') && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select Retro cedant</InputLabel>

              <Select
                label='Select Retro cedant'
                value={formData[index].RetroCedant}
                onChange={e => {
                  handleFormChange('RetroCedant', e.target.value)
                }}
                labelId='broker'
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

          {frontingFeeEnabled && (formData[index]?.SharePercent !== '' || formData[index]?.PremiumPerShare !== '') && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select Retro Cedant contact</InputLabel>
              <Select
                label='Select Retro Cedant contact '
                value={formData[index].RetroCedantContact}
                onChange={e => handleFormChange('RetroCedantContact', e.target.value)}
                labelId='broker'
                disabled={formData[index].RetroCedant === ''}
              >
                {contacts?.map(contact => (
                  <MenuItem key={contact.name} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                onClick={() => console.log(formData[index].RetroCedantContact)}
                sx={{ color: 'error.main' }}
              >
                {formErrors[index]?.RetroCedantContact}
              </FormHelperText>
            </FormControl>
          )}
          {formData[index]?.RetroCedantContact !== '' && frontingFeeEnabled && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={formData[index].ContactEmail}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any
                  }}
                  onChange={e => handleFormChange('ContactEmail', e.target.value)}
                />

                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.ContactEmail}</FormHelperText>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact phone'
                  value={formData[index].ContactPhone}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any
                  }}
                  onChange={e => handleFormChange('ContactPhone', e.target.value)}
                />

                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.ContactPhone}</FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact country'
                  value={formData[index].ContactCountry}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any
                  }}
                  onChange={e => handleFormChange('ContactCountry', e.target.value)}
                />

                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.ContactCountry}</FormHelperText>
              </FormControl>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const Security = ({ onStepChange }: SecurityProps) => {
  const [formData, setFormData] = useState<FormInfo[]>([{ ...SecurityForm }])
  const [formErrors, setFormErrors] = useState<FormInfo[]>([{ ...SecurityForm }])
  const { saveSecurityTotal } = useAddSecurityTotal()
  const { saveSecurities } = useAddSecurities()
  const [allFormData, setAllFormData] = useState<FormSecurity>({
    FormData: formData,
    RecievedNetPremium: '',
    DistribuitedNetPremium: '',
    Diference: ''
  })

  const [open, setOpen] = useState<boolean>(false)
  const [formInformation, setFormInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })

  const dispatch = useAppDispatch()
  const accountData = useAppSelector(state => state.accounts)
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const { account } = useGetAccountById(62)

  useEffect(() => {
    console.log(account)
  }, [account])

  const inter = userThemeConfig.typography?.fontFamilyInter

  const addNewForm = () => {
    setFormData([...formData, { ...SecurityForm }])
    setFormErrors([...formErrors, { ...SecurityForm }])
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    validate(true)
  }

  const handleNext = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    validate()
  }

  const validate = async (isNextStep?: boolean) => {
    formData.forEach((form, index) => {
      const data = [...formErrors]
      data[index] = { ...SecurityForm }

      if (form.IsGross) {
        schema
          .validate(form, { abortEarly: false })
          .then(function () {
            handleSuccess()

            if (isNextStep) onStepChange!(3)
          })
          .catch(function (err) {
            err?.inner?.forEach((e: any) => {
              data[index][e.path] = e.message
              setFormErrors(data)
            })
          })
      } else {
        schemaNetPremium
          .validate(form, { abortEarly: false })
          .then(function () {
            handleSuccess()
            if (isNextStep) onStepChange!(3)
          })
          .catch(function (err) {
            err?.inner?.forEach((e: any) => {
              data[index][e.path] = e.message
              setFormErrors(data)
            })
          })
      }
    })
  }

  const calculateDistribuitedNetPremium = () => {
    let DistribuitedNetPremium = 0
    let sumSharePercent = 0
    let sumGrossShare = 0
    formData.forEach(form => {
      DistribuitedNetPremium +=
        +form.BrokerAge + +form.Taxes + +form.DynamicComission + +form.FrontingFee + +form.NetInsurancePremium
      if (!form.IsGross) sumSharePercent += +form.SharePercent
      else sumGrossShare += +form.PremiumPerShare
    })
    const recievedNetPremium = (sumSharePercent * +formInformation.netPremium) / 100 + sumGrossShare

    setAllFormData({
      ...allFormData,
      DistribuitedNetPremium: DistribuitedNetPremium.toString(),
      RecievedNetPremium: recievedNetPremium.toString()
    })
  }

  const saveInformation = async () => {
    const forms: Partial<SecurityDto>[] = formData.map(form => {
      return {
        netPremiumat100: +form.NetPremium || 0,
        share: +form.SharePercent || 0,
        frontingFeeActive: form.HasFrontingFee || false,
        dynamicCommission: +form.DynamicComission || 0,
        frontingFee: +form.FrontingFee || 0,
        netReinsurancepremium: +form.NetInsurancePremium || 0,
        taxes: +form.Taxes || 0,
        reinsuranceBrokerage: +form.BrokerAge || 0,
        active: true,
        idCReinsuranceCompany: null,
        idCRetroCedant: null,
        idCRetroCedantContact: null,
        idEndorsement: null,
        idAccount: +accountData.formsData.form1.id,
        receivedNetPremium: +allFormData.RecievedNetPremium,
        distributedNetPremium: +allFormData.DistribuitedNetPremium,
        difference: +allFormData.Diference
      }
    })
    const saveTotal = await saveSecurityTotal({
      receivedNetPremium: +allFormData.RecievedNetPremium,
      distributedNetPremium: +allFormData.DistribuitedNetPremium,
      difference: +allFormData.Diference,
      idAccount: +accountData.formsData.form1.id
    })

    const saveAll = await saveSecurities(forms)

    console.log(saveTotal, saveAll)
  }

  const handleSuccess = () => {
    saveInformation()
    dispatch(updateFormsData({ form2: allFormData }))
  }

  useEffect(() => {
    const data = accountData.formsData.form1.placementStructure as FormInformation
    setFormInformation(data)
    //eslint-disable-next-line
  }, [accountData.formsData.form1])

  useEffect(() => {
    calculateDistribuitedNetPremium()
    //eslint-disable-next-line
  }, [formData])

  useEffect(() => {
    setAllFormData({
      ...allFormData,
      Diference: (+allFormData.RecievedNetPremium - +allFormData.DistribuitedNetPremium).toString()
    })
    //eslint-disable-next-line
  }, [allFormData.DistribuitedNetPremium, allFormData.RecievedNetPremium])

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <div className='title'>Security</div>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            {formData.map((_, index) => (
              <>
                {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
                <FormSection
                  key={index}
                  index={index}
                  formData={formData}
                  setFormData={setFormData}
                  formErrors={formErrors}
                  setFormErrors={setFormErrors}
                />
              </>
            ))}
          </div>
          <div className='fullwidth'>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Recieved net premium'
                disabled
                fullWidth
                value={allFormData.RecievedNetPremium}
              />
            </FormControl>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                fullWidth
                label='Distribuited net premium'
                disabled
                value={allFormData.DistribuitedNetPremium}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField autoFocus label='Diference' disabled value={allFormData.Diference} />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          </div>
          <div className='add-reinsurer'>
            <Button
              type='button'
              onClick={addNewForm}
              variant='text'
              color='primary'
              size='large'
              fullWidth
              sx={{ justifyContent: 'start' }}
            >
              <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD REINSURER
            </Button>
          </div>
          <div className='section action-buttons' style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
            <Button className='btn-save' onClick={() => validate()} variant='contained'>
              <div className='btn-icon'>
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
            <Button className='btn-next' onClick={handleNext}>
              Next Step
              <div className='btn-icon'>
                <Icon icon='material-symbols:arrow-right-alt' />
              </div>
            </Button>

            <Modal className='next-step-modal' open={open} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: 'absolute',
                  bgcolor: 'white',
                  top: '50%',
                  left: '50%',
                  boxShadow: 24,
                  pl: 5,
                  pr: 5,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '10px',
                  padding: '15px'
                }}
              >
                <HeaderTitleModal>
                  <div className='next-modal-title'>Ready to continue?</div>
                  <ButtonClose onClick={handleCloseModal}>
                    <CloseIcon />
                  </ButtonClose>
                </HeaderTitleModal>
                <div className='next-modal-text'>
                  You are about to advance to the next form. Make sure that all the fields have been completed with the
                  correct information.
                </div>
                <Button className='continue-modal-btn' variant='contained' onClick={onNextStep}>
                  CONTINUE
                </Button>
                <Button className='create-contact-modal' onClick={() => setOpen(false)}>
                  Keep editing information
                </Button>
              </Box>
            </Modal>
          </div>
        </form>
      </div>
    </>
  )
}

export default Security
