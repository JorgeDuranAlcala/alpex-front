import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'

// import { SecurityContext } from '../../SecurityView';
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext } from '../discounts/DiscountsContext'

// ! only if we want specific props
interface DiscountAmountProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
  view: number
}

export const DiscountAmount = ({ index, discountIndex, value, operationSecurity, view }: DiscountAmountProps) => {
  const { securities } = useContext(SecurityContext)

  const { updateDiscountByIndex } = useContext(DiscountsContext)

  const handleChangeDiscountAmount = (value: number) => {
    // console.log('OnChange DiscountAmount value: ', { value, index, discountIndex });

    updateDiscountByIndex({
      index: discountIndex,
      percentage: operationSecurity.getDiscountPercent(value),
      amount: value
    })
  }

  return (
    <FormControl fullWidth>
      <NumericFormat
        label='Discount'
        value={value}
        onChange={e => {
          handleChangeDiscountAmount(Number(e.target.value.replaceAll(',', '').replace('$', '')))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={view === 2}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}></FormHelperText>
    </FormControl>
  )
}
