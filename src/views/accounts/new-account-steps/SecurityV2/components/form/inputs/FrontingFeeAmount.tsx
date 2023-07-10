import { FormControl, FormHelperText, TextField } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { useAppDispatch } from '@/store'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'
import { CalculateSecurity } from '../../../utils/calculates-securities'

interface FrontingFeeAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
  isDisabled: boolean
}

export const FrontingFeeAmount = ({
  index,
  value,
  isDisabled,
  errorMessage,
  operationSecurity,
  isActiveErrors,
}: FrontingFeeAmountProps) => {

  const dispatch = useAppDispatch();

  const handleChangeFrontingFeeAmount = (value: number) => {
    // console.log(value)


    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        frontingFee: operationSecurity.getFrontingFeePercent(value),
        frontingFeeAmount: value,
        isTouchedFrontingFee: true,
        isTouchedFrontingFeeAmount: true,
      } as Security
    }))
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
        disabled={isDisabled}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}>{isActiveErrors && errorMessage}</FormHelperText>
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
