import { FormControl, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';
import { InputProps } from '../../../interfaces/InputProps';


interface TextIdProps extends InputProps {
  
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextId = ({ value, onChange }: TextIdProps) => {

  const {handleSaveMasterFilters} = useMasterFiltersStorage();

  const handleOnChange = (e:  ChangeEvent<HTMLInputElement>) => {
    
    handleSaveMasterFilters({
      items:  [{
        value: +e.target.value,
        text: e.target.name
      }],
      saveValue: e.target.value,
      itemFieldFilter: 'value',
      itemFieldValue: 'text',
      type: 'id'
    })
    onChange(e);
  }

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

      {/* <InputLabel>ID</InputLabel> */}
      <TextField
        name="id"
        label="ID"
        type="number"
        value={value}
        onChange={handleOnChange}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}
