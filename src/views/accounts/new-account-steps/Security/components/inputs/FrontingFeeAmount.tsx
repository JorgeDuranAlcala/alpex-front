import { FormControl, FormHelperText, TextField } from '@mui/material'
import { MutableRefObject, useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { IForField } from '../../hooks/useDataFirstTime'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

interface FrontingFeeAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
  isDisabled: boolean
  fieldRef: MutableRefObject<IForField>
}

export const FrontingFeeAmount = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,
  operationSecurity,
  fieldRef
}: FrontingFeeAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeFrontingFeeAmount = (value: number) => {
    // console.log(value)
    if (fieldRef) {
      fieldRef.current.isTouched = true
    }
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],

      frontingFee: operationSecurity.getFrontingFeePercent(value),
      frontingFeeAmount: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
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
        decimalScale={2}
        thousandSeparator=','
        disabled={securities[index].view === 2 || isDisabled}
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
      .required('This field is required')
  })
