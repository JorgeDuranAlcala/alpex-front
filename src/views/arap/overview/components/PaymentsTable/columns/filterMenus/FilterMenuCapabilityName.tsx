// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Icon Imports


import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'


import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker'
import { EFieldColumn } from '../efieldColumn'

interface CapabilityNameOptions {
  id: string;
  capability_id: number;
  label: string;
  type: 'broker' | 'reinsurer'
}

interface FilterMenuCapabilityNameProps {
  handleClose?: () => void
}
const FilterMenuCapabilityName = ({ handleClose }: FilterMenuCapabilityNameProps) => {

  const { handleChangeFilters, handleDeleteFilters } = useContext(PaymentsContext);
  
  const { brokers } = useBrokerGetAll();
  const { reinsuranceCompany: reinsurers } = useGetAllReinsuranceCompanies();
  const [selectedValue, setSelectedValue] = useState<CapabilityNameOptions | null>(null);
  

  const getBrokerOptions = (brokers: BrokerDto[]):CapabilityNameOptions [] => {
    return brokers.map(broker => {
      return {
        id: 'broker_'+ broker.id,
        capability_id: broker.id,
        label: broker.name,
        type: 'broker'
      }
    })
  }

  const getReinsurerOptions = (reinsurers:  ReinsuranceCompanyDto[] | undefined):CapabilityNameOptions [] => {

    if (!reinsurers) return [];

    return reinsurers.map(reinsurer => {
      return {
        id: 'reinsurer_'+ reinsurer.id,
        capability_id: reinsurer.id,
        label: reinsurer.name,
        type: 'reinsurer'
      }
    })
  }

  const capabilityNameOptions: CapabilityNameOptions[] = [
    ...getBrokerOptions(brokers), 
    ...getReinsurerOptions(reinsurers)
  ].sort((a, b) => {
    return a.label.localeCompare(b.label)
  })

  
  const handleOnChangeSearch = (value: CapabilityNameOptions | null) => {
    console.log('value', value)
    setSelectedValue(value);
    if (!value) {
      handleDeleteFilters(EFieldColumn.CAPABILITY_NAME)
      return;
    }

    handleChangeFilters({
      type: value.type,
      subtype: EFieldColumn.CAPABILITY_NAME,
      value: value.capability_id,
      text: `${value.label}`
    })

    if (handleClose) {
      handleClose();
    }
  }

  // const handleCloseOnEnter = (key: string) => {
  //   if (handleClose && key === 'Enter') {

  //     handleClose();
  //   }
  // }

  return (
    <Autocomplete
      id="capability-name-select"
      sx={{ width: 300 }}
      options={capabilityNameOptions}
      isOptionEqualToValue={(option, value) => option.capability_id === value.capability_id}
      autoHighlight
      value={selectedValue}
      onChange={(event: any, newValue: CapabilityNameOptions | null) => {
        
          handleOnChangeSearch(newValue);
        }}
      getOptionLabel={(option) => option.label }
      renderOption={(props, option) => (
        <Box component="li" sx={{ position: 'relative', }} {...props}>
          <Chip 
            size="small"
            color='primary'
            label={option.type} 
            sx={{
              position: 'absolute',
              top: '5px',
              right: 0, 
              zIndex: 1,
              opacity: 0.8
            }}
          />
          <Box sx={{paddingTop: '25px' }}>

          {option.label}
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a capability"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}

export default FilterMenuCapabilityName
