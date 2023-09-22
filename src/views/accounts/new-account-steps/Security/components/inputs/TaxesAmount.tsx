import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

// ! only if we want specific props
interface TaxesAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
  isDisabled: boolean
}
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1700 // Tiempo en milisegundos para considerar que se dejó de escribir
export const TaxesAmount = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,
  operationSecurity,
  view
}: TaxesAmountProps) => {
  const { activeErros, securities, calculateSecurities, setIsUpdatedInfoByUser } = useContext(SecurityContext)

  const handleChangeTaxesAmount = (value: number) => {
    clearInterval(typingTimer)
    typingTimer = setInterval(() => {
      // Código a ejecutar cuando se deja de escribir
      const tempSecurities = [...securities]
      const percent = operationSecurity.getTaxesPercent(value || 0)
      tempSecurities[index] = {
        ...tempSecurities[index],
        taxes: percent > 100 ? 0 : percent,
        taxesAmount: value,
        isChangeTaxesAmount: true,
        isChangeDynamicCommissionAmount: false
      }
      validateForm(tempSecurities[index])
      calculateSecurities(tempSecurities)
      setIsUpdatedInfoByUser(true)

      // Limpiar el intervalo
      clearInterval(typingTimer)
    }, doneTypingInterval)
  }

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Taxes'
        value={value}
        onChange={e => {
          handleChangeTaxesAmount(Number(e.target.value.replace('$', '').replaceAll(',', '')))
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

export const taxesAmount_validations = ({ isGross, isTaxesEnabled }: { isGross: boolean; isTaxesEnabled: boolean }) =>
  yup.object().shape({
    taxesAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross && isTaxesEnabled) return +val > 0

        return true
      })
      .required('This field is required')
  })
