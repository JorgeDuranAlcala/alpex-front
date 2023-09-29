
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps';
import { OptionsARAPTransaction as options } from '../../../constants/OptionsARAPTransaction';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';

export const SelectTransaction = ({ selectedValue, onChange }: InputSelectProps) => {

  const {handleSaveMasterFilters} = useMasterFiltersStorage();

  const handleOnChange = (e: SelectChangeEvent<string>) => {
    
    handleSaveMasterFilters({
      items: options || [],
      saveValue: e.target.value,
      itemFieldFilter: 'value',
      itemFieldValue: 'text',
      type: 'transactionType'
    })
    onChange(e);
  }


  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Transaction</InputLabel>

      <Select
        name='transactionType'
        label='Select Transaction'
        value={selectedValue}
        onChange={handleOnChange}
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
