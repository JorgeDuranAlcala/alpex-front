import { FormControl, FormHelperText, TextField } from '@mui/material'
import { MutableRefObject, useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { IForField } from '../../hooks/useDataFirstTime'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

// ! only if we want specific props
interface TaxesAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
  isDisabled: boolean
  fieldRef: MutableRefObject<IForField>
}

export const TaxesAmount = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,
  operationSecurity,
  fieldRef,
  view
}: TaxesAmountProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeTaxesAmount = (value: number) => {
    console.log(value)
    if (fieldRef) {
      fieldRef.current.isTouched = true
    }
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxesAmount: value,
      taxes: operationSecurity.getTaxesPercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
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
        decimalScale={2}
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
