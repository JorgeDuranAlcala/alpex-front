import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'

// import { SecurityContext } from '../../SecurityView';
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

// ! only if we want specific props
interface DiscountAmountProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
  view: number
}

export const DiscountAmount = ({ discountIndex, value, operationSecurity, view, index }: DiscountAmountProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)
  const handleChangeDiscountAmount = (value: number) => {
    const securitiesTemp = [...securities]
    securitiesTemp[index].discounts[discountIndex] = {
      percentage: operationSecurity.getDiscountPercent(value),
      amount: value,
      active: true
    }
    calculateSecurities(securitiesTemp)
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
        thousandSeparator=','
        disabled={view === 2}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}></FormHelperText>
    </FormControl>
  )
}
