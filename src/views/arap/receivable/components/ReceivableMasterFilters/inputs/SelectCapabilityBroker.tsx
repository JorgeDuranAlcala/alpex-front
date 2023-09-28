import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps'
import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker'

export const SelectCapabilityBroker = ({ selectedValue, onChange, isDisabled }: InputSelectProps) => {
  const { brokers } = useBrokerGetAll()

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
      <InputLabel>Capability</InputLabel>

      <Select
        name='broker'
        label='Select Capability'
        value={selectedValue}
        onChange={onChange}
        labelId='broker'
        disabled={isDisabled}
      >
        <MenuItem value='all'>ALL</MenuItem>
        {brokers.length > 0 ? (
          brokers.map(broker => {
            return (
              <MenuItem key={broker.id} value={broker.id}>
                {broker.name}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem key={null} value={''}>
            No options available
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
