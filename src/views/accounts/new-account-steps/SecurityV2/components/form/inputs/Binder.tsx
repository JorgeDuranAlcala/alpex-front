import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { useAppDispatch } from '@/store'
import { useContext, useEffect, useState } from 'react'
import { FormSectionContext } from '../../../context/formSection/FormSectionContext'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { updateSecuritiesAtIndex } from '../../../store/securitySlice'

// const NoBindersContainer = styled(Box)(({ theme }) => ({
//   // backgroundColor: 'lightblue',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '56px',
//   padding: '16.5px 0px',
//   marginBottom: '24px',
//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   }
// }))

type BinderProps = Omit<ISecurityInputProps, 'errorMessage' | 'validateForm'>;

export const Binder = ({ value, index, isDisabled }: BinderProps) => {

  const dispatch = useAppDispatch();
  const { binders } = useContext(FormSectionContext)

  const [selectedBinder, setSelectedBinder] = useState<ReinsuranceCompanyBinderDto | null>(null)

  const handleOnChangeBinder = (value: number) => {
    const binderSelect = binders.find(b => b.id === value)

    // console.log('se monta', retroCedant, value, retroCedants)
    if (binderSelect) {
      // console.log('se monta')
      dispatch(updateSecuritiesAtIndex({
        index,
        security: {
          idCReinsuranceCompanyBinder: binderSelect
        } as SecurityDto
      }))

      setSelectedBinder(binderSelect)
    }
  }

  useEffect(() => {
    if (binders && binders.length > 0 && value) {
      const binderSelect = binders.find(b => b.id === value)
      binderSelect && setSelectedBinder(binderSelect)
    }
  }, [binders, value])

  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <InputLabel id='Binder'>Binder</InputLabel>
      <Select
        label='Binder'
        value={selectedBinder && binders.length > 0 ? selectedBinder.id : value.toString()}
        labelId='binder'
        disabled={isDisabled || binders.length === 0}
        onChange={e => handleOnChangeBinder(Number(e.target.value))}
      >
        {binders?.map(binder => (
          <MenuItem key={binder.id} value={binder.id}>
            {binder.referenceNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
