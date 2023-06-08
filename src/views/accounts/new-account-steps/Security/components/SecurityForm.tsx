import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'
import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { NumericFormatCustom } from '@/views/components/inputs/numeric-format/NumericFormatCustom'
import SwitchAlpex from '@/views/custom/switchs'
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'

import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
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
export const FormSection = ({ index, security }: FormSectionProps) => {
  const [isGross, setIsGross] = useState<boolean>(false)

  const [errorsSecurity, setErrorsSecurity] = useState<errorsSecurity>(initialErrorValues)

  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(false)
  const { securities, setSecurities, allErrors, setAllErrors, information, companiesSelect, calculateSecurities } =
    useContext(SecurityContext)
  const [avaliableReinsurers, setAvaliableReinsurers] = useState<ReinsuranceCompanyDto[]>([])
  const switchAlpex = useRef(null)
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
      })
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
      .required('This field is required')
      .max(100),
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
      .required('This field is required')
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
      .min(1)
      .max(100),
    dynamicCommissionAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required'),
    frontingFee: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .required('This field is required')
      .max(100),
    frontingFeeAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
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
      .required('This field is required')
      .min(1)
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
      frontingFeeActive: !frontingFeeEnabled
    }
    setFrontingFeeEnabled(state => !state)

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
      setSecurities(tempSecurities)
      setIdRetroCedant(retroCedant.id)
      validateForm(tempSecurities[index])
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
  const handleChangeBaseAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      netPremiumAt100: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeSharePercent = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      share: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeBrokerRagePercent = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeDynamicComissionPercent = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }

  const handleChangeTaxesPercent = (e: ChangeEvent<HTMLInputElement>) => {
    // Código a ejecutar cuando se deja de escribir
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxes: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeFrontingFeePercent = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: parseFloat(e.target.value)
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangePremiumPerShareAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      share: operationSecurity.getsharePercent(parseFloat(e.target.value))
    }
    calculateSecurities(tempSecurities)
  }

  const handleChangeBrokerAgeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    // clearInterval(typingTimer)

    // // Iniciar un nuevo intervalo
    // typingTimer = setInterval(() => {
    //   // Código a ejecutar cuando se deja de escribir
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: operationSecurity.getBrokerAgePercent(parseFloat(e.target.value))
    }
    calculateSecurities(tempSecurities)

    //   // Limpiar el intervalo
    //   clearInterval(typingTimer)
    // }, doneTypingInterval)
  }
  const handleChangeDynamicComissionAmount = (e: any) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: operationSecurity.getDynamicComissionPercent(parseFloat(e.target.value))
    }
    calculateSecurities(tempSecurities)
  }

  const handleChangeTaxesAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxes: operationSecurity.getTaxesPercent(parseFloat(e.target.value))
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeFrontingFeeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: operationSecurity.getFrontingFeePercent(parseFloat(e.target.value))
    }
    calculateSecurities(tempSecurities)
  }
  const handleChangeCompany = (e: SelectChangeEvent<string>): void => {
    const avaliableCompanies = avaliableReinsurers
      .filter(reinsure => !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id)
      .find(reinsurer => reinsurer.id === Number(e.target.value))

    if (avaliableCompanies) {
      const tempSecurities = [...securities]
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompany: avaliableCompanies,
        frontingFeeActive: avaliableCompanies.special,
        isGross: avaliableCompanies.special,
        netPremiumAt100: avaliableCompanies.special ? information.grossPremium : information.netPremium
      }

      setFrontingFeeEnabled(() => false)
      calculateSecurities(tempSecurities)
    }
  }
  const validateForm = (securityParam: SecurityDto) => {
    let data = { ...initialErrorValues }

    const errorsTemp = [...allErrors]
    errorsTemp[index] = false
    let combinedSchema = yup.object().shape({
      ...schema.fields
    })

    // Combinar los esquemas
    if (frontingFeeEnabled)
      combinedSchema = yup.object().shape({
        ...schema.fields,
        ...schemaRetrocedant.fields
      })

    combinedSchema
      .validate(securityParam, { abortEarly: false })
      .then(function () {
        setAllErrors(errorsTemp)
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
        setAllErrors(errorsTemp)

        setErrorsSecurity(data)

        //setEnableNextStep(false)
      })
  }

  useEffect(() => {
    const companies = reinsuranceCompany?.map(company => {
      return {
        id: company.id,
        name: company.name,
        special: company.special,
        active: true
      }
    })
    setAvaliableReinsurers(companies || [])
  }, [reinsuranceCompany])
  useEffect(() => {
    if (security?.id) {
      setIdRetroCedant(security.idCRetroCedant?.id)
    }
    if (security.idCReinsuranceCompany) {
      validateForm(security)
    }

    setIsGross(security.isGross)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security])

  return (
    <div>
      {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
      {information?.frontingFee <= 0 || isGross ? (
        <Grid container item xs={12} sm={12}>
          <FormControl fullWidth sx={{ mb: 5 }}>
            <div>
              <span className='switch-text'>Fronting fee </span>
              <SwitchAlpex innerRef={switchAlpex} checked={frontingFeeEnabled} onClick={handleSwitch} />
            </div>
          </FormControl>
        </Grid>
      ) : (
        <></>
      )}
      <Grid container spacing={5}>
        {/* Col-1 */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              fullWidth
              autoFocus
              label={isGross ? 'Gross premium at %100' : 'Net premium at %100'}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              value={security.netPremiumAt100}
              defaultValue={security.netPremiumAt100}
              onChange={handleChangeBaseAmount}
            />
            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {errorsSecurity.netPremiumAt100}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={security.share}
              onChange={handleChangeSharePercent}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                suffix: '%'
              }}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{errorsSecurity.share}</FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage %'
                value={security.reinsuranceBrokerage}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                onChange={handleChangeBrokerRagePercent}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {errorsSecurity.reinsuranceBrokerage}
              </FormHelperText>
            </FormControl>
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={security.dynamicCommission}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              inputProps={{
                suffix: '%'
              }}
              onChange={handleChangeDynamicComissionPercent}
            />
            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {errorsSecurity.dynamicCommission}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Taxes %'
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                value={security.taxes}
                onChange={handleChangeTaxesPercent}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{errorsSecurity.taxes}</FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={security.frontingFee}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                inputProps={{
                  suffix: '%'
                }}
                onChange={handleChangeFrontingFeePercent}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {errorsSecurity.frontingFee}
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
              {errorsSecurity.idCReinsuranceCompany}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              autoFocus
              label='Premium per share'
              value={security.premiumPerShareAmount}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={handleChangePremiumPerShareAmount}
            />
            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {errorsSecurity.premiumPerShareAmount}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Reinsurance brokerage'
                value={security.brokerAgeAmount}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={handleChangeBrokerAgeAmount}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {errorsSecurity.brokerAgeAmount}
              </FormHelperText>
            </FormControl>
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={security.dynamicCommissionAmount}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              onChange={handleChangeDynamicComissionAmount}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {errorsSecurity.dynamicCommissionAmount}
            </FormHelperText>
          </FormControl>
          {isGross && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Taxes'
                value={security.taxesAmount}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={handleChangeTaxesAmount}
              />
              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {errorsSecurity.taxesAmount}
              </FormHelperText>
            </FormControl>
          )}
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={security.frontingFeeAmount}
                InputProps={{
                  inputComponent: NumericFormatCustom as any
                }}
                onChange={handleChangeFrontingFeeAmount}
              />

              <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
                {errorsSecurity.frontingFeeAmount}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>
        {/* Col-3 */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={security.netReinsurancePremium}
              InputProps={{
                inputComponent: NumericFormatCustom as any
              }}
              disabled={true}
            />

            <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
              {errorsSecurity.netReinsurancePremium}
            </FormHelperText>
          </FormControl>
          {frontingFeeEnabled && (security.share || security.premiumPerShareAmount) ? (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
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
                {errorsSecurity.idCRetroCedant}
              </FormHelperText>
            </FormControl>
          ) : (
            <></>
          )}
          {frontingFeeEnabled && (security.share || security.premiumPerShareAmount) ? (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
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
                {errorsSecurity.idCRetroCedantContact}
              </FormHelperText>
            </FormControl>
          ) : (
            <></>
          )}

          {frontingFeeEnabled && security.idCRetroCedantContact?.id && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  disabled
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={security.idCRetroCedantContact?.email ?? ''}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  disabled
                  size='small'
                  label='Contact phone'
                  value={security.idCRetroCedantContact?.phone ?? ''}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <InputLabel id='Contactcountry'>Contact country</InputLabel>
                <Select
                  id='outlined-Name'
                  label='Contact country'
                  value={security.idCRetroCedantContact?.idCCountry ?? ''}
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
