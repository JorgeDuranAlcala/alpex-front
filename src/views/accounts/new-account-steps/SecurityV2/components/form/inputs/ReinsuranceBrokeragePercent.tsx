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
// interface ReinsuranceBrokeragePercentProps extends ISecurityInputProps {
//
// }

type ReinsuranceBrokeragePercentProps = ISecurityInputProps;

export const ReinsuranceBrokeragePercent = ({ index, value, errorMessage, isActiveErrors, isDisabled }: ReinsuranceBrokeragePercentProps) => {

  const dispatch = useAppDispatch();


  const handleChangeBrokerRagePercent = (value: number) => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        reinsuranceBrokerage: value
      } as SecurityDto
    }))

  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Reinsurance brokerage %'
        value={value}
        onValueChange={value => {
          handleChangeBrokerRagePercent(Number(value.floatValue))
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

export const reinsuranceBrokeragePercent_validations = ({ isGross }: { isGross: boolean }) => yup.object().shape({
  reinsuranceBrokerage: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0
      if (isGross) return +val > 0

      return true
    })
    .max(100),
});
