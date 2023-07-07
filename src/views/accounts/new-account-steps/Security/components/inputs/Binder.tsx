import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { useContext, useEffect, useState } from 'react'
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

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

interface BinderProps extends Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'> {
  binders: ReinsuranceCompanyBinderDto[]
  index: number
}

export const Binder = ({ value, binders, index }: BinderProps) => {
  const { securities, setSecurities } = useContext(SecurityContext)
  const [selectedBinder, setSelectedBinder] = useState<ReinsuranceCompanyBinderDto | null>(null)

  const handleOnChangeBinder = (value: number) => {
    const binderSelect = binders.find(b => b.id === value)
    const tempSecurities = [...securities]

    // console.log('se monta', retroCedant, value, retroCedants)
    if (binderSelect) {
      // console.log('se monta')

      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompanyBinder: binderSelect
      }

      setSelectedBinder(binderSelect)
      setSecurities(tempSecurities)
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
        disabled={binders.length === 0 || securities[index].view === 2}
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
