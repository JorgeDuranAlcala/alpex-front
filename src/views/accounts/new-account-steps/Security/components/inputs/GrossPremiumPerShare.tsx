import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

interface GrossPremiumPerShareAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}

export const GrossPremiumPerShareAmount = ({
  index,
  value,
  errorMessage,
  validateForm,
  operationSecurity,
  view
}: GrossPremiumPerShareAmountProps) => {
  const {
    activeErros,
    securities

    // calculateSecurities
  } = useContext(SecurityContext)

  const handleChangeGrossPremiumPerShareAmount = (value: number) => {
    console.log('gross Premium PerShare value', { value, index, validateForm, operationSecurity })

    // const tempSecurities = [...securities]
    // tempSecurities[index] = {
    //   ...tempSecurities[index],
    //   share: operationSecurity.getsharePercent(value)
    // }
    // validateForm(tempSecurities[index])
    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Gross Premium per share'
        value={value}
        onValueChange={value => {
          handleChangeGrossPremiumPerShareAmount(Number(value.floatValue))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={view === 2}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const grossPremiumPerShareAmount_validations = () =>
  yup.object().shape({
    grossPremiumPerShareAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required')
  })
