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


interface ReinsuranceBrokerageAmountProps extends ISecurityInputProps {

  operationSecurity: CalculateSecurity;
}


export const ReinsuranceBrokerageAmount = ({ index, value, errorMessage, operationSecurity, validateForm }: ReinsuranceBrokerageAmountProps) => {

  const {
    activeErros,
    securities,
    calculateSecurities
  } = useContext(SecurityContext);

  const handleChangeBrokerAgeAmount = (value: number) => {
    // clearInterval(typingTimer)

    // // Iniciar un nuevo intervalo
    // typingTimer = setInterval(() => {
    //   // Código a ejecutar cuando se deja de escribir
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: operationSecurity.getBrokerAgePercent(value)
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)

    //   // Limpiar el intervalo
    //   clearInterval(typingTimer)
    // }, doneTypingInterval)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Reinsurance brokerage'
        value={value}
        onValueChange={value => {
          handleChangeBrokerAgeAmount(Number(value.floatValue))
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

export const reinsuranceBrokerageAmount_validations = ({ isGross }: { isGross: boolean }) => yup.object().shape({
  brokerAgeAmount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('', 'This field is required', value => {
      const val = value || 0
      if (isGross) return +val > 0

      return true
    }),
});
