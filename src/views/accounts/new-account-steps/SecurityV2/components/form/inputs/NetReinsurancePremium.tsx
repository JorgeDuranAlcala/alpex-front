import {
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import * as yup from 'yup';

import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface';

// ! only if we want specific props
// interface NetReinsurancePremiumProps extends ISecurityInputProps {
//
// }

type NetReinsurancePremiumProps = Omit<ISecurityInputProps, 'index' | 'validateForm'>;

export const NetReinsurancePremium = ({ value, errorMessage, isActiveErrors }: NetReinsurancePremiumProps) => {




  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        fullWidth
        label='Net reinsurance premium'
        value={value}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={true}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {isActiveErrors && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const netReinsurancePremium_validations = () => yup.object().shape({
  netReinsurancePremium: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .required('This field is required')
    .min(1, 'The number must be greater than 0!'),
});
