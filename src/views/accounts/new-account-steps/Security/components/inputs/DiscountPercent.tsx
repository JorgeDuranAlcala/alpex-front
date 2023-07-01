import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext, IDiscountInputs } from '../discounts/DiscountsContext'

// import { SecurityContext } from '../../SecurityView'
import { usePercentageAchieved } from '../../hooks/usePercentageAchieved'

// ! only if we want specific props
interface DiscountPercentProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
  discountsList: IDiscountInputs[]
}

export const DiscountPercent = ({ index, discountIndex, value, operationSecurity, discountsList }: DiscountPercentProps) => {
  // const {
  //   securities,

  //   // calculateSecurities
  // } = useContext(SecurityContext);

  const { achievedMessageError, checkIsPercentageAchieved } = usePercentageAchieved();

  const { updateDiscountByIndex } = useContext(DiscountsContext)
  const handleChangeDiscountPercent = (value: number) => {
    updateDiscountByIndex({
      index: discountIndex,
      percentage: value,
      amount: operationSecurity.getDiscountAmount(value)
    })
  }

  useEffect(() => {

    checkIsPercentageAchieved({ formIndex: index });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsList[discountIndex]]);


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
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{achievedMessageError}</FormHelperText>
    </FormControl>
  )
}
