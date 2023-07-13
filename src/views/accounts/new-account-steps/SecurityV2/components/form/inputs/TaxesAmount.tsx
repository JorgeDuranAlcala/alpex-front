import { FormControl, FormHelperText, TextField } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { useAppDispatch } from '@/store'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'
import { CalculateSecurity } from '../../../utils/calculates-securities'

// ! only if we want specific props
interface TaxesAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}

export const TaxesAmount = ({
  index,
  value,
  isDisabled,
  isActiveErrors,
  errorMessage,

  operationSecurity,

}: TaxesAmountProps) => {

  const dispatch = useAppDispatch();

  const handleChangeTaxesAmount = (value: number) => {


    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        taxesAmount: value,
        taxes: operationSecurity.getTaxesPercent(value),
        isTouchedTaxes: true,
        isTouchedTaxesAmount: true,
      } as Security
    }))
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
        disabled={isDisabled}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}>{isActiveErrors && errorMessage}</FormHelperText>
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
