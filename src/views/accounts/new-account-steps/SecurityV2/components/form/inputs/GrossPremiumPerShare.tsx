import {
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import * as yup from 'yup';

import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface';

// interface GrossPremiumPerShareAmountProps extends ISecurityInputProps {
// }

type GrossPremiumPerShareAmountProps = ISecurityInputProps


export const GrossPremiumPerShareAmount = ({ index, value, errorMessage, isActiveErrors, isDisabled }: GrossPremiumPerShareAmountProps) => {


  const handleChangeGrossPremiumPerShareAmount = (value: number) => {
    console.log('gross Premium PerShare value', { value, index });


    // const tempSecurities = [...securities]
    // tempSecurities[index] = {
    //   ...tempSecurities[index],
    //   share: operationSecurity.getsharePercent(value)
    // }
    // validateForm(tempSecurities[index])
    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Gross Premium per share'
        value={value}
        onValueChange={value => {
          handleChangeGrossPremiumPerShareAmount(Number(value.floatValue))
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

export const grossPremiumPerShareAmount_validations = () => yup.object().shape({
  grossPremiumPerShareAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required'),
});
