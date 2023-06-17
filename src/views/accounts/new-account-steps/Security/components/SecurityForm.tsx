import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'
import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import SwitchAlpex from '@/views/custom/switchs'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'

import { useContext, useEffect, useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'
import { SecurityContext } from '../SecurityView'
import { CalculateSecurity } from '../utils/calculates-securities'

// type Timer = ReturnType<typeof setInterval>
// let typingTimer: Timer
// const doneTypingInterval = 1000 // Tiempo en milisegundos para considerar que se dejó de escribir
const initialErrorValues: errorsSecurity = {
  netPremiumAt100: '',
  share: '',
  premiumPerShareAmount: '',
  reinsuranceBrokerage: '',
  brokerAgeAmount: '',
  dynamicCommission: '',
  dynamicCommissionAmount: '',
  frontingFee: '',
  frontingFeeAmount: '',
  taxes: '',
  taxesAmount: '',
  netReinsurancePremium: '',
  idCReinsuranceCompany: '',
  idCRetroCedantContact: '',
  idCRetroCedant: ''
}
export const FormSection = ({ index, security, onDeleteItemList }: FormSectionProps) => {
  const [isGross, setIsGross] = useState<boolean>(security.isGross)

  const [errorsSecurity, setErrorsSecurity] = useState<errorsSecurity>(initialErrorValues)

  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(security.frontingFeeActive || false)

  const [avaliableReinsurers, setAvaliableReinsurers] = useState<ReinsuranceCompanyDto[]>([])
  const switchAlpex = useRef(null)
  const {
    securities,
    activeErros,
    setSecurities,
    allErrors,
    setAllErrors,
    information,
    companiesSelect,
    calculateSecurities
  } = useContext(SecurityContext)
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { retroCedants } = useGetAllRetroCedants()
  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()
  const { countries } = useGetAllCountries()
  const operationSecurity: CalculateSecurity = new CalculateSecurity().setInformation(information).setSecurity(security)

  const schemaRetrocedant = yup.object().shape({
    idCRetroCedant: yup
      .object()
      .shape({
        id: yup.number().nullable().notRequired(),
        name: yup.string().nullable().notRequired()
      })
      .test('', 'This field is required', value => {
        if (frontingFeeEnabled && value && typeof value === 'object') {
          return value.hasOwnProperty('id')
        }

        return true
      }),

    idCRetroCedantContact: yup
      .object()
      .shape({
        id: yup.number().nullable().notRequired(),
        name: yup.string().nullable().notRequired()
      })
      .test('', 'This field is required', value => {
        if (frontingFeeEnabled && value && typeof value === 'object') {
          return value.hasOwnProperty('id')
        }

        return true
      }),

    frontingFee: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (frontingFeeEnabled) return +val > 0

        return true
      })
      .required('This field is required')

      .max(100),

    frontingFeeAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (frontingFeeEnabled) return +val > 0

        return true
      })
      .required('This field is required')
  })

  const schema = yup.object().shape({
    netPremiumAt100: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required'),
    share: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .min(1)
      .max(100)
      .required('This field is required'),
    premiumPerShareAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required'),
    reinsuranceBrokerage: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross) return +val > 0

        return true
      })
      .max(100),
    brokerAgeAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross) return +val > 0

        return true
      }),
    dynamicCommission: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .required('This field is required')
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })

      .max(100),
    dynamicCommissionAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required'),
    taxesAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross) return +val > 0

        return true
      })
      .required('This field is required'),
    taxes: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        if (isGross) return +val > 0

        return true
      })
      .max(100),
    netReinsurancePremium: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .required('This field is required')
      .min(1, 'The number must be greater than 0!')
  })

  const handleSwitch = () => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      idCRetroCedant: {} as RetroCedantDto,
      idCRetroCedantContact: {} as RetroCedantContactDto,
      frontingFee: Number(null),
      frontingFeeAmount: Number(null),
      frontingFeeActive: !security.frontingFeeActive
    }
    setFrontingFeeEnabled(() => !security.frontingFeeActive)

    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeRetroCedant = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantId = e.target.value
    const retroCedant = retroCedants?.find(retroCedant => retroCedant.id === Number(selectedRetroCendantId))
    const tempSecurities = [...securities]
    if (retroCedant) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCRetroCedant: retroCedant,
        idCRetroCedantContact: {} as RetroCedantContactDto
      }
      validateForm(tempSecurities[index])
      setSecurities(tempSecurities)
      setIdRetroCedant(retroCedant.id)
    }
  }

  const handleChangeRetroCedantContact = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantContactId = e.target.value
    const retroCedantContact = retroCedantContacts?.find(
      retroCedantContact => retroCedantContact.id === Number(selectedRetroCendantContactId)
    )
    const tempSecurities = [...securities]

    tempSecurities[index] = {
      ...tempSecurities[index],
      idCRetroCedantContact: retroCedantContact ? retroCedantContact : ({} as RetroCedantContactDto)
    }
    validateForm(tempSecurities[index])
    setSecurities(tempSecurities)
  }

  const handleChangeBaseAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      netPremiumAt100: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeSharePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      share: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeBrokerRagePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeDynamicComissionPercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeTaxesPercent = (value: number) => {
    // Código a ejecutar cuando se deja de escribir
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxes: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeFrontingFeePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangePremiumPerShareAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      share: operationSecurity.getsharePercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeBrokerAgeAmount = (value: number) => {
    // clearInterval(typingTimer)

    // // Iniciar un nuevo intervalo
    // typingTimer = setInterval(() => {
    //   // Código a ejecutar cuando se deja de escribir
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: operationSecurity.getBrokerAgePercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)

    //   // Limpiar el intervalo
    //   clearInterval(typingTimer)
    // }, doneTypingInterval)
  }

  const handleChangeDynamicComissionAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: operationSecurity.getDynamicComissionPercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeTaxesAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxes: operationSecurity.getTaxesPercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeFrontingFeeAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: operationSecurity.getFrontingFeePercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  const handleChangeCompany = (e: SelectChangeEvent<string>): void => {
    const avaliableCompanies = avaliableReinsurers
      .filter(reinsure => !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id)
      .find(reinsurer => reinsurer.id === Number(e.target.value))

    const tempSecurities = [...securities]
    if (avaliableCompanies) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompany: avaliableCompanies,
        frontingFeeActive: false,
        isGross: avaliableCompanies.special,
        netPremiumAt100: avaliableCompanies.special ? information.grossPremium : information.netPremium
      }

      setIsGross(() => avaliableCompanies.special)
      setFrontingFeeEnabled(() => false)
      calculateSecurities(tempSecurities)
      validateForm(tempSecurities[index])
    }
  }

  const validateForm = (securityParam: SecurityDto) => {
    let data = { ...initialErrorValues }

    const errorsTemp = [...allErrors]

    let combinedSchema = yup.object().shape({
      ...schema.fields
    })

    // Combinar los esquemas
    if (securityParam.frontingFeeActive && (securityParam.share || securityParam.premiumPerShareAmount)) {
      combinedSchema = yup.object().shape({
        ...schema.fields,
        ...schemaRetrocedant.fields
      })
    }

    errorsTemp[index] = false
    combinedSchema
      .validate(securityParam, { abortEarly: false })
      .then(function () {
        errorsTemp[index] = false
        setErrorsSecurity(initialErrorValues)
      })
      .catch(function (err) {
        for (const error of err?.inner) {
          data = {
            ...data,
            [error.path]: error.message
          }
        }
        errorsTemp[index] = true
        console.log({ data, index })
        setErrorsSecurity(data)

        //setEnableNextStep(false)
      })
      .finally(() => {
        console.log({ errorsTemp, index })
        setAllErrors(() => [...errorsTemp])
      })
  }

  useEffect(() => {
    const companies = reinsuranceCompany?.map(company => {
      return {
        id: company.id,
        name: company.name,
        special: company.idSubscriptionType === 1,
        active: true
      }
    })
    setAvaliableReinsurers(companies || [])
  }, [reinsuranceCompany])

  useEffect(() => {
    if (security?.id) {
      setIdRetroCedant(security.idCRetroCedant?.id)
    }

    setFrontingFeeEnabled(() => security.frontingFeeActive)
    setIsGross(() => security.isGross)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security])

  useEffect(() => {
    validateForm(security)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGross, frontingFeeEnabled])

  useEffect(() => {
    validateForm(security)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
      <Grid container item xs={12} sm={12}>
        <Grid item xs={6} sm={6}>
          {information?.frontingFee <= 0 || isGross ? (
            <FormControl fullWidth sx={{ mb: 5 }}>
              <div>
                <span className='switch-text'>Fronting fee </span>
                <SwitchAlpex innerRef={switchAlpex} checked={frontingFeeEnabled} onClick={handleSwitch} />
              </div>
            </FormControl>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={6} sm={6}>
          {!security.id && index > 0 && (
            <div
              className='section action-buttons'
              style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
            >
              <Icon
                component={DeleteOutlineIcon}
                amplitude={10}
                style={{
                  fontSize: '34px',
                  cursor: 'pointer',
                  zIndex: '1000'
                }}
                onClick={() => onDeleteItemList(index)}
              />
            </div>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        {/* Col-1 */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              fullWidth
              autoFocus
              label={isGross ? 'Gross premium at %100' : 'Net premium at %100'}
              value={security.netPremiumAt100}
              onValueChange={value => {
                handleChangeBaseAmount(Number(value.floatValue))
              }}
              prefix={'$'}
              customInput={TextField}
              decimalScale={2}
              thousandSeparator=','
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.netPremiumAt100}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              autoFocus
              label='Share %'
              value={security.share}
              onValueChange={value => {
                handleChangeSharePercent(Number(value.floatValue))
              }}
              suffix={'%'}
              customInput={TextField}
              decimalScale={2}
              isAllowed={values => {
                return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
              }}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.share}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Reinsurance brokerage %'
                value={security.reinsuranceBrokerage}
                onValueChange={value => {
                  handleChangeBrokerRagePercent(Number(value.floatValue))
                }}
                suffix={'%'}
                customInput={TextField}
                decimalScale={2}
                isAllowed={values => {
                  return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
                }}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.reinsuranceBrokerage}
              </FormHelperText>
            </FormControl>
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              autoFocus
              label='Dynamic comission %'
              value={security.dynamicCommission}
              onValueChange={value => {
                handleChangeDynamicComissionPercent(Number(value.floatValue))
              }}
              suffix={'%'}
              customInput={TextField}
              decimalScale={2}
              isAllowed={values => {
                return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
              }}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.dynamicCommission}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Taxes %'
                value={security.taxes}
                onValueChange={value => {
                  handleChangeTaxesPercent(Number(value.floatValue))
                }}
                suffix={'%'}
                customInput={TextField}
                decimalScale={2}
                isAllowed={values => {
                  return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
                }}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.taxes}
              </FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Fronting fee %'
                value={security.frontingFee}
                onValueChange={value => {
                  handleChangeFrontingFeePercent(Number(value.floatValue))
                }}
                suffix={'%'}
                customInput={TextField}
                decimalScale={2}
                isAllowed={values => {
                  return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
                }}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.frontingFee}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
        {/* Col-2 */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id='ReinsuranceCompany'>Reinsurance companies</InputLabel>
            <Select
              id='outlined-Name'
              value={String(security.idCReinsuranceCompany?.id)}
              onChange={handleChangeCompany}
              labelId='ReinsuranceCompany'
              label='Reinsurance companies'
            >
              {avaliableReinsurers
                .filter(
                  reinsure =>
                    !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id
                )
                .map(reinsurer => (
                  <MenuItem key={reinsurer.id} value={reinsurer.id}>
                    {reinsurer.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.idCReinsuranceCompany}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              autoFocus
              label='Premium per share'
              value={security.premiumPerShareAmount}
              onValueChange={value => {
                handleChangePremiumPerShareAmount(Number(value.floatValue))
              }}
              prefix={'$'}
              customInput={TextField}
              decimalScale={2}
              thousandSeparator=','
            />
            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.premiumPerShareAmount}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Reinsurance brokerage'
                value={security.brokerAgeAmount}
                onValueChange={value => {
                  handleChangeBrokerAgeAmount(Number(value.floatValue))
                }}
                prefix={'$'}
                customInput={TextField}
                decimalScale={2}
                thousandSeparator=','
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.brokerAgeAmount}
              </FormHelperText>
            </FormControl>
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              autoFocus
              label='Dynamic comission'
              value={security.dynamicCommissionAmount}
              onValueChange={value => {
                handleChangeDynamicComissionAmount(Number(value.floatValue))
              }}
              prefix={'$'}
              customInput={TextField}
              decimalScale={2}
              thousandSeparator=','
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.dynamicCommissionAmount}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Taxes'
                value={security.taxesAmount}
                onValueChange={value => {
                  handleChangeTaxesAmount(Number(value.floatValue))
                }}
                prefix={'$'}
                customInput={TextField}
                decimalScale={2}
                thousandSeparator=','
              />
              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.taxesAmount}
              </FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <NumericFormat
                autoFocus
                label='Fronting fee'
                value={security.frontingFeeAmount}
                onValueChange={value => {
                  handleChangeFrontingFeeAmount(Number(value.floatValue))
                }}
                prefix={'$'}
                customInput={TextField}
                decimalScale={2}
                thousandSeparator=','
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.frontingFeeAmount}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
        {/* Col-3 */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <NumericFormat
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={security.netReinsurancePremium}
              prefix={'$'}
              customInput={TextField}
              decimalScale={2}
              thousandSeparator=','
              disabled={true}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {activeErros && errorsSecurity.netReinsurancePremium}
            </FormHelperText>
          </FormControl>
          {frontingFeeEnabled && (security.share || security.premiumPerShareAmount) ? (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Retro cedant</InputLabel>
              <Select
                label='Select Retro cedant'
                value={String(security.idCRetroCedant?.id) || ''}
                onChange={handleChangeRetroCedant}
                labelId='Retrocedant'
              >
                {retroCedants?.map(cedant => (
                  <MenuItem key={cedant.name} value={cedant.id}>
                    {cedant.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.idCRetroCedant}
              </FormHelperText>
            </FormControl>
          ) : (
            <></>
          )}
          {frontingFeeEnabled && (security.share || security.premiumPerShareAmount) ? (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Retro Cedant contact</InputLabel>
              <Select
                label='Select Retro Cedant contact '
                value={String(security.idCRetroCedantContact?.id) || ''}
                onChange={handleChangeRetroCedantContact}
                labelId='RetroCedantcontact'
                disabled={security.idCRetroCedant?.id === null}
              >
                {retroCedantContacts?.map(contact => (
                  <MenuItem key={contact.name} value={contact.id}>
                    {contact.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {activeErros && errorsSecurity.idCRetroCedantContact}
              </FormHelperText>
            </FormControl>
          ) : (
            <></>
          )}

          {frontingFeeEnabled && security.idCRetroCedantContact?.id && (
            <>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  autoFocus
                  disabled
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={security.idCRetroCedantContact?.email ?? ''}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  autoFocus
                  fullWidth
                  disabled
                  size='small'
                  label='Contact phone'
                  value={security.idCRetroCedantContact?.phone ?? ''}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='Contactcountry'>Contact country</InputLabel>
                <Select
                  id='outlined-Name'
                  label='Contact country'
                  value={
                    security.idCRetroCedantContact.__idCCountry__
                      ? security.idCRetroCedantContact?.__idCCountry__.id
                      : security.idCRetroCedantContact.idCCountry ?? ''
                  }
                  labelId='Contactcountry'
                  size='small'
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
        </Grid>
      </Grid>
    </div>
  )
}
