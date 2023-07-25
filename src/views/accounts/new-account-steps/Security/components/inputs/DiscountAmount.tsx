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
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1700 // Tiempo en milisegundos para considerar que se dejó de escribir
export const DiscountAmount = ({ discountIndex, value, operationSecurity, view, index }: DiscountAmountProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeDiscountAmount = (value: number) => {
    clearInterval(typingTimer)
    typingTimer = setInterval(() => {
      // Código a ejecutar cuando se deja de escribir
      const securitiesTemp = [...securities]
      const percent = operationSecurity.getDiscountPercent(value || 0)

      securitiesTemp[index].discounts[discountIndex] = {
        ...securitiesTemp[index].discounts[discountIndex],
        percentage: percent > 100 ? 0 : percent,
        active: true,
        amount: value,
        isChangeAmount: true
      }

      calculateSecurities(securitiesTemp)
      clearInterval(typingTimer)
    }, doneTypingInterval)
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
