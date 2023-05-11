import { useEffect, useRef, useState } from 'react'
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

// ** MOCKS IMPORT
import companiesSelect from 'src/mocks/companies'

// ** Icon Imports
import { useAddSecurities } from '@/hooks/accounts/security'
import { useAddSecurityTotal } from '@/hooks/accounts/securityTotal'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { updateFormsData } from '@/store/apps/accounts'
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
  ReinsuranceCompany: '-1',
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

const schema = yup.object().shape({
  HasFrontingFee: yup.boolean(),
  NetPremium: yup.number().required(),
  SharePercent: yup.number().required(),
  DynamicComissionPercent: yup.number().required(),
  FrontingFee: yup.number().when('HasFrontingFee', {
    is: true,
    then: yup.number().required()
  }),
  ReinsuranceCompany: yup.string().test('is-valid', 'This field is required', value => value !== '-2'),
  PremiumPerShare: yup.number().required(),
  DynamicComission: yup.number().required(),
  FrontingFeePercent: yup.number().when('HasFrontingFee', {
    is: true,
    then: yup.number().required('This field is required zxx')
  }),
  NetInsurancePremium: yup.number().required(),
  RetroCedant: yup.string().when('HasFrontingFee', {
    is: true,
    then: yup.string().required()
  }),
  RetroCedantContact: yup.string().when('HasFrontingFee', {
    is: true,
    then: yup.string().notRequired()
  }),
  IsGross: yup.boolean(),
  BrokerAge: yup.number().when('IsGross', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  Taxes: yup.number().when('IsGross', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  BrokerAgePercent: yup.number().when('IsGross', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  TaxesPercent: yup.number().when('IsGross', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  })
})

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

const FormSection = ({ index, formData, setFormData, formErrors, setFormErrors }: FormSectionProps) => {
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)
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

  useEffect(() => {
    console.log({ retroCedants }, { reinsuranceCompany })
  }, [retroCedants, reinsuranceCompany])

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
    if (formInformation.frontingFee <= 0 || isGross) !frontingFeeEnabled && handleSwitch()
    else frontingFeeEnabled && handleSwitch()
  }

  const validateNumber = (value: string, allowZero = false) => {
    const result = isNaN(+value) || +value <= 0 ? (+value === 0 && allowZero ? 0 : '') : Math.round(+value * 100) / 100
    console.log(result)

    return result.toString()
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
    if (isGross) {
      NetInsurancePremium = validateNumber(
        (+premiumPerShare - +dynamicComission - +Taxes - +BrokerAge - +FrontingFee).toString(),
        true
      )
    } else {
      NetInsurancePremium = validateNumber((+premiumPerShare - +dynamicComission - +FrontingFee).toString(), true)
    }

    switch (field) {
      case 'NetPremium':
        data[index]['SharePercent'] = '100'
        data[index]['PremiumPerShare'] = totalNetPremium
        break

      case 'SharePercent':
        data[index]['PremiumPerShare'] = validateNumber(((+sharePercent * +totalNetPremium) / 100).toString())
        break

      case 'PremiumPerShare':
        data[index]['SharePercent'] = validateNumber(((+premiumPerShare / +totalNetPremium) * 100).toString())
        data[index]['NetInsurancePremium'] = NetInsurancePremium
        data[index]['DynamicComissionPercent'] = '100'
        data[index]['FrontingFeePercent'] = '100'
        data[index]['TaxesPercent'] = isGross ? '100' : ''
        data[index]['BrokerAgePercent'] = isGross ? '100' : ''
        data[index]['Taxes'] = isGross ? premiumPerShare : ''
        data[index]['BrokerAge'] = isGross ? premiumPerShare : ''
        data[index]['FrontingFee'] = premiumPerShare
        data[index]['DynamicComission'] = premiumPerShare

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
    //eslint-disable-next-line
  }, [formData[index].RetroCedant])

  useEffect(() => {
    setValues('FrontingFee')
    //eslint-disable-next-line
  }, [formData[index].FrontingFee])

  useEffect(() => {
    calculateAvaliableReinsurers()
    //eslint-disable-next-line
  }, [formData])

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
      setIsGross(company.isGross)
      company.isGross
        ? (data[index]['NetPremium'] = formInformation.grossPremium.toString())
        : (data[index]['NetPremium'] = formInformation.netPremium.toString())
    } else {
      setIsGross(false)
      data[index]['NetPremium'] = formInformation.netPremium.toString()
    }
    setFormData(data)

    if (company?.isGross) {
      handleIsGross()
    } else handleIsNet()
    //eslint-disable-next-line
  }, [formData[index].ReinsuranceCompany])

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
              label='Select a reinsurance company'
              value={formData[index].ReinsuranceCompany}
              onChange={e => handleFormChange('ReinsuranceCompany', e.target.value)}
              labelId='broker'
            >
              <MenuItem value='-1'>Select a reinsurance company</MenuItem>
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
                <MenuItem value=''>Select Retro cedant</MenuItem>
                <MenuItem value='br1'>Retro cedant 1</MenuItem>
                <MenuItem value='br2'>Retro cedant 2</MenuItem>
                <MenuItem value='br3'>Retro cedant 3</MenuItem>
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
                <MenuItem value=''>Select Retro Cedant contact</MenuItem>
                <MenuItem value='1'>Contact 1</MenuItem>
                <MenuItem value='2'>Contact 2</MenuItem>
                <MenuItem value='3'>Contact 3</MenuItem>
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
  const [enableNextStep, setEnableNextStep] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [formInformation, setFormInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })

  const dispatch = useAppDispatch()
  const accountData = useAppSelector(state => state.accounts)
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter

  const addNewForm = () => {
    setFormData([...formData, { ...SecurityForm }])
    setFormErrors([...formErrors, { ...SecurityForm }])
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    onStepChange!(3)
  }

  const handleNext = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    validate()
  }

  const validate = async () => {
    formData.forEach((form, index) => {
      const data = [...formErrors]
      data[index] = { ...SecurityForm }
      schema
        .validate(form, { abortEarly: false })
        .then(function () {
          handleSuccess()
        })
        .catch(function (err) {
          console.log(err)

          err?.inner?.forEach((e: any) => {
            data[index][e.path] = e.message
            console.log(e.path, e.message)
            console.log(formData)

            setFormErrors(data)
          })
          setEnableNextStep(false)
        })
    })
  }

  const calculateDistribuitedNetPremium = () => {
    console.log(formInformation)
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

  const saveInformation = () => {
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
    const saveTotal = saveSecurityTotal({
      receivedNetPremium: +allFormData.RecievedNetPremium,
      distributedNetPremium: +allFormData.DistribuitedNetPremium,
      difference: +allFormData.Diference,
      idAccount: +accountData.formsData.form1.id
    })

    const saveAll = saveSecurities(forms)

    console.log(saveTotal, saveAll)
  }

  const handleSuccess = () => {
    saveInformation()
    dispatch(updateFormsData({ form2: allFormData }))
    setEnableNextStep(true)
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
            <Button className='btn-save' onClick={validate} variant='contained'>
              <div className='btn-icon'>
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
            <Button className='btn-next' disabled={!enableNextStep} onClick={handleNext}>
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
