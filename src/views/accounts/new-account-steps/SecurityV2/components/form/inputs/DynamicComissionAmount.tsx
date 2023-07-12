import {
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import * as yup from 'yup';

import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { useAppDispatch } from '@/store';
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface';
import { updateSecuritiesAtIndex } from '../../../store/securitySlice';
import { CalculateSecurity } from '../../../utils/calculates-securities';


// ! only if we want specific props
interface DynamicComissionAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}


export const DynamicComissionAmount = ({ index, value, errorMessage, isActiveErrors, isDisabled, operationSecurity }: DynamicComissionAmountProps) => {


  const dispatch = useAppDispatch();


  const handleChangeDynamicComissionAmount = (value: number) => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        dynamicCommission: operationSecurity.getDynamicComissionPercent(value)
      } as SecurityDto
    }))
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Dynamic comission'
        value={value}
        onValueChange={value => {
          handleChangeDynamicComissionAmount(Number(value.floatValue))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={isDisabled}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {isActiveErrors && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const dynamicComissionAmount_validations = () => yup.object().shape({
  dynamicCommissionAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required'),
});
