import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useContext } from 'react';
import * as yup from 'yup';

import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto';
import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';


interface SelectRetroCedantContactProps extends ISecurityInputProps {
  retroCedantContacts: RetroCedantContactDto[] | undefined;
}


export const SelectRetroCedantContact = ({ index, value, isError, isDisabled, retroCedantContacts, validateForm,
}: SelectRetroCedantContactProps) => {

  const {
    activeErros,
    securities,
    setSecurities,
  } = useContext(SecurityContext);


  const handleChangeRetroCedantContact = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantContactId = e.target.value
    const retroCedantContact = retroCedantContacts?.find(
      retroCedantContact => retroCedantContact.id === Number(selectedRetroCendantContactId)
    )
    const tempSecurities = [...securities]

    tempSecurities[index] = {
      ...tempSecurities[index],
      idCRetroCedantContact: retroCedantContact ? retroCedantContact : ({} as RetroCedantContactDto)
    }
    validateForm(tempSecurities[index])
    setSecurities(tempSecurities)
  }


  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select Retro Cedant contact</InputLabel>
      <Select
        label='Select Retro Cedant contact '
        value={value.toString()}
        onChange={handleChangeRetroCedantContact}
        labelId='RetroCedantcontact'
        disabled={isDisabled}
      >
        {retroCedantContacts?.map(contact => (
          <MenuItem key={contact.name} value={contact.id}>
            {contact.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {activeErros && isError}
      </FormHelperText>
    </FormControl>
  )
}

export const selectRetroCedantContact_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) => yup.object().shape({
  idCRetroCedantContact: yup
    .object()
    .shape({
      id: yup.number().nullable().notRequired(),
      name: yup.string().nullable().notRequired()
    })
    .test('', 'This field is required', value => {
      if (frontingFeeEnabled && value && typeof value === 'object') {
        return value.hasOwnProperty('id')
      }

      return true
    }),
});
