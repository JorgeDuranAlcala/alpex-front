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
import { CalculateSecurity } from '../../utils/calculates-securities';

interface FrontingFeeAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}


export const FrontingFeeAmount = ({ index, value, errorMessage, validateForm, operationSecurity }: FrontingFeeAmountProps) => {

  const {
    activeErros,
    securities,
    calculateSecurities
  } = useContext(SecurityContext);

  const handleChangeFrontingFeeAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: operationSecurity.getFrontingFeePercent(value),
      frontingFeeAmount: value,
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (

    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Taxes'
        value={value}
        onChange={e => {
          handleChangeFrontingFeeAmount(Number(e.target.value))
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

export const frontingFeeAmount_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) => yup.object().shape({
  frontingFeeAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0
      if (frontingFeeEnabled) return +val > 0

      return true
    })
    .required('This field is required')
});
