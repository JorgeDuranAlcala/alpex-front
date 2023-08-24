import { FormControl, TextField } from '@mui/material';
import { InputProps } from '../../../interfaces/InputProps';

export const TextId = ({ value, onChange }: InputProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

      {/* <InputLabel>ID</InputLabel> */}
      <TextField
        name="id"
        label="ID"
        type="number"
        value={value}
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
      />
    </FormControl>
  )
}
