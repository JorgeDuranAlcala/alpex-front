import { FormControl, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';
import { InputProps } from '../../../interfaces/InputProps';

let timeout: ReturnType<typeof setTimeout> | null = null
interface TextIdProps extends InputProps {
  
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TextId = ({ value, onChange }: TextIdProps) => {

  const {handleSaveMasterFilters} = useMasterFiltersStorage();
  const [inputValue, setInputValue] = useState(value)

  const handleOnChange = (e:  ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
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
      
    }, 500)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])
  

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

      {/* <InputLabel>ID</InputLabel> */}
      <TextField
        name="id"
        label="ID"
        type="number"
        value={inputValue}
        onChange={handleOnChange}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}
