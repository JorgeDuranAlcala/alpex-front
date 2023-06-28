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
// interface ShareAmountProps extends ISecurityInputProps {
//
// }

type ShareAmountProps = ISecurityInputProps;

export const ShareAmount = ({ index, value, errorMessage, validateForm }: ShareAmountProps) => {

  const {
    activeErros,

    // securities,
    // calculateSecurities
  } = useContext(SecurityContext);

  const handleChangeShareAmount = (value: number) => {
    console.log('OnChange ShareAmount value: ', { index, value, validateForm });

    // const tempSecurities = [...securities]
    // tempSecurities[index] = {
    //   ...tempSecurities[index],
    //   share: value
    // }
    // validateForm(tempSecurities[index])
    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Share'
        value={value}
        onValueChange={value => {
          handleChangeShareAmount(Number(value.floatValue))
        }}
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

export const shareAmount_validations = () => yup.object().shape({
  shareAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required'),
});
