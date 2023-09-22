
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps';
import { OptionsARAPTransaction as options } from '../../../constants/OptionsARAPTransaction';

export const SelectTransaction = ({ selectedValue, onChange }: InputSelectProps) => {


  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Transaction</InputLabel>

      <Select
        name='transaction'
        label='Select Transaction'
        value={selectedValue}
        onChange={onChange}
        labelId='transaction'
      >
        <MenuItem value="all">
          ALL
        </MenuItem>
        {options && options.length > 0 ? (
          options.map(option => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.text.toUpperCase()}
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
