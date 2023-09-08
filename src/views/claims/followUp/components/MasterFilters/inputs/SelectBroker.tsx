import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { InputSelectProps } from '../../../interfaces/InputSelectProps'

export const SelectBroker = ({ selectedValue, onChange }: InputSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel>All</InputLabel>

      <Select
        name='broker'
        label='Select Broker'
        value={selectedValue}
        onChange={onChange}
        labelId='broker'
        sx={{ height: '42px', width: '100%' }}
      >
        <MenuItem value='all'>All</MenuItem>
        <MenuItem key={null} value={''}>
          No options available
        </MenuItem>
      </Select>
    </FormControl>
  )
}
