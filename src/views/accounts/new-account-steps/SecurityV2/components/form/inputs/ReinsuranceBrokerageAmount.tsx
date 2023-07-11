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



interface ReinsuranceBrokerageAmountProps extends ISecurityInputProps {
  operationSecurity: CalculateSecurity;
}


export const ReinsuranceBrokerageAmount = ({ index, value, errorMessage, isActiveErrors, isDisabled, operationSecurity }: ReinsuranceBrokerageAmountProps) => {

  const dispatch = useAppDispatch();

  const handleChangeBrokerAgeAmount = (value: number) => {
    // clearInterval(typingTimer)

    // // Iniciar un nuevo intervalo
    // typingTimer = setInterval(() => {
    //   // Código a ejecutar cuando se deja de escribir

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        reinsuranceBrokerage: operationSecurity.getBrokerAgePercent(value)
      } as SecurityDto
    }))

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
        disabled={isDisabled}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {isActiveErrors && errorMessage}
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
