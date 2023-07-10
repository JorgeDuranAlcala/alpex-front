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


// ! only if we want specific props
// interface DynamicComissionPercentProps extends ISecurityInputProps {
//
// }

type DynamicComissionPercentProps = ISecurityInputProps;

export const DynamicComissionPercent = ({ index, value, errorMessage, isActiveErrors, isDisabled }: DynamicComissionPercentProps) => {

  const dispatch = useAppDispatch();


  const handleChangeDynamicComissionPercent = (value: number) => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        dynamicCommission: value
      } as SecurityDto
    }))
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Dynamic comission %'
        value={value}
        onValueChange={value => {
          handleChangeDynamicComissionPercent(Number(value.floatValue))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
        disabled={isDisabled}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {isActiveErrors && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const dynamicComissionPercent_validations = () => yup.object().shape({
  dynamicCommission: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .required('This field is required')
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })

    .max(100),
});
