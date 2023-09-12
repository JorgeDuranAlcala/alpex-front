import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { InputAdornment, SxProps, Theme } from '@mui/material'
import TextField from '@mui/material/TextField'
import { ForwardedRef, forwardRef } from 'react'

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id='date-textfield'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})

export default CustomInput
