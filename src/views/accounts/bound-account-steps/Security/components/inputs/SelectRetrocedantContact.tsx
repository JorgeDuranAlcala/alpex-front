import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'

import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { SecurityContext } from '../../SecurityViewBound'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SelectRetroCedantContactProps extends ISecurityInputProps {
  retroCedantContacts: RetroCedantContactDto[] | undefined
}

export const SelectRetroCedantContact = ({
  index,
  value,
  errorMessage,
  isDisabled,
  retroCedantContacts,
  validateForm,
  view
}: SelectRetroCedantContactProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)
  const [retroCedantContactId, setRetroCedantContactId] = useState<string>(String(value) || '')

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
    calculateSecurities(tempSecurities)
  }
  useEffect(() => {
    if (retroCedantContacts && value) setRetroCedantContactId(String(value))
  }, [value, retroCedantContacts])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select Retro Cedant contact</InputLabel>
      <Select
        label='Select Retro Cedant contact '
        value={retroCedantContactId}
        onChange={handleChangeRetroCedantContact}
        labelId='RetroCedantcontact'
        disabled={view === 2 || isDisabled}
      >
        {retroCedantContacts?.map(contact => (
          <MenuItem key={contact.name} value={contact.id}>
            {contact.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
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

        return true
      })
  })
