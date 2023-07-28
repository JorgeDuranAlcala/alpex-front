import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

interface ReinsuranceBrokerageAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1700 // Tiempo en milisegundos para considerar que se dejó de escribir
export const ReinsuranceBrokerageAmount = ({
  index,
  value,
  errorMessage,
  operationSecurity,
  validateForm,
  view
}: ReinsuranceBrokerageAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeBrokerAgeAmount = (value: number) => {
    clearInterval(typingTimer)
    typingTimer = setInterval(() => {
      const tempSecurities = structuredClone(securities)
      const percent = operationSecurity.getBrokerAgePercent(value || 0)
      tempSecurities[index] = {
        ...tempSecurities[index],
        reinsuranceBrokerage: percent > 100 ? 0 : percent,
        brokerAgeAmount: value,
        isChangeBrokerAgeAmount: true,
        isChangeTaxesAmount: false
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
        label='Reinsurance brokerage'
        value={value}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.event) handleChangeBrokerAgeAmount(Number(values.floatValue))
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

export const reinsuranceBrokerageAmount_validations = ({ isGross }: { isGross: boolean }) =>
  yup.object().shape({
    brokerAgeAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross) return +val > 0

        return true
      })
  })
