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

interface DiscountInputs {
  id: number
  percentage: number | string | undefined
  amount: number | string | undefined
  idAccount: number
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
  setUpdateInfo: (valid: boolean) => void
}

const PlacementStructure: React.FC<PlacementStructureProps> = ({
  placementStructure,
  setPlacementStructure,
  makeValidations,
  onValidationComplete,
  onDiscountsChange,
  triggerSubject,
  setUpdateInfo,
}) => {
  const { currencies } = useGetAllCurrencies()
  const { typesOfLimits } = useGetAllTypeOfLimit()

  const [reinsuranceBrokerageP, setReinsuranceBrokerageP] = useState<number | string>(
    placementStructure.reinsuranceBrokerage
  )
  const [taxesP, setTaxesP] = useState<number | string>()
  const [frontingFeeP, setFrontingFeeP] = useState<number | string>()
  const [netPremium, setNetPremium] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [netPremiumWithTaxes, setNetPremiumWithTaxes] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [netPremiumWithoutDiscounts, setNetPremiumWithoutDiscounts] = useState<number>()
  const [grossPremium, setGrossPremium] = useState<number | string>(placementStructure.grossPremium)
  const [reinsuranceBrokerage, setReinsuranceBrokerage] = useState<number | string>()
  const [taxes, setTaxes] = useState<number | string>()
  const [frontingFee, setFrontingFee] = useState<number | string>()
  const [taxesChecked, setTaxesChecked] = useState(false)
  const [frontingChecked, setFrontingChecked] = useState(false)

  //handle discounts
  const [discountCounter, setDiscountCounter] = useState(1)
  const [totalDiscountsError, setTotalDiscountsError] = useState(false)
  const [discountsErrorsIndex, setDiscountsErrorsIndex] = useState<number[]>([])
  const [discount, setDiscount] = useState<DiscountInputs>({
    id: 0,
    percentage: 0,
    amount: 0,
    idAccount: 0
  })

  const { discounts, getDiscounts, setDiscounts } = useGetDiscountByIdAccount()
  const [discountInputs, setDiscountInputs] = useState<DiscountInputs[]>([])
  const { deleteDiscountsById } = useDeleteDiscountsById()

  // const [valid, setValid] = useState(false)
  const [singleValidation, setSingleValidation] = useState(false)
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
    setDiscountInputs(discountRes)
  }

  const calculate = async (type = 'any', value?: string | number) => {
    let grossPremiumc: number = typeof grossPremium == 'number' ? grossPremium : 0
    let grossPremiumTemp: number | string | undefined = grossPremium

    let reinsuranceBrokeragePc: number = typeof reinsuranceBrokerageP == 'number' ? reinsuranceBrokerageP : 0
    let reinsuranceBrokeragePTemp: number | string | undefined = reinsuranceBrokerageP
    let reinsuranceBrokeragec: number = typeof reinsuranceBrokerage == 'number' ? reinsuranceBrokerage : 0
    let reinsuranceBrokerageTemp: number | string | undefined = reinsuranceBrokerage

    let taxesPc: number = typeof taxesP == 'number' ? taxesP : 0
    let taxesPTemp: number | string | undefined = taxesP
    let taxesc: number = typeof taxes == 'number' ? taxes : 0
    let taxesTemp: number | string | undefined = taxes

    let frontingFeePc: number = typeof frontingFeeP == 'number' ? frontingFeeP : 0
    let frontingFeePTemp: number | string | undefined = frontingFeeP
    let frontingFeec: number = typeof frontingFee == 'number' ? frontingFee : 0
    let frontingFeeTemp: number | string | undefined = frontingFee

    let updatedDiscounts = discounts.map(discountItem => {
      const newAmount = (discountItem.percentage / 100) * grossPremiumc

      return { ...discountItem, amount: newAmount }
    })

    let updatedDiscountInputs = discountInputs.map(discountItem => {
      if (typeof discountItem.percentage == 'number') {
        const newAmount = (discountItem.percentage / 100) * grossPremiumc

        return { ...discountItem, amount: newAmount }
      } else {
        return { ...discountItem, amount: 0 }
      }
    })

    switch (type) {
      case 'reinsuranceBrokerageP': {
        if (typeof value == 'number') {
          reinsuranceBrokeragePc = value
          reinsuranceBrokeragePTemp = value
          const result = (grossPremiumc * reinsuranceBrokeragePc) / 100
          reinsuranceBrokeragec = isFinite(result) ? result : 0
          reinsuranceBrokerageTemp = isFinite(result) ? result : 0
        } else {
          reinsuranceBrokeragePTemp = ''
          reinsuranceBrokerageTemp = 0
        }
        break
      }
      case 'reinsuranceBrokerage': {
        if (typeof value == 'number') {
          reinsuranceBrokeragec = value
          reinsuranceBrokerageTemp = value
          const result = (reinsuranceBrokeragec * 100) / grossPremiumc

          // console.log({ result, reinsuranceBrokerageTemp })
          // debugger;
          reinsuranceBrokeragePc = isFinite(result) ? result : 0
          reinsuranceBrokeragePTemp = isFinite(result) ? result : 0
        } else {
          reinsuranceBrokerageTemp = ''
          reinsuranceBrokeragePTemp = 0
        }
        break
      }
      case 'taxes': {
        if (typeof value == 'number') {
          taxesc = value
          const result = (taxesc * 100) / grossPremiumc
          taxesPc = isFinite(result) ? result : 0
          taxesPTemp = isFinite(result) ? result : 0
          taxesTemp = value
        } else {
          taxesPTemp = 0
          taxesTemp = ''
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
          taxesPTemp = value
          taxesTemp = isFinite(result) ? result : 0
        } else {
          taxesPTemp = ''
          taxesTemp = 0
          taxesc = 0
          handleNumericInputChange(0, 'taxesP')
        }

        break
      }
      case 'frontingFeeP': {
        if (typeof value == 'number') {
          frontingFeePc = value
          frontingFeePTemp = value
          const result = (grossPremiumc * frontingFeePc) / 100
          frontingFeec = isFinite(result) ? result : 0
          frontingFeeTemp = isFinite(result) ? result : 0
        } else {
          frontingFeePTemp = ''
          frontingFeeTemp = 0
        }
        break
      }
      case 'frontingFee': {
        if (typeof value == 'number') {
          const result = (value * 100) / grossPremiumc
          frontingFeePc = isFinite(result) ? result : 0
          frontingFeePTemp = isFinite(result) ? result : 0
          frontingFeec = value
          frontingFeeTemp = value
        } else {
          frontingFeePTemp = 0
          frontingFeeTemp = ''
        }
        break
      }
      case 'grossPremium': {
        if (typeof value == 'number') {
          grossPremiumc = value
          grossPremiumTemp = value
          const resultBrokerage = grossPremiumc * (reinsuranceBrokeragePc / 100)
          const resultTaxes = grossPremiumc * (taxesPc / 100)
          const resultFronting = grossPremiumc * (frontingFeePc / 100)

          reinsuranceBrokeragec = isFinite(resultBrokerage) ? resultBrokerage : 0
          taxesc = isFinite(resultTaxes) ? resultTaxes : 0
          taxesTemp = isFinite(resultTaxes) ? resultTaxes : 0
          frontingFeec = isFinite(resultFronting) ? resultFronting : 0

          updatedDiscounts = discounts.map(discountItem => {
            const newAmount = (discountItem.percentage / 100) * grossPremiumc

            return { ...discountItem, amount: newAmount }
          })
          updatedDiscountInputs = discounts.map(discountItem => {
            if (typeof discountItem.percentage == 'number') {
              const newAmount = (discountItem.percentage / 100) * value

              return { ...discountItem, amount: newAmount }
            } else {
              return { ...discountItem, amount: 0 }
            }
          })
        } else {
          grossPremiumTemp = ''
          reinsuranceBrokeragec = 0
          reinsuranceBrokerageTemp = 0
          taxesc = 0
          taxesTemp = 0
          frontingFeec = 0
          frontingFeeTemp = 0
          updatedDiscounts = discounts.map(discountItem => {
            return { ...discountItem, amount: 0 }
          })
          updatedDiscountInputs = discounts.map(discountItem => {
            return { ...discountItem, amount: 0 }
          })
        }
        break
      }
      default:
        break
    }

    const reinsuranceBrokerageTotalFinal = reinsuranceBrokeragec ? reinsuranceBrokeragec : 0
    const taxesFinal = taxesc ? taxesc : 0
    const frontingFeeTotalFinal = frontingFeec ? frontingFeec : 0
    const discountsAmount = updatedDiscounts.reduce((sum, discountItem) => sum + discountItem.amount, 0) ?? 0
    const netPremiumc =
      grossPremiumc - reinsuranceBrokerageTotalFinal - taxesFinal - frontingFeeTotalFinal - discountsAmount
    const netPremiumWithTaxesc =
      grossPremiumc - reinsuranceBrokerageTotalFinal - frontingFeeTotalFinal - discountsAmount
    const netPremiumWithoutDiscountsc = grossPremiumc - reinsuranceBrokerageTotalFinal
    setFrontingFee(frontingFeeTemp)
    setFrontingFeeP(frontingFeePTemp)
    setTaxesP(taxesPTemp)
    setTaxes(taxesTemp)
    setGrossPremium(grossPremiumTemp)
    setDiscounts(updatedDiscounts)
    setDiscountInputs(updatedDiscountInputs)
    setReinsuranceBrokerage(reinsuranceBrokerageTemp)
    setReinsuranceBrokerageP(reinsuranceBrokeragePTemp)
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

  const handleCurrencyChange = (e: SelectChangeEvent<string> | any) => {
    const target = e.target
    const value = target.value
    setPair({ targetCurrency: value, baseCurrency: 'USD' })
    setUpdateInfo(true)
  }

  const handleNumericInputChange = (value: any, name: string) => {
    setPlacementStructure({ ...placementStructure, [name]: value })
    setUpdateInfo(true)
  }

  const handleSelectChange = (e: SelectChangeEvent<string> | any) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setPlacementStructure({
      ...placementStructure,
      [name]: value
    })
    setUpdateInfo(true)
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
      setUpdateInfo(true)
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
      setUpdateInfo(true)
    }
    setFrontingChecked(!frontingChecked)
  }

  const addDiscount = () => {
    const newDiscount = { id: 0, percentage: 0, amount: 0, idAccount: 0 }
    const newDiscounts = [...discounts, newDiscount]
    const newDiscountInput = [...discountInputs, newDiscount]
    setDiscounts(newDiscounts)
    setDiscountInputs(newDiscountInput)
    setDiscountCounter(discountCounter + 1)
  }

  const deleteDiscount = async (index: number) => {
    const discountToDelete = discounts[index].id
    const newDiscounts = [...discounts]
    const newDiscountInput = [...discountInputs]
    newDiscounts.splice(index, 1)
    newDiscountInput.splice(index, 1)
    setDiscounts(newDiscounts)
    setDiscountInputs(newDiscountInput)

    const updatedDiscounts = newDiscounts.map(discountItem => {
      const updatedDiscount = { ...discountItem }

      return updatedDiscount
    })

    const updatedDiscountInputs = newDiscountInput.map(discountItem => {
      const updatedDiscount = { ...discountItem }

      return updatedDiscount
    })

    setDiscounts(updatedDiscounts)
    setDiscountInputs(updatedDiscountInputs)
    setDiscountCounter(updatedDiscounts.length + 1)

    if (index === discounts.length - 1) {
      // Si se eliminó el último descuento, actualizamos el estado "discount" para mostrar el último descuento en el formulario
      setDiscount(updatedDiscountInputs[index - 1] || { id: 0, percentage: 0, amount: 0, idAccount: 0 })
    }

    if (discountToDelete) {
      await deleteDiscountsById(discountToDelete)
    }
  }

  const calculateDiscountP = (index: number, newDiscount: DiscountInputs) => {
    const total = typeof grossPremium == 'number' ? grossPremium : 0
    let updatedDiscountInput: DiscountInputs = newDiscount
    let updatedDiscount: DiscountDto = {
      id: newDiscount.id,
      amount: typeof newDiscount.amount == 'number' ? newDiscount.amount : 0,
      percentage: typeof newDiscount.percentage == 'number' ? newDiscount.percentage : 0,
      idAccount: newDiscount.idAccount
    }
    if (typeof newDiscount.amount == 'number') {
      const percentage = (newDiscount.amount / total) * 100
      updatedDiscountInput = { ...newDiscount, percentage }
      updatedDiscount = { ...updatedDiscount, percentage }
    } else {
      updatedDiscountInput = { ...newDiscount, percentage: 0 }
      updatedDiscount = { ...updatedDiscount, percentage: 0 }
    }
    setDiscount(updatedDiscountInput)

    setDiscounts(state => {
      const newState = [...state]
      newState[index] = updatedDiscount

      return newState
    })

    setDiscountInputs(state => {
      const newState = [...state]
      newState[index] = updatedDiscountInput

      return newState
    })
  }

  const calculateDiscount = (index: number, newDiscount: DiscountInputs) => {
    const total = typeof grossPremium == 'number' ? grossPremium : 0
    let updatedDiscountInput: DiscountInputs = newDiscount
    let updatedDiscount: DiscountDto = {
      id: newDiscount.id,
      amount: typeof newDiscount.amount == 'number' ? newDiscount.amount : 0,
      percentage: typeof newDiscount.percentage == 'number' ? newDiscount.percentage : 0,
      idAccount: newDiscount.idAccount
    }

    if (typeof newDiscount.percentage == 'number') {
      const amount = (newDiscount.percentage / 100) * total
      updatedDiscountInput = { ...newDiscount, amount }
      updatedDiscount = { ...updatedDiscount, amount }
    } else {
      updatedDiscountInput = { ...newDiscount, amount: 0 }
      updatedDiscount = { ...updatedDiscount, amount: 0 }
    }
    setDiscount(updatedDiscountInput)

    setDiscounts(state => {
      const newState = [...state]
      newState[index] = updatedDiscount

      return newState
    })

    setDiscountInputs(state => {
      const newState = [...state]
      newState[index] = updatedDiscountInput

      return newState
    })
  }

  const validations = () => {
    const newErrors: PlacementStructureErrors = {
      currencyError: placementStructure.currency === '',
      totalError: placementStructure.total === 0 || placementStructure.total === undefined,
      reinsuranceBrokeragePError: placementStructure.reinsuranceBrokerageP < 0,
      taxesPError: taxesChecked && placementStructure.taxesP === 0,
      frontingFeePError: frontingChecked && placementStructure.frontingFeeP === 0,
      exchangeRateError: placementStructure.exchangeRate === 0 || placementStructure.exchangeRate === undefined,
      limitError: placementStructure.limit === 0 || placementStructure.limit === undefined,
      grossPremiumError: placementStructure.grossPremium === 0 || placementStructure.grossPremium === undefined,
      reinsuranceBrokerageError: placementStructure.reinsuranceBrokerage < 0,
      taxesError: taxesChecked && (placementStructure.taxes === undefined || placementStructure.taxes === 0),
      frontingFeeError:
        frontingChecked && (placementStructure.frontingFee === undefined || placementStructure.frontingFee === 0),
      typeOfLimitError: placementStructure.typeOfLimit === '',
      totalDiscountsError: discountValidation(),
      discountsErrors:
        discounts.length > 0 &&
        discounts.some(discountItem => discountItem.percentage === 0 || discountItem.amount === 0)
    }

    if (discounts.length > 0) {
      const newDiscountErrors: number[] = []

      discounts.forEach((discountItem, index) => {
        if (discountItem.percentage === 0 || discountItem.amount === 0) {
          newDiscountErrors.push(index)
        }
      })
      setDiscountsErrorsIndex(newDiscountErrors) // setea un arreglo de los discounts con error
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      // enviar formulario si no hay errores
      onValidationComplete(true, 'placementStructure')
      setSingleValidation(false)

      // isValidForm(true)
    } else {
      onValidationComplete(false, 'placementStrcture')
    }
  }

  const discountValidation = () => {
    const discountPercentages = discounts.reduce((sum, discountItem) => sum + discountItem.percentage, 0) ?? 0
    const discountAmount = discounts.reduce((sum, discountItem) => sum + discountItem.amount, 0) ?? 0

    const totalPercentages = discountPercentages + placementStructure.taxesP + placementStructure.frontingFeeP
    const totalAmount = discountAmount + placementStructure.taxes + placementStructure.frontingFee

    if (totalPercentages > 100 || totalAmount > (typeof grossPremium == 'number' ? grossPremium : 0)) return true
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
  }, [discount, discountCounter])

  React.useEffect(() => {
    setTotalDiscountsError(discountValidation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxesP, taxes, frontingFee, frontingFeeP, grossPremium])

  React.useEffect(() => {
    if (singleValidation) {
      validations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placementStructure, setPlacementStructure])

  React.useEffect(() => {
    if (makeValidations) {
      validations()
      setSingleValidation(true)
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
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'exchangeRate')
              }}
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
              onChange={(e: any) => {
                const value = Number(e.target.value.replace('%', ''))

                // console.log(value)
                calculate('reinsuranceBrokerageP', value)

                // if (!!(value % 1)) {
                //   console.log('isFLoat')
                //   calculate('reinsuranceBrokerageP', value)
                // } else {
                //   calculate('reinsuranceBrokerageP', '')
                // }
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
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, 'exchangeRate')
              }}
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
                const upLimit = typeof grossPremium == 'number' ? grossPremium : 0

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
              // eslint-disable-next-line lines-around-comment
              // onValueChange={value => {
              //   if (value.floatValue) {
              //     calculate('taxesP', value.floatValue)
              //   } else {
              //     calculate('taxesP', '')
              //   }
              // }}
              onChange={e => {
                const value = Number(e.target.value.replace('%', ''))
                calculate('taxesP', value)
              }}
              onFocus={e => {
                if (e.target.value === '0') {
                  e.target.value = ''
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
                const upLimit = typeof grossPremium == 'number' ? grossPremium : 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('taxes', value.floatValue)
                } else {
                  calculate('taxes', '')
                }
              }}
              onFocus={e => {
                if (e.target.value === '0') {
                  e.target.value = ''
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
              // eslint-disable-next-line lines-around-comment
              // onValueChange={value => {
              //   if (value.floatValue) {
              //     calculate('frontingFeeP', value.floatValue)
              //   } else {
              //     calculate('frontingFeeP', '')
              //   }
              // }}
              onChange={e => {
                const value = Number(e.target.value.replace('%', ''))
                calculate('frontingFeeP', value)
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
                const upLimit = typeof grossPremium == 'number' ? grossPremium : 0

                return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
              }}
              onValueChange={value => {
                if (value.floatValue) {
                  calculate('frontingFee', value.floatValue)
                } else {
                  calculate('frontingFee', '')
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

        {discountInputs.map((discountItem, index) => (
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
                value={discountItem.percentage}
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
                // eslint-disable-next-line lines-around-comment
                // onValueChange={value => {
                //   if (value.floatValue) {
                //     const updatedDiscount = { ...discountItem, percentage: value.floatValue }
                //     calculateDiscount(index, updatedDiscount)
                //   } else {
                //     calculateDiscount(index, { ...discountItem, percentage: '' })
                //   }
                // }}

                onChange={e => {
                  const value = Number(e.target.value.replace('%', ''))
                  const updatedDiscount = { ...discountItem, percentage: value }
                  calculateDiscount(index, updatedDiscount)
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
                value={discountItem.amount}
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
                  const upLimit = typeof grossPremium == 'number' ? grossPremium : 0

                  return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                }}
                onValueChange={value => {
                  if (value.floatValue) {
                    const updatedDiscount = { ...discountItem, amount: value.floatValue }
                    calculateDiscountP(index, updatedDiscount)
                  } else {
                    calculateDiscountP(index, { ...discountItem, amount: '' })
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
