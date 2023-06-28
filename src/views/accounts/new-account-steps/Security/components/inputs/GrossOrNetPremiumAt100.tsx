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


interface GrossOrNetPremiumAt100Props extends ISecurityInputProps {
  isGross: boolean;

}

export const GrossOrNetPremiumAt100 = ({ index, isGross, value, errorMessage, validateForm }: GrossOrNetPremiumAt100Props) => {

  const {
    activeErros,
    securities,
    calculateSecurities
  } = useContext(SecurityContext);

  const handleChangeBaseAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      netPremiumAt100: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        fullWidth
        autoFocus
        label={isGross ? 'Gross premium at %100' : 'Net premium at %100'}
        value={value}
        onValueChange={value => {
          handleChangeBaseAmount(Number(value.floatValue))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {activeErros && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const grossOrNetPremiumAt100_validations = () => yup.object().shape({
  netPremiumAt100: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required')
});
