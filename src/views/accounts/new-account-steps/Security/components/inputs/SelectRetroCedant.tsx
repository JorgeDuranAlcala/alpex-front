import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Dispatch, SetStateAction, useContext } from 'react'
import * as yup from 'yup'

import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SelectRetroCedantProps extends ISecurityInputProps {
  retroCedants: RetroCedantDto[] | undefined
  setIdRetroCedant: Dispatch<SetStateAction<number | null>>
}

export const SelectRetroCedant = ({
  index,
  value,
  errorMessage,
  retroCedants,
  validateForm,
  setIdRetroCedant
}: SelectRetroCedantProps) => {
  const { activeErros, securities, setSecurities } = useContext(SecurityContext)

  const handleChangeRetroCedant = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantId = e.target.value
    const retroCedant = retroCedants?.find(retroCedant => retroCedant.id === Number(selectedRetroCendantId))
    const tempSecurities = [...securities]
    if (retroCedant) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCRetroCedant: retroCedant,
        idCRetroCedantContact: {} as RetroCedantContactDto
      }
      validateForm(tempSecurities[index])
      setSecurities(tempSecurities)
      setIdRetroCedant(retroCedant.id)
    }
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select Retro cedant</InputLabel>
      <Select
        label='Select Retro cedant'
        value={value.toString()}
        onChange={handleChangeRetroCedant}
        labelId='Retrocedant'
      >
        {retroCedants?.map(cedant => (
          <MenuItem key={cedant.name} value={cedant.id}>
            {cedant.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const selectRetroCedant_validations = ({
  frontingFeeEnabled,
  isGross
}: {
  frontingFeeEnabled: boolean
  isGross: boolean
}) =>
  yup.object().shape({
    idCRetroCedant: yup
      .object()
      .shape({
        id: yup.number().nullable().notRequired(),
        name: yup.string().nullable().notRequired()
      })
      .test('', 'This field is required', value => {
        if (!isGross && frontingFeeEnabled && value && typeof value === 'object') {
          return value.hasOwnProperty('id')
        }

        return true
      })
      .required('This field is required')
  })
