

import DatePickerWrapper from '@/@core/styles/libs/react-datepicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Grid,
  InputAdornment, SxProps, TextField,
  Theme
} from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import type { InputDateProps } from '../../../interfaces/InputDate';


export const InputDate = ({ value, onChange }: InputDateProps) => {
  return (

    <Grid item xs={12} sm={12} sx={{ width: '100%' }}>
      <DatePickerWrapper className='information-datepicker'>
        <DatePicker
          selected={new Date(value)}
          shouldCloseOnSelect
          id='date'
          customInput={<CustomInput label='Date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
          onChange={onChange}

          // showTimeSelect
          showMonthDropdown
          showYearDropdown
          showDisabledMonthNavigation
          dateFormat='dd/MM/yyyy'
        />
      </DatePickerWrapper>
    </Grid>
  )
}
interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}
/* eslint-disable */
const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id='date-textfield'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})
