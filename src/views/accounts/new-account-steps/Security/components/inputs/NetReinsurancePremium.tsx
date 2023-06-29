import {
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import { useContext } from 'react';
import { NumericFormat } from 'react-number-format';
import * as yup from 'yup';

import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

// ! only if we want specific props
// interface NetReinsurancePremiumProps extends ISecurityInputProps {
//
// }

type NetReinsurancePremiumProps = Omit<ISecurityInputProps, 'index' | 'validateForm'>;

export const NetReinsurancePremium = ({ value, errorMessage }: NetReinsurancePremiumProps) => {

  const {
    activeErros,
  } = useContext(SecurityContext);



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
        {activeErros && errorMessage}
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
