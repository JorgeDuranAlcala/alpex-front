/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'

import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { FormSectionContext } from '../../../context/formSection/FormSectionContext'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { updateSecuritiesAtIndex } from '../../../store/securitySlice'

// interface SelectRetroCedantProps extends ISecurityInputProps {
//   retroCedants: RetroCedantDto[] | undefined
//   setIdRetroCedant: Dispatch<SetStateAction<number | null>>
// }

type SelectRetroCedantProps = ISecurityInputProps;

export const SelectRetroCedant = ({
  index,
  value,
  errorMessage,
  isActiveErrors,
  isDisabled,
}: SelectRetroCedantProps) => {

  const dispatch = useDispatch();
  const { getDatas: { retroCedants } } = useAppSelector(state => state.securitySlice);
  const { updateIdRetroCedant } = useContext(FormSectionContext);

  const [counter, setCounter] = useState(1);


  const handleChangeRetroCedant = (e: SelectChangeEvent<string>) => {
    const selectedRetroCendantId = e.target.value
    const retroCedant = retroCedants?.find(retroCedant => retroCedant.id === Number(selectedRetroCendantId))

    if (retroCedant) {

      dispatch(updateSecuritiesAtIndex({
        index,
        security: {
          idCRetroCedant: retroCedant,
          idCRetroCedantContact: {} as RetroCedantContactDto
        } as SecurityDto
      }))

      updateIdRetroCedant(retroCedant.id)
    }
  }

  useEffect(() => {
    if (counter < 2 && retroCedants && retroCedants?.length > 0) {
      const selectedRetroCendantId = value
      const retroCedant = retroCedants?.find(retroCedant => retroCedant.id === Number(selectedRetroCendantId))

      // console.log('se monta', retroCedant, value, retroCedants)
      if (retroCedant) {
        // console.log('se monta')

        dispatch(updateSecuritiesAtIndex({
          index,
          security: {
            idCRetroCedant: retroCedant,
            idCRetroCedantContact: {} as RetroCedantContactDto
          } as SecurityDto
        }))

        updateIdRetroCedant(retroCedant.id)
        setCounter(2)
      } else {

        dispatch(updateSecuritiesAtIndex({
          index,
          security: {
            idCRetroCedant: {} as RetroCedantDto,
            idCRetroCedantContact: {} as RetroCedantContactDto
          } as SecurityDto
        }));


      }
    }
  }, [retroCedants])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select Retro cedant</InputLabel>
      <Select
        label='Select Retro cedant'
        value={value.toString()}
        onChange={handleChangeRetroCedant}
        labelId='Retrocedant'
        disabled={isDisabled}
      >
        {retroCedants?.map(cedant => (
          <MenuItem key={cedant.name} value={cedant.id}>
            {cedant.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{isActiveErrors && errorMessage}</FormHelperText>
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
        id: yup.number().notRequired(),
        name: yup.string().notRequired()
      })

      .test('', 'This field is required', value => {
        if (!isGross && frontingFeeEnabled) {
          return value && typeof value === 'object' && value.hasOwnProperty('id')
        }

        return true
      })
  })
