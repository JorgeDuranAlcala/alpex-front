import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

interface FrontingFeeAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
  isDisabled: boolean
}
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1900 // Tiempo en milisegundos para considerar que se dejó de escribir
export const FrontingFeeAmount = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,
  operationSecurity,
  view
}: FrontingFeeAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeFrontingFeeAmount = (value: number) => {
    clearInterval(typingTimer)
    typingTimer = setInterval(() => {
      const tempSecurities = [...securities]
      tempSecurities[index] = {
        ...tempSecurities[index],

        frontingFee: operationSecurity.getFrontingFeePercent(value),
        frontingFeeAmount: value,
        isChangeFrontingFeeAmount: true
      }
      validateForm(tempSecurities[index])
      calculateSecurities(tempSecurities)

      // Limpiar el intervalo
      clearInterval(typingTimer)
    }, doneTypingInterval)
  }

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Fronting fee'
        value={value}
        onChange={e => {
          handleChangeFrontingFeeAmount(Number(e.target.value.replace('$', '').replaceAll(',', '')))
        }}
        prefix={'$'}
        customInput={TextField}
        thousandSeparator=','
        disabled={view === 2 || isDisabled}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const frontingFeeAmount_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) =>
  yup.object().shape({
    frontingFeeAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (frontingFeeEnabled) return +val > 0

        return true
      })
  })
