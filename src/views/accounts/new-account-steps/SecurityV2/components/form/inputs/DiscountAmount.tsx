import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'

// import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { DiscountsContext } from '../discounts/DiscountsContext'

// ! only if we want specific props
interface DiscountAmountProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
}

export const DiscountAmount = ({ index, discountIndex, value }: DiscountAmountProps) => {


  const { updateDiscountByIndex } = useContext(DiscountsContext)

  const handleChangeDiscountAmount = (value: number) => {
    // console.log('OnChange DiscountAmount value: ', { value, index, discountIndex });

    updateDiscountByIndex({
      index: discountIndex,
      percentage: 0,
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
        disabled={securities[index].view === 2}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}></FormHelperText>
    </FormControl>
  )
}
