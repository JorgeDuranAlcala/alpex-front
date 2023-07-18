import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

interface ReinsuranceBrokerageAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}

export const ReinsuranceBrokerageAmount = ({
  index,
  value,
  errorMessage,
  operationSecurity,
  validateForm,
  view
}: ReinsuranceBrokerageAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)
  const [reinsuranceBrokerageAmount, setReinsuranceBrokerageAmount] = useState<number>(Number(value))

  const handleChangeBrokerAgeAmount = (value: number) => {
    const tempSecurities = structuredClone(securities)
    const percent = operationSecurity.getBrokerAgePercent(value)
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: percent === 101 ? 0 : percent
    }

    if (percent === 101 && !isNaN(percent)) {
      setReinsuranceBrokerageAmount(0)
    } else {
      setReinsuranceBrokerageAmount(value)
    }
    calculateSecurities(tempSecurities)
    validateForm(tempSecurities[index])
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Reinsurance brokerage'
        value={String(reinsuranceBrokerageAmount)}
        onValueChange={value => {
          handleChangeBrokerAgeAmount(Number(value.floatValue))
        }}
        defaultValue={String(reinsuranceBrokerageAmount)}
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
