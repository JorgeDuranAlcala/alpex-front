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

interface PremiumPerShareAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}

// type PremiumPerShareAmountProps = ISecurityInputProps;


export const PremiumPerShareAmount = ({ index, value, errorMessage, isActiveErrors, isDisabled, operationSecurity }: PremiumPerShareAmountProps) => {

  const dispatch = useAppDispatch();

  const handleChangePremiumPerShareAmount = (value: number) => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        share: operationSecurity.getsharePercent(value)
      } as SecurityDto
    }))

  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Premium per share'
        value={value}
        onChange={e => {
          handleChangePremiumPerShareAmount(Number(e.target.value))
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

export const premiumPerShareAmount_validations = () => yup.object().shape({
  premiumPerShareAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required'),
});
