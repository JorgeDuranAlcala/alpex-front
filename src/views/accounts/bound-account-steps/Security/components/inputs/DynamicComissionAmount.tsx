import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityViewBound'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

import { IS_DEMO } from 'src/utils/isDemo'

// ! only if we want specific props
interface DynamicComissionAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1700 // Tiempo en milisegundos para considerar que se dejó de escribir
export const DynamicComissionAmount = ({
  index,
  value,
  errorMessage,
  validateForm,
  operationSecurity,
  view
}: DynamicComissionAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeDynamicComissionAmount = (value: number) => {
    clearInterval(typingTimer)
    typingTimer = setInterval(() => {
      // Código a ejecutar cuando se deja de escribir
      const tempSecurities = structuredClone(securities)
      const percent = operationSecurity.getDynamicComissionPercent(value || 0)

      tempSecurities[index] = {
        ...tempSecurities[index],
        dynamicCommission: percent > 100 ? 0 : percent,
        dynamicCommissionAmount: value,
        isChangeDynamicCommissionAmount: true
      }

      validateForm(tempSecurities[index])
      calculateSecurities(tempSecurities)

      // Limpiar el intervalo
      clearInterval(typingTimer)
    }, doneTypingInterval)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label={`${!IS_DEMO ? "Dynamic" : ""} comission`}
        value={value}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.event) handleChangeDynamicComissionAmount(Number(values.floatValue))
        }}
        prefix={'$'}
        customInput={TextField}
        thousandSeparator=','
        disabled={view === 2}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const dynamicComissionAmount_validations = () =>
  yup.object().shape({
    dynamicCommissionAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required')
  })
