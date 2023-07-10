import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext } from '../discounts/DiscountsContext'
import { SecondViewContext } from '../secondView/SecondViewContext'

interface GrossOrNetPremiumAt100Props extends ISecurityInputProps {
  isGross: boolean
  operationSecurity: CalculateSecurity
}

export const GrossOrNetPremiumAt100 = ({
  index,
  isGross,
  value,
  errorMessage,
  validateForm,
  operationSecurity,
  view
}: GrossOrNetPremiumAt100Props) => {
  const { discountsList, updateAllDiscounts } = useContext(DiscountsContext)

  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const { activeView, $inputRef, openModalSecondView, isOpenModal, isOpenModalUndo } = useContext(SecondViewContext)

  const handleClick = (e: any) => {
    if (activeView === 0) {
      $inputRef[index] = e.target
      openModalSecondView()
    }
  }

  const handleChangeBaseAmount = (value: number) => {
    console.log('change gross or net at 100%')
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      netPremiumAt100: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  useEffect(() => {
    const newDiscountsList = discountsList.map(discount => ({
      ...discount,
      percentage: discount.percentage,
      amount: operationSecurity.getDiscountAmount(discount.amount)
    }))

    updateAllDiscounts(newDiscountsList)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!isOpenModal) {
      if (!$inputRef) return

      if (activeView !== 0) {
        setTimeout(() => {
          // console.log(index, 'focus', $inputRef.current || 'null');

          $inputRef[index]?.focus()

          $inputRef[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }, 300)
      } else {
        $inputRef[index]?.blur()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

  useEffect(() => {
    if (!isOpenModalUndo) {
      if (!$inputRef) return

      if (activeView === 0) {
        setTimeout(() => {
          $inputRef[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }, 300)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalUndo])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        fullWidth
        autoFocus
        label={isGross ? `Gross premium at %100 ` : 'Net premium at %100'}
        value={value}
        onValueChange={value => {
          handleChangeBaseAmount(Number(value.floatValue))
        }}
        onClick={handleClick}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={view === 2}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const grossOrNetPremiumAt100_validations = () =>
  yup.object().shape({
    netPremiumAt100: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required')
  })
