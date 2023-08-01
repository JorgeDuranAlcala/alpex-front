/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import Icon from 'src/@core/components/icon'

import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import * as yup from 'yup'

import { SelectAnchor } from '@/@core-custom/inputs/SelectAnchor'
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
  const handleChangeRetroCedant = (e: SelectChangeEvent<string> | any) => {
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
      setIdRetroCedant(retroCedant.id)
      calculateSecurities(tempSecurities)
    }
  }

  const handleRemoveRetroCedant = () => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      idCRetroCedant: null,
      idCRetroCedantContact: {} as RetroCedantContactDto
    }
    setIdRetroCedant(null);
    setRetroCedantId('')
    calculateSecurities(tempSecurities)
    validateForm(tempSecurities[index])
  }

  useEffect(() => {
    if (retroCedants && retroCedants?.length > 0 && value) {
      setRetroCedantId(String(value))
    }
  }, [value, retroCedants])

  return (
    <FormControl fullWidth sx={{ mb: 2, position: 'relative' }}>
      <InputLabel>Select Retro cedant</InputLabel>
      <SelectAnchor
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
      </SelectAnchor>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>

      {retroCedantId ? (
        <Box sx={{
          position: 'absolute',
          right: '-35px',
          top: '-10px'
        }}>
          <IconButton onClick={handleRemoveRetroCedant}>
            <Icon icon='clarity:remove-line' />
          </IconButton>

        </Box>
      ) : null}
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
        if (!isGross && frontingFeeEnabled) {
          return typeof value === 'object' && value.id !== undefined && value.id !== -0
        }

        return true
      })
  })
}
