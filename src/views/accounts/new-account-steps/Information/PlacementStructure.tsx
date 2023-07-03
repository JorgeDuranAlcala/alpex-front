'use client'

import React, { useEffect, useState } from 'react'

//Hooks
import { useDeleteDiscountsById, useGetDiscountByIdAccount } from '@/hooks/accounts/discount'
import { useGetAllCurrencies } from 'src/hooks/catalogs/currency'
import { useGetAllTypeOfLimit } from 'src/hooks/catalogs/typeOfLimit'

// // ** MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

//Icon imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useExchangePair } from '@/hooks/exchange-rate/useExchangePair'
import { NumericFormat } from 'react-number-format'

// dtos

import { DiscountDto } from '@/services/accounts/dtos/discount.dto'
import { Subject } from 'rxjs'

interface PlacementStructureErrors {
  currencyError: boolean
  totalError: boolean
  reinsuranceBrokeragePError: boolean
  taxesPError: boolean
  frontingFeePError: boolean
  exchangeRateError: boolean
  limitError: boolean
  grossPremiumError: boolean
  reinsuranceBrokerageError: boolean
  taxesError: boolean
  frontingFeeError: boolean
  typeOfLimitError: boolean
  totalDiscountsError: boolean
  discountsErrors: boolean
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
    netPremiumWithTaxes: number
    netPremiumWithoutDiscounts: number
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
      netPremiumWithTaxes: number
      netPremiumWithoutDiscounts: number
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
  onValidationComplete: (valid: boolean, formName: string) => void
  onDiscountsChange: (discounts: DiscountDto[]) => void
  triggerSubject: Subject<void>
}

const PlacementStructure: React.FC<PlacementStructureProps> = ({
  placementStructure,
  setPlacementStructure,
  makeValidations,
  onValidationComplete,
  onDiscountsChange,
  triggerSubject
}) => {
  const { currencies } = useGetAllCurrencies()
  const { typesOfLimits } = useGetAllTypeOfLimit()

  const [reinsuranceBrokerageP, setReinsuranceBrokerageP] = useState<number>(placementStructure.reinsuranceBrokerage)
  const [taxesP, setTaxesP] = useState<number>()
  const [frontingFeeP, setFrontingFeeP] = useState<number>()
  const [netPremium, setNetPremium] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [netPremiumWithTaxes, setNetPremiumWithTaxes] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [netPremiumWithoutDiscounts, setNetPremiumWithoutDiscounts] = useState<number>()
  const [grossPremium, setGrossPremium] = useState<number>(placementStructure.grossPremium)
  const [reinsuranceBrokerage, setReinsuranceBrokerage] = useState<number>()
  const [taxes, setTaxes] = useState<number>()
  const [frontingFee, setFrontingFee] = useState<number>()
  const [taxesChecked, setTaxesChecked] = useState(false)
  const [frontingChecked, setFrontingChecked] = useState(false)

  //handle discounts
  const [discountCounter, setDiscountCounter] = useState(1)
  const [totalDiscountsError, setTotalDiscountsError] = useState(false)
  const [discountsErrorsIndex, setDiscountsErrorsIndex] = useState<number[]>([])
  const [discount, setDiscount] = useState<DiscountDto>({
    id: 0,
    percentage: 0,
    amount: 0,
    idAccount: 0
  })

  const { discounts, getDiscounts, setDiscounts } = useGetDiscountByIdAccount()
  const { deleteDiscountsById } = useDeleteDiscountsById()

  // const [valid, setValid] = useState(false)
  const [errors, setErrors] = useState<PlacementStructureErrors>({
    currencyError: false,
    totalError: false,
    reinsuranceBrokeragePError: false,
    taxesPError: false,
    frontingFeePError: false,
    exchangeRateError: false,
    limitError: false,
    grossPremiumError: false,
    reinsuranceBrokerageError: false,
    taxesError: false,
    frontingFeeError: false,
    typeOfLimitError: false,
    totalDiscountsError: false,
    discountsErrors: false
  })
  const { setPair, exchangeRate, pair } = useExchangePair()

  const setDiscountsData = async () => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    const discountRes = await getDiscounts(idAccountCache)
    setDiscounts(discountRes)
  }

  const calculate = async (type = 'any', value?: string | number) => {
    let grossPremiumc: number = grossPremium || 0
    let reinsuranceBrokeragePc: number = reinsuranceBrokerageP || 0
    let reinsuranceBrokeragec: number = reinsuranceBrokerage || 0
    let taxesPc: number = taxesP || 0
    let taxesc: number = taxes || 0
    let frontingFeePc: number = frontingFeeP || 0
    let frontingFeec: number = frontingFee || 0
    let updatedDiscounts = discounts.map(discount => {
      const newAmount = (discount.percentage / 100) * grossPremiumc

      return { ...discount, amount: newAmount }
    })
    switch (type) {
      case 'reinsuranceBrokerageP': {
        if (typeof value == 'number') {
          reinsuranceBrokeragePc = value
          const result = (grossPremiumc * reinsuranceBrokeragePc) / 100
          reinsuranceBrokeragec = isFinite(result) ? result : 0
          handleNumericInputChange(value, 'reinsuranceBrokerageP')
        } else {
          reinsuranceBrokeragec = 0
          reinsuranceBrokeragePc = 0
        }

        break
      }
      case 'reinsuranceBrokerage': {
        if (typeof value == 'number') {
          reinsuranceBrokeragec = value
          const result = (reinsuranceBrokeragec * 100) / grossPremiumc
          reinsuranceBrokeragePc = isFinite(result) ? result : 0
          handleNumericInputChange(value, 'reinsuranceBrokerageP')
        } else {
          reinsuranceBrokeragePc = 0
          reinsuranceBrokeragec=0
        }

        break
      }
      case 'taxes': {
        if (typeof value == 'number') {
          taxesc = value
          const result = (taxesc * 100) / grossPremiumc
          taxesPc = isFinite(result) ? result : 0
          handleNumericInputChange(value, 'taxes')
        } else {
          taxesPc = 0
        }

        break
      }
      case 'taxesP': {
        if (typeof value == 'number') {
          taxesPc = value
          const result = (grossPremiumc * taxesPc) / 100
          taxesc = isFinite(result) ? result : 0
          handleNumericInputChange(value, 'taxesP')
        } else {
          taxesc = 0
          taxesPc = 0
        }

        break
      }
      case 'frontingFeeP': {

        if(typeof value == 'number' ){
        frontingFeePc = value
        const result = (grossPremiumc * frontingFeePc  )/ 100
        frontingFeec = isFinite(result) ? result : 0

        handleNumericInputChange(value, 'frontingFeeP')

      }else{
        frontingFeec = 0
        frontingFeePc = 0
      }
        break
      }
      case 'frontingFee': {
        if (typeof value == 'number') {
          const result = (value * 100) / grossPremiumc
          frontingFeePc = isFinite(result) ? result : 0
          frontingFeec = value
          handleNumericInputChange(value, 'frontingFee')
        } else {
          frontingFeePc = 0
          frontingFeec = 0
        }
        break
      }
      case 'grossPremium': {
        if(typeof value == 'number' ){
        grossPremiumc=value
        const resultBrokerage = grossPremiumc * (reinsuranceBrokeragePc / 100)
        const resultTaxes = grossPremiumc * (taxesPc / 100)
        const resultFronting = grossPremiumc * (frontingFeePc / 100)

        reinsuranceBrokeragec = isFinite(resultBrokerage) ? resultBrokerage : 0
        taxesc = isFinite(resultTaxes) ? resultTaxes : 0
        frontingFeec = isFinite(resultFronting) ? resultFronting : 0

        updatedDiscounts = discounts.map(discount => {
          const newAmount = (discount.percentage / 100) * grossPremiumc

          return { ...discount, amount: newAmount }
        })

        }else{
          grossPremiumc= 0
          reinsuranceBrokeragec = 0
          taxesc = 0
          frontingFeec = 0
        }

        break
      }
      default:
        break
    }

    const reinsuranceBrokerageTotalFinal = reinsuranceBrokeragec ? reinsuranceBrokeragec : 0
    const taxesFinal = taxesc ? taxesc : 0
    const frontingFeeTotalFinal = frontingFeec ? frontingFeec : 0
    const discountsAmount = updatedDiscounts.reduce((sum, discount) => sum + discount.amount, 0) ?? 0
    const netPremiumc =
      grossPremiumc - reinsuranceBrokerageTotalFinal - taxesFinal - frontingFeeTotalFinal - discountsAmount
    const netPremiumWithTaxesc =
      grossPremiumc - reinsuranceBrokerageTotalFinal - frontingFeeTotalFinal - discountsAmount
    const netPremiumWithoutDiscountsc = grossPremiumc - reinsuranceBrokerageTotalFinal
    setFrontingFee(frontingFeec)
    setFrontingFeeP(frontingFeePc)
    setTaxesP(taxesPc)
    setTaxes(taxesc)
    setGrossPremium(grossPremiumc)
    setDiscounts(updatedDiscounts)
    setReinsuranceBrokerage(reinsuranceBrokeragec)
    setReinsuranceBrokerageP(reinsuranceBrokeragePc)
    setNetPremiumWithoutDiscounts(netPremiumWithoutDiscountsc)
    setNetPremiumWithTaxes(netPremiumWithTaxesc)
    setNetPremium(netPremiumc)

    // if (discounts.length > 0) {
    //   setTotalDiscountsError(discountValidation)
    // }

    setPlacementStructure({
      ...placementStructure,
      reinsuranceBrokerageP: reinsuranceBrokeragePc ?? 0,
      reinsuranceBrokerage: reinsuranceBrokeragec ?? 0,
      taxes: taxesc ?? 0,
      taxesP: taxesPc ?? 0,
      frontingFeeP: frontingFeePc ?? 0,
      frontingFee: frontingFeec ?? 0,
      grossPremium: grossPremiumc ?? 0,
      netPremium: netPremiumc ?? 0,
      netPremiumWithTaxes: netPremiumWithTaxesc ?? 0,
      netPremiumWithoutDiscounts: netPremiumWithoutDiscountsc ?? 0
    })
  }

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    const target = e.target
    const value = target.value
    setPair({ targetCurrency: value, baseCurrency: 'USD' })
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

  const handleTaxesChange = () => {
    if (!taxesChecked === false) {
      setTaxesP(0)
      setTaxes(0)
      calculate('taxesP', 0)
      calculate('taxes', 0)
      setPlacementStructure({
        ...placementStructure,
        taxes: 0,
        taxesP: 0
      })
    }
    setTaxesChecked(!taxesChecked)
  }

  const handleFrontingChange = () => {
    if (!frontingChecked === false) {
      setFrontingFeeP(0)
      setFrontingFee(0)
      calculate('frontingFeeP', 0)
      calculate('frontingFee', 0)
      setPlacementStructure({
        ...placementStructure,
        frontingFee: 0,
        frontingFeeP: 0
      })
    }
    setFrontingChecked(!frontingChecked)
  }

  const addDiscount = () => {
    const newDiscount = { id: 0, percentage: 0, amount: 0, idAccount: 0 }
    const newDiscounts = [...discounts, newDiscount]
    setDiscounts(newDiscounts)
    setDiscountCounter(discountCounter + 1)
  }

  const deleteDiscount = async (index: number) => {
    const discountToDelete = discounts[index].id
    const newDiscounts = [...discounts]
    newDiscounts.splice(index, 1)
    setDiscounts(newDiscounts)

    const updatedDiscounts = newDiscounts.map(discount => {
      const updatedDiscount = { ...discount }

      return updatedDiscount
    })

    setDiscounts(updatedDiscounts)
    setDiscountCounter(updatedDiscounts.length + 1)

    if (index === discounts.length - 1) {
      // Si se eliminó el último descuento, actualizamos el estado "discount" para mostrar el último descuento en el formulario
      setDiscount(updatedDiscounts[index - 1] || { id: 0, percentage: 0, amount: 0, idAccount: 0 })
    }

    if (discountToDelete) {
      await deleteDiscountsById(discountToDelete)
    }
  }

  const updateDiscountInArray = (updatedDiscount: DiscountDto, index: number) => {
    setDiscounts(state => {
      const newState = [...state]
      newState[index] = updatedDiscount

      return newState
    })
  }

  const calculateDiscountP = (index: number, disount: DiscountDto) => {
    const total = grossPremium
    const percentage = (disount.amount / total) * 100
    const updatedDiscount = { ...disount, percentage }
    setDiscount(updatedDiscount)
    updateDiscountInArray(updatedDiscount, index)
  }

  const calculateDiscount = (index: number, disount: DiscountDto) => {
    const total = grossPremium
    const amount = (disount.percentage / 100) * total
    const updatedDiscount = { ...disount, amount }
    setDiscount(updatedDiscount)
    updateDiscountInArray(updatedDiscount, index)
  }

  const validations = () => {
    const newErrors: PlacementStructureErrors = {
      currencyError: placementStructure.currency === '',
      totalError: placementStructure.total === 0,
      reinsuranceBrokeragePError: placementStructure.reinsuranceBrokerageP === 0,
      taxesPError: taxesChecked && placementStructure.taxesP === 0,
      frontingFeePError: frontingChecked && placementStructure.frontingFeeP === 0,
      exchangeRateError: placementStructure.exchangeRate === 0,
      limitError: placementStructure.limit === 0,
      grossPremiumError: placementStructure.grossPremium === 0,
      reinsuranceBrokerageError: placementStructure.reinsuranceBrokerage === 0,
      taxesError: taxesChecked && (placementStructure.taxes === undefined || placementStructure.taxes === 0),
      frontingFeeError:
        frontingChecked && (placementStructure.frontingFee === undefined || placementStructure.frontingFee === 0),
      typeOfLimitError: placementStructure.typeOfLimit === '',
      totalDiscountsError: discountValidation(),
      discountsErrors:
        discounts.length > 0 && discounts.some(discount => discount.percentage === 0 || discount.amount === 0)
    }

    if (discounts.length > 0) {
      const newDiscountErrors: number[] = []

      discounts.forEach((discount, index) => {
        if (discount.percentage === 0 || discount.amount === 0) {
          newDiscountErrors.push(index)
        }
      })
      setDiscountsErrorsIndex(newDiscountErrors) // setea un arreglo de los discounts con error
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      // enviar formulario si no hay errores
      onValidationComplete(true, 'placementStructure')

      // isValidForm(true)
    } else {
      onValidationComplete(false, 'placementStrcture')
    }
  }

  const discountValidation = () => {
    const discountPercentages = discounts.reduce((sum, discount) => sum + discount.percentage, 0) ?? 0
    const discountAmount = discounts.reduce((sum, discount) => sum + discount.amount, 0) ?? 0

    const totalPercentages = discountPercentages + placementStructure.taxesP + placementStructure.frontingFeeP
    const totalAmount = discountAmount + placementStructure.taxes + placementStructure.frontingFee

    if (totalPercentages > 100 || totalAmount > grossPremium) return true
    else return false
  }

  const getErrorMessage = (name: keyof PlacementStructureErrors) => {
    return errors[name] ? 'This field is required' : ''
  }

  useEffect(() => {
    const subscription = triggerSubject.subscribe(() => {
      setDiscountsData()
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSubject])

  // useEffect(() => {
  //   // calculate()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   reinsuranceBrokerageP,
  //   taxesP,
  //   frontingFeeP,
  //   grossPremium,
  //   reinsuranceBrokerage,
  //   taxes,
  //   frontingFee,
  //   discount,
  //   setDiscount
  // ])

  useEffect(() => {
    setGrossPremium(placementStructure.grossPremium)
    setTaxes(placementStructure.taxes)
    setTaxesP(placementStructure.taxesP)
    setFrontingFee(placementStructure.frontingFee)
    setFrontingFeeP(placementStructure.frontingFeeP)
    setReinsuranceBrokerageP(placementStructure.reinsuranceBrokerageP)
    setReinsuranceBrokerage(placementStructure.reinsuranceBrokerage)

    // setNetPremium(placementStructure.netPremium)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementStructure.grossPremium])

  useEffect(() => {
    if (exchangeRate) {
      setPlacementStructure({
        ...placementStructure,
        currency: pair.targetCurrency,
        exchangeRate: exchangeRate.conversionRate || 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate])

  React.useEffect(() => {
    onDiscountsChange(discounts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discounts])
  React.useEffect(() => {
    setTotalDiscountsError(discountValidation)
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount])

  React.useEffect(() => {
    setTotalDiscountsError(discountValidation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxesP, taxes, frontingFee, frontingFeeP, grossPremium])

  React.useEffect(() => {
    if (makeValidations) {
      validations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeValidations])

  React.useEffect(() => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    if (idAccountCache) {
      setDiscountsData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Controla la carga inicial de los checkBox
  React.useEffect(() => {
    if (placementStructure.typeOfLimit !== 0) {
      const taxesCheck = placementStructure.taxesP === 0 ? false : true
      const frontingFeeCheck = placementStructure.frontingFeeP === 0 ? false : true

      setTaxesChecked(taxesCheck)
      setFrontingChecked(frontingFeeCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementStructure.typeOfLimit])

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
              {currencies
                ?.filter((obj, index, self) => index === self.findIndex(o => o.code === obj.code))
                .map(currency => {
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
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} className='show-on-mobile'>
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
              suffix={'%'}
              decimalScale={2}
              variant='outlined'
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('reinsuranceBrokerageP', value.floatValue)
                } else {
                  calculate('reinsuranceBrokerageP', '')
                }
              }}
              error={errors.reinsuranceBrokeragePError}
              helperText={getErrorMessage('reinsuranceBrokeragePError')}
            />
          </FormControl>
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} className='hide-on-mobile'>
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
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('grossPremium', value.floatValue)
                } else {
                  calculate('grossPremium', '')
                }
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
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('reinsuranceBrokerage', value.floatValue)
                } else {
                  calculate('reinsuranceBrokerage', '')
                }
              }}
              error={errors.reinsuranceBrokerageError}
              helperText={getErrorMessage('reinsuranceBrokerageError')}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
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

      <div className='form-wrapper'>
        <div className='form-col'>
          <div className='form-row'>
            <div className='row-title'>Taxes</div>
            <div className='switch-btn-container'>
              <Switch checked={taxesChecked} onChange={handleTaxesChange} color='primary' />
            </div>
          </div>
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
              suffix={'%'}
              decimalScale={2}
              variant='outlined'
              disabled={taxesChecked ? false : true}
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('taxesP', value.floatValue)
                } else {
                  calculate('taxesP', '')
                }
              }}
              error={taxesChecked && (errors.taxesPError || errors.totalDiscountsError || totalDiscountsError)}
              helperText={
                taxesChecked && errors.taxesPError
                  ? 'This field must be greater than 0'
                  : taxesChecked && errors.totalDiscountsError
                  ? 'The total discounts percentage should be less than 100%'
                  : taxesChecked && totalDiscountsError
                  ? 'The total discounts percentage should be less than 100%'
                  : ''
              }
            />
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
              disabled={taxesChecked ? false : true}
              decimalScale={2}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}

              onValueChange={value => {
                if (value.floatValue) {
                  calculate('taxes',value.floatValue)

                }else{
                  calculate('taxes',0)
                }
              }}
              onFocus={e => {
                if (e.target.value === '0') {
                  e.target.value = '';
                }
              }}
              error={taxesChecked && (errors.taxesError || errors.totalDiscountsError || totalDiscountsError)}
              helperText={
                taxesChecked && errors.taxesError
                  ? 'This field must be greater than 0'
                  : taxesChecked && errors.totalDiscountsError
                  ? 'The total amount of discounts should be less than Gross Premium'
                  : taxesChecked && totalDiscountsError
                  ? 'The total amount of discounts should be less than Gross Premium'
                  : ''
              }
            />
          </FormControl>
        </div>

        <div className='form-col'>
          <div className='form-row'>
            <div className='row-title'>Fronting fee</div>
            <div className='switch-btn-container'>
              <Switch checked={frontingChecked} onChange={handleFrontingChange} color='primary' />
            </div>
          </div>
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
              suffix={'%'}
              maxRows={4}
              decimalScale={2}
              variant='outlined'
              disabled={frontingChecked ? false : true}
              isAllowed={values => {
                const { floatValue } = values

                return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('frontingFeeP', value.floatValue)
                } else {
                  calculate('frontingFeeP', '')
                }
              }}
              error={frontingChecked && (errors.frontingFeePError || errors.totalDiscountsError || totalDiscountsError)}
              helperText={
                frontingChecked && errors.frontingFeePError
                  ? 'This field must be greater than 0'
                  : frontingChecked && errors.totalDiscountsError
                  ? 'The total discounts percentage should be less than 100%'
                  : frontingChecked && totalDiscountsError
                  ? 'The total discounts percentage should be less than 100%'
                  : ''
              }
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
              disabled={frontingChecked ? false : true}
              decimalScale={2}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = grossPremium || 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('frontingFee', value.floatValue)
                } else {
                  calculate('frontingFee', 0)
                }
              }}
              error={frontingChecked && (errors.frontingFeeError || errors.totalDiscountsError || totalDiscountsError)}
              helperText={
                frontingChecked && errors.frontingFeeError
                  ? 'This field must be greater than 0'
                  : frontingChecked && errors.totalDiscountsError
                  ? 'The total amount of discounts should be less than Gross Premium'
                  : frontingChecked && totalDiscountsError
                  ? 'The total amount of discounts should be less than Gross Premium'
                  : ''
              }
            />
          </FormControl>
        </div>

        {discounts.map((discount, index) => (
          <div className='form-col' key={index}>
            <div className='form-row'>
              <div className='row-title'>Other Discount</div>

              <div
                className='delete-discount'
                onClick={() => {
                  deleteDiscount(index)
                }}
              >
                <Icon icon='mdi:delete-outline' />
              </div>
            </div>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <NumericFormat
                name='discountP'
                value={discount.percentage}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='discount-p'
                label='Other discount %'
                suffix={'%'}
                maxRows={4}
                decimalScale={2}
                variant='outlined'
                isAllowed={values => {
                  const { floatValue } = values

                  return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
                }}
                onValueChange={value => {
                  if (value.floatValue) {
                    const updatedDiscount = { ...discount, percentage: value.floatValue }
                    calculateDiscount(index, updatedDiscount)
                  } else {
                    calculateDiscount(index, { ...discount, percentage: 0 })
                  }
                }}
                error={totalDiscountsError || discountsErrorsIndex.includes(index)}
                helperText={
                  totalDiscountsError
                    ? 'The total discounts percentage should be less than 100%'
                    : discountsErrorsIndex.includes(index)
                    ? 'This field must be greater than 0'
                    : ''
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <NumericFormat
                name='discount'
                value={discount.amount}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='discount'
                label='Other discount'
                prefix='$'
                multiline
                variant='outlined'
                decimalScale={2}
                isAllowed={values => {
                  const { floatValue } = values
                  const upLimit = grossPremium || 0

                  return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                }}
                onValueChange={value => {
                  if (value.floatValue) {
                    const updatedDiscount = { ...discount, amount: value.floatValue }
                    calculateDiscountP(index, updatedDiscount)
                  } else {
                    calculateDiscountP(index, { ...discount, amount: 0 })
                  }
                }}
                error={totalDiscountsError || discountsErrorsIndex.includes(index)}
                helperText={
                  totalDiscountsError
                    ? 'The total amount of discounts should be less than Gross Premium'
                    : discountsErrorsIndex.includes(index)
                    ? 'This field must be greater than 0'
                    : ''
                }
              />
            </FormControl>
          </div>
        ))}

        <div className='discount-btn'>
          <Button className='create-contact-btn' onClick={addDiscount}>
            ADD DISCOUNT
            <div className='btn-icon'>
              <Icon icon='mdi:plus-circle-outline' />
            </div>
          </Button>
        </div>
      </div>

      <div className='form-wrapper'>
        <div className='form-row'>
          <div className='row-title'>Results</div>
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='premiumDiscounts'
              value={netPremiumWithoutDiscounts}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              disabled
              prefix='$'
              id='premium discounts'
              label='Premium without discounts'
              multiline
              variant='outlined'
              decimalScale={2}
            />
          </FormControl>
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name='premiumTaxes'
              value={netPremiumWithTaxes}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              disabled
              prefix='$'
              id='premium-taxes'
              label='Net Premium with Taxes'
              multiline
              variant='outlined'
              decimalScale={2}
            />
          </FormControl>
        </div>

        <div className='form-col'>
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
      </div>
    </>
  )
}
export default PlacementStructure
