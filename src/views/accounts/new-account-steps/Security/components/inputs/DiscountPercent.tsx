import {
  FormControl,
  TextField
} from '@mui/material';
import { useContext } from 'react';
import { NumericFormat } from 'react-number-format';

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';
import { CalculateSecurity } from '../../utils/calculates-securities';
import { DiscountsContext } from '../discounts/DiscountsContext';


// ! only if we want specific props
interface DiscountPercentProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number;
  operationSecurity: CalculateSecurity;
}



export const DiscountPercent = ({ discountIndex, value, operationSecurity }: DiscountPercentProps) => {

  // const {
  //   // securities,
  //   // calculateSecurities
  // } = useContext(SecurityContext);

  const { updateDiscountByIndex } = useContext(DiscountsContext);

  const handleChangeDiscountPercent = (value: number) => {
    console.log('number')
    updateDiscountByIndex({
      index: discountIndex,
      discountPercent: value,
      discountAmount: operationSecurity.getDiscountAmount(value),
    });

    // const tempSecurities = [...securities]
    // tempSecurities[index] = {
    //   ...tempSecurities[index],
    //   share: value
    // }
    // validateForm(tempSecurities[index])
    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <NumericFormat
        autoFocus
        label='Discount %'
        value={value}
        onChange={e => {
          handleChangeDiscountPercent(Number(e.target.value.replace('%', '')))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
      />
    </FormControl>
  )
}

