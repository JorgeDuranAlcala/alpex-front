import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto';
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto';
import SwitchAlpex from '@/views/custom/switchs';
import { FormControl } from '@mui/material';
import { SetStateAction, useContext } from 'react';
import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

interface SwitchTaxesProps extends Omit<ISecurityInputProps, 'value' | 'isError'> {
  isChecked: boolean;
  security: SecurityDto;
  setIsTaxesEnabled: (value: SetStateAction<boolean>) => void;

}

export const SwitchTaxes = ({ index, validateForm, security, isChecked, setIsTaxesEnabled }: SwitchTaxesProps) => {

  const {
    securities,
    calculateSecurities
  } = useContext(SecurityContext);

  const handleSwitch = () => {
    console.log({ security })
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      idCRetroCedant: {} as RetroCedantDto,
      idCRetroCedantContact: {} as RetroCedantContactDto,

      // frontingFee: Number(null),
      // frontingFeeAmount: Number(null),
      // frontingFeeActive: !security.frontingFeeActive
    }
    setIsTaxesEnabled(() => !isChecked);
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }


  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Taxes </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch} />
      </div>
    </FormControl>
  )
}
