import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useContext } from 'react'
import * as yup from 'yup'

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { useAppDispatch } from '@/store'
import { FormSectionContext } from '../../../context/formSection/FormSectionContext'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { updateSecuritiesAtIndex } from '../../../store/securitySlice'

// interface SelectRetroCedantContactProps extends ISecurityInputProps {
//   retroCedantContacts: RetroCedantContactDto[] | undefined
// }

type SelectRetroCedantContactProps = ISecurityInputProps;

export const SelectRetroCedantContact = ({
  index,
  value,
  errorMessage,
  isActiveErrors,
  isDisabled
}: SelectRetroCedantContactProps) => {

  const dispatch = useAppDispatch();
  const { retroCedantContacts } = useContext(FormSectionContext);

  const handleChangeRetroCedantContact = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantContactId = e.target.value
    const retroCedantContact = retroCedantContacts?.find(
      retroCedantContact => retroCedantContact.id === Number(selectedRetroCendantContactId)
    )

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        idCRetroCedantContact: retroCedantContact ? retroCedantContact : ({} as RetroCedantContactDto)
      } as SecurityDto
    }))
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
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{isActiveErrors && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const selectRetroCedantContact_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) =>
  yup.object().shape({
    idCRetroCedantContact: yup
      .object()
      .shape({
        id: yup.number().nullable(),
        name: yup.string().nullable()
      })
      .test('', 'This field is required', value => {
        console.log({ frontingFeeEnabled, value }, 'este no es obligatorio en ningun momento')

        // if (!isGross && value && typeof value === 'object') {
        //   return value.hasOwnProperty('id')
        // }

        return true
      })
  })
