'use client'

import React, { useEffect, useState } from 'react'

//Hooks
import { useGetAllCurrencies } from 'src/hooks/catalogs/currency'
import { useGetAllTypeOfLimit } from 'src/hooks/catalogs/typeOfLimit'

// // ** MUI Imports
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { useExchangePair } from '@/hooks/exchange-rate/useExchangePair'
import { NumericFormat } from 'react-number-format'

interface PlacementStructureErrors {
  currencyError: boolean
  totalError: boolean
  reinsuranceBrokeragePError: boolean
  taxesPError: boolean
  exchangeRateError: boolean
  limitError: boolean
  grossPremiumError: boolean
  reinsuranceBrokerageError: boolean
  taxesError: boolean
  typeOfLimitError: boolean
}

export type PlacementStructureProps = {
  placementStructure: {
    currency: string
    total: number
    sir: number
    reinsuranceBrokerageP: number
    taxesP: number
    frontingFeeP: number
    netPremium: number
    exchangeRate: number
    limit: number
    grossPremium: number
    reinsuranceBrokerage: number
    taxes: number
    frontingFee: number
    attachmentPoint: number
    typeOfLimit: string | number | null
  }
  setPlacementStructure: React.Dispatch<
    React.SetStateAction<{
      currency: string
      total: number
      sir: number
      reinsuranceBrokerageP: number
      taxesP: number
      frontingFeeP: number
      netPremium: number
      exchangeRate: number
      limit: number
      grossPremium: number
      reinsuranceBrokerage: number
      taxes: number
      frontingFee: number
      attachmentPoint: number
      typeOfLimit: string | number | null
    }>
  >
  makeValidations: boolean
  resetMakeValidations: () => void
  isValidForm: (valid: boolean) => void
}

const PlacementStructure: React.FC<PlacementStructureProps> = ({
  placementStructure,
  setPlacementStructure,
  makeValidations,
  isValidForm
}) => {
  const { currencies } = useGetAllCurrencies()
  const { typesOfLimits } = useGetAllTypeOfLimit()

  const [reinsuranceBrokerageP, setReinsuranceBrokerageP] = useState<number>(placementStructure.reinsuranceBrokerage)
  const [taxesP, setTaxesP] = useState<number>()
  const [frontingFeeP, setFrontingFeeP] = useState<number>()
  const [netPremium, setNetPremium] = useState<number>()
  const [grossPremium, setGrossPremium] = useState<number>(placementStructure.grossPremium)
  const [reinsuranceBrokerage, setReinsuranceBrokerage] = useState<number>()
  const [taxes, setTaxes] = useState<number>()
  const [frontingFee, setFrontingFee] = useState<number>()
  const [errors, setErrors] = useState<PlacementStructureErrors>({
    currencyError: false,
    totalError: false,
    reinsuranceBrokeragePError: false,
    taxesPError: false,
    exchangeRateError: false,
    limitError: false,
    grossPremiumError: false,
    reinsuranceBrokerageError: false,
    taxesError: false,
    typeOfLimitError: false
  })
  const { setPair, exchangeRate, pair } = useExchangePair()
  const calculate = async (type = 'any') => {
    const grossPremiumc: number = grossPremium || 0
    const reinsuranceBrokeragePc: number = reinsuranceBrokerageP || 0
    const reinsuranceBrokeragec: number = reinsuranceBrokerage || 0
    const taxesPc: number = taxesP || 0
    const taxesc: number = taxes || 0
    const frontingFeePc: number = frontingFeeP || 0
    const frontingFeec: number = frontingFee || 0

    switch (type) {
      case 'reinsuranceBrokerageP': {
        const result = grossPremiumc * (reinsuranceBrokeragePc / 100)
        setReinsuranceBrokerage(isFinite(result) ? result : 0)

        break
      }
      case 'reinsuranceBrokerage': {
        const result = (reinsuranceBrokeragec * 100) / grossPremiumc

        setReinsuranceBrokerageP(isFinite(result) ? result : 0)
        break
      }
      case 'taxes': {
        const result = (taxesc * 100) / grossPremiumc
        setTaxesP(isFinite(result) ? result : 0)
        break
      }
      case 'taxesP': {
        const result = grossPremiumc * (taxesPc / 100)
        setTaxes(isFinite(result) ? result : 0)
        break
      }
      case 'frontingFeeP': {
        const result = grossPremiumc * (frontingFeePc / 100)
        setFrontingFee(isFinite(result) ? result : 0)
        break
      }
      case 'frontingFee': {
        const result = (frontingFeec * 100) / grossPremiumc
        setFrontingFeeP(isFinite(result) ? result : 0)
        break
      }
      case 'grossPremium': {
        console.log({ taxesPc, frontingFeePc })

        const resultBrokerage = grossPremiumc * (reinsuranceBrokeragePc / 100)
        const resultTaxes = grossPremiumc * (taxesPc / 100)
        const resultFronting = grossPremiumc * (frontingFeePc / 100)

        setReinsuranceBrokerageP(reinsuranceBrokeragePc)
        setTaxes(taxesP)
        setFrontingFee(frontingFeePc)
        setReinsuranceBrokerage(isFinite(resultBrokerage) ? resultBrokerage : 0)
        setTaxes(isFinite(resultTaxes) ? resultTaxes : 0)
        setFrontingFee(isFinite(resultFronting) ? resultFronting : 0)
        break
      }
      default:
        break
    }
    const reinsuranceBrokerageTotalFinal = reinsuranceBrokerage ? reinsuranceBrokerage : 0
    const taxesFinal = taxes ? taxes : 0
    const frontingFeeTotalFinal = frontingFee ? frontingFee : 0
    setNetPremium(grossPremiumc - reinsuranceBrokerageTotalFinal - taxesFinal - frontingFeeTotalFinal)
    setPlacementStructure({
      ...placementStructure,
      reinsuranceBrokerageP: reinsuranceBrokerageP ?? 0,
      reinsuranceBrokerage: reinsuranceBrokerage ?? 0,
      taxes: taxes ?? 0,
      taxesP: taxesP ?? 0,
      frontingFeeP: frontingFeeP ?? 0,
      frontingFee: frontingFee ?? 0,
      grossPremium: grossPremium ?? 0,
      netPremium: netPremium ?? 0
    })
  }

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    const target = e.target
    const value = target.value
    setPair({ baseCurrency: value, targetCurrency: 'USD' })
  }

  const handleNumericInputChange = (value: any, name: string) => {
    setPlacementStructure({ ...placementStructure, [name]: value })
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setPlacementStructure({
      ...placementStructure,
      [name]: value
    })
  }

  const validations = () => {
    const newErrors: PlacementStructureErrors = {
      currencyError: placementStructure.currency === '',
      totalError: placementStructure.total === 0,
      reinsuranceBrokeragePError: placementStructure.reinsuranceBrokerageP === 0,
      taxesPError: placementStructure.taxesP === 0,
      exchangeRateError: placementStructure.exchangeRate === 0,
      limitError: placementStructure.limit === 0,
      grossPremiumError: placementStructure.grossPremium === 0,
      reinsuranceBrokerageError: placementStructure.reinsuranceBrokerage === 0,
      taxesError: placementStructure.taxes === undefined,
      typeOfLimitError: placementStructure.typeOfLimit === ''
    }
    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      // enviar formulario si no hay errores
      isValidForm(true)
    }
  }

  const getErrorMessage = (name: keyof PlacementStructureErrors) => {
    return errors[name] ? 'This field is required' : ''
  }

  useEffect(() => {
    if (makeValidations) {
      validations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeValidations, placementStructure])

  useEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reinsuranceBrokerageP, taxesP, frontingFeeP, netPremium, grossPremium, reinsuranceBrokerage, taxes, frontingFee])

  useEffect(() => {
    setGrossPremium(placementStructure.grossPremium)
    setTaxes(placementStructure.taxes)
    setTaxesP(placementStructure.taxesP)
    setFrontingFee(placementStructure.frontingFee)
    setFrontingFeeP(placementStructure.frontingFeeP)
    setReinsuranceBrokerageP(placementStructure.reinsuranceBrokerageP)
    setReinsuranceBrokerage(placementStructure.reinsuranceBrokerage)
    setNetPremium(placementStructure.netPremium)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementStructure.grossPremium])
  useEffect(() => {
    if (exchangeRate) {
      setPlacementStructure({
        ...placementStructure,
        currency: pair.baseCurrency,
        exchangeRate: exchangeRate.conversionRate || 0
      })
    }
  }, [exchangeRate])

  return (
    <>
      <div className='title'>Placement Structure</div>
      <div className='form-wrapper'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.currencyError}>
            <InputLabel>Currency</InputLabel>
            <Select
              name='currency'
              id='currency'
              label='Currency'
              value={placementStructure.currency}
              onChange={handleCurrencyChange}
              labelId='currency'
            >
              {currencies?.map(currency => {
                return (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                )
              })}
            </Select>
            {errors.currencyError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('currencyError')}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='total'
              value={placementStructure.total}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='filled-multiline-flexible'
              label='Total values'
              multiline
              prefix={'$'}
              decimalScale={2}
              variant='outlined'
              error={errors.totalError}
              helperText={getErrorMessage('totalError')}
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'total')
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='sir'
              value={placementStructure.sir}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='sir'
              label='SIR'
              multiline
              prefix={'$'}
              decimalScale={2}
              variant='outlined'
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'sir')
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='reinsuranceBrokerageP'
              value={reinsuranceBrokerageP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='reinsurance-brokerage'
              label='Reinsurance brokerage %'
              multiline
              prefix={'%'}
              decimalScale={2}
              variant='outlined'
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onBlur={() => calculate('reinsuranceBrokerageP')}
              onValueChange={value => {
                setReinsuranceBrokerageP(value.floatValue ?? 0)
                handleNumericInputChange(value.floatValue, 'reinsuranceBrokerageP')
              }}
              error={errors.reinsuranceBrokeragePError}
              helperText={getErrorMessage('reinsuranceBrokeragePError')}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='taxesP'
              value={taxesP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='taxes-p'
              label='Taxes %'
              multiline
              prefix={'%'}
              decimalScale={2}
              variant='outlined'
              onBlur={() => calculate('taxesP')}
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onValueChange={value => {
                setTaxesP(value.floatValue)
                handleNumericInputChange(value.floatValue, 'taxesP')
              }}
              error={errors.taxesPError}
              helperText={getErrorMessage('taxesPError')}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='frontingFeeP'
              value={frontingFeeP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='fronting-fee-p'
              label='Fronting fee %'
              multiline
              prefix={'%'}
              maxRows={4}
              decimalScale={2}
              variant='outlined'
              onBlur={() => calculate('frontingFeeP')}
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onValueChange={value => {
                setFrontingFeeP(value.floatValue)
                handleNumericInputChange(value.floatValue, 'frontingFeeP')
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='netPremium'
              value={netPremium}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              disabled
              prefix='$'
              id='net-premium'
              label='Net premium'
              multiline
              variant='outlined'
              decimalScale={2}
              onValueChange={value => {
                setNetPremium(value.floatValue)
                handleNumericInputChange(value.floatValue, 'netPremium')
              }}
            />
          </FormControl>
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='exchangeRate'
              value={placementStructure.exchangeRate}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='exchange-rate'
              label='Exchange rate'
              multiline
              variant='outlined'
              prefix=''
              decimalScale={2}
              error={errors.exchangeRateError}
              helperText={getErrorMessage('exchangeRateError')}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='limit'
              value={placementStructure.limit}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='limit'
              label='Limit'
              multiline
              variant='outlined'
              prefix='$'
              decimalScale={2}
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'limit')
              }}
              error={errors.limitError}
              helperText={getErrorMessage('limitError')}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='grossPremium'
              prefix='$'
              value={grossPremium}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='gross-premium'
              label='Gross Premium'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('grossPremium')}
              onValueChange={value => {
                setGrossPremium(value.floatValue ?? 0)
                handleNumericInputChange(value.floatValue, 'grossPremium')
              }}
              error={errors.grossPremiumError}
              helperText={getErrorMessage('grossPremiumError')}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='reinsuranceBrokerage'
              value={reinsuranceBrokerage}
              allowLeadingZeros
              prefix='$'
              thousandSeparator=','
              customInput={TextField}
              id='reinsurance-brokerage'
              label='Reinsurance Brokerage'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('reinsuranceBrokerage')}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                setReinsuranceBrokerage(value.floatValue)
                handleNumericInputChange(value.floatValue, 'reinsuranceBrokerage')
              }}
              error={errors.reinsuranceBrokerageError}
              helperText={getErrorMessage('reinsuranceBrokerageError')}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='taxes'
              value={taxes}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='taxes'
              label='Taxes'
              multiline
              prefix='$'
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('taxes')}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                setTaxes(value.floatValue)
                handleNumericInputChange(value.floatValue, 'taxes')
              }}
              error={errors.taxesError}
              helperText={getErrorMessage('taxesError')}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='frontingFee'
              value={frontingFee}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='fornting-fee'
              label='Fronting fee'
              prefix='$'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('frontingFee')}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                setFrontingFee(value.floatValue)
                handleNumericInputChange(value.floatValue, 'frontingFee')
              }}
            />
          </FormControl>
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='attachmentPoint'
              value={placementStructure.attachmentPoint}
              prefix='$'
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='attachment-point'
              label='Attachment point'
              multiline
              variant='outlined'
              decimalScale={2}
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'attachmentPoint')
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.typeOfLimitError}>
            <InputLabel>Type of limit</InputLabel>
            <Select
              name='typeOfLimit'
              label='Type of Limit'
              value={String(placementStructure.typeOfLimit)}
              onChange={handleSelectChange}
              labelId='type-of-limit'
            >
              {typesOfLimits && typesOfLimits.length > 0 ? (
                typesOfLimits?.map(limit => {
                  return (
                    <MenuItem key={limit.id} value={limit.id}>
                      {limit.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
            {errors.typeOfLimitError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('typeOfLimitError')}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
    </>
  )
}
export default PlacementStructure
