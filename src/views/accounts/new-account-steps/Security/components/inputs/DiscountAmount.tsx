import { FormControl, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'

// import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext } from '../discounts/DiscountsContext'

// ! only if we want specific props
interface DiscountAmountProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
}

export const DiscountAmount = ({ discountIndex, value, operationSecurity }: DiscountAmountProps) => {
  // const {

  //   securities,

  //   // calculateSecurities
  // } = useContext(SecurityContext);

  const { updateDiscountByIndex } = useContext(DiscountsContext)

  const handleChangeDiscountAmount = (value: number) => {
    // console.log('OnChange DiscountAmount value: ', { value, index, discountIndex });

    updateDiscountByIndex({
      index: discountIndex,
      percentage: operationSecurity.getDiscountPercent(value),
      amount: value
    })

    // const tempSecurities = [...securities]
    // tempSecurities[index] = {
    //   ...tempSecurities[index],
    //   share: value
    // }
    // validateForm(tempSecurities[index])
    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Discount'
        value={value}
        onChange={e => {
          handleChangeDiscountAmount(Number(e.target.value.replaceAll(',', '').replace('$', '')))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
      />
    </FormControl>
  )
}
