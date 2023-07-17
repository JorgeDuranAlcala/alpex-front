/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
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
  setIdRetroCedant,
  view
}: SelectRetroCedantProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)
  const [retroCedantId, setRetroCedantId] = useState<string>(String(value) || '')

  // const [counter, setCounter] = useState(1)
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
      calculateSecurities(tempSecurities)
      setIdRetroCedant(retroCedant.id)
    }
  }

  useEffect(() => {
    if (retroCedants && retroCedants?.length > 0 && value) {
      setRetroCedantId(String(value))
    }
  }, [value, retroCedants])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select Retro cedant</InputLabel>
      <Select
        label='Select Retro cedant'
        value={retroCedantId}
        onChange={handleChangeRetroCedant}
        labelId='Retrocedant'
        disabled={view === 2}
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
}) => {
  return yup.object({
    idCRetroCedant: yup
      .object({
        id: yup.number().notRequired(),
        name: yup.string().notRequired()
      })

      // Transform the value prior to testing
      .transform(value => {
        // If any child property has a value, skip the transform
        if (value && Object.values(value).some(v => !(v === null || v === undefined || v === ''))) {
          return value
        }

        // Transform the value to undefined
        return { id: -0, name: '' }
      })
      .test('', 'This field is required', value => {
        console.log({ value, frontingFeeEnabled })
        if (!isGross && frontingFeeEnabled) {
          return typeof value === 'object' && value.id !== -0
        }

        return true
      })
  })
}
