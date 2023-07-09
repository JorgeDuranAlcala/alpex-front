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


// ! only if we want specific props
interface DynamicComissionAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity
}


export const DynamicComissionAmount = ({ index, value, errorMessage, validateForm, operationSecurity }: DynamicComissionAmountProps) => {

  const {
    activeErros,
    securities,
    calculateSecurities
  } = useContext(SecurityContext);



  const handleChangeDynamicComissionAmount = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: operationSecurity.getDynamicComissionPercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Dynamic comission'
        value={value}
        onValueChange={value => {
          handleChangeDynamicComissionAmount(Number(value.floatValue))
        }}
        prefix={'$'}
        customInput={TextField}
        decimalScale={2}
        thousandSeparator=','
        disabled={securities[index].view === 2}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {activeErros && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const dynamicComissionAmount_validations = () => yup.object().shape({
  dynamicCommissionAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0

      return +val > 0
    })
    .required('This field is required'),
});
