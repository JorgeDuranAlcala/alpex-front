import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext, IDiscountInputs } from '../discounts/DiscountsContext'

// ! only if we want specific props
interface DiscountPercentProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
  discountsList: IDiscountInputs[]
}

export const DiscountPercent = ({ discountIndex, value, operationSecurity, discountsList }: DiscountPercentProps) => {
  // const {
  //   // securities,
  //   // calculateSecurities
  // } = useContext(SecurityContext);

  const { updateDiscountByIndex } = useContext(DiscountsContext)
  const [messageError, setMessageError] = useState('')
  const handleChangeDiscountPercent = (value: number) => {
    updateDiscountByIndex({
      index: discountIndex,
      discountPercent: value,
      discountAmount: operationSecurity.getDiscountAmount(value)
    })
  }
  useEffect(() => {
    const totalPercentOfDiscounts = discountsList.reduce((value, current) => {
      value += current.discountPercent

      return value
    }, 0)

    totalPercentOfDiscounts > 100 ? setMessageError('Discount must be less than 100%') : setMessageError('')
  }, [discountsList[discountIndex]])

  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <NumericFormat
        autoFocus
        label='Discount %'
        value={value}
        onChange={e => {
          handleChangeDiscountPercent(Number(e.target.value.replace('%', '')))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{messageError}</FormHelperText>
    </FormControl>
  )
}
