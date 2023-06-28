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
// interface FrontingFeePercentProps extends ISecurityInputProps {
//
// }

type FrontingFeePercentProps = ISecurityInputProps;

export const FrontingFeePercent = ({ index, value, errorMessage, validateForm }: FrontingFeePercentProps) => {

  const {
    activeErros,
    securities,
    calculateSecurities
  } = useContext(SecurityContext);

  const handleChangeFrontingFeePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Fronting fee %'
        value={value}
        onValueChange={value => {
          handleChangeFrontingFeePercent(Number(value.floatValue))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {activeErros && errorMessage}
      </FormHelperText>
    </FormControl>
  )
}

export const frontingFeePercent_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) => yup.object().shape({
  frontingFee: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0
      if (frontingFeeEnabled) return +val > 0

      return true
    })
    .required('This field is required')

    .max(100),
});
