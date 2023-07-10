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
// interface SharePercentProps extends ISecurityInputProps {

// }

type SharePercentProps = ISecurityInputProps


export const SharePercent = ({ index, value, errorMessage, isActiveErrors, isDisabled }: SharePercentProps) => {

  const dispatch = useAppDispatch();

  const handleChangeSharePercent = (value: number) => {

    // premiumPerShare: operationSecurity.getPremierPerShare(),

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        share: value
      } as SecurityDto
    }))
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Share %'
        value={value}
        onValueChange={value => {
          handleChangeSharePercent(Number(value.floatValue))
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

export const sharePercent_validations = () => yup.object().shape({
  share: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .min(1)
    .max(100)
    .required('This field is required'),
});
