import { ForwardedRef, forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import TextField from '@mui/material/TextField'

import { InputAdornment, SxProps, Theme } from '@mui/material'

interface PaymentInformation {
  st?: any
  id?: string | undefined
}

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

export default function PaymentInformation({ id }: PaymentInformation) {
  const [newDueDate, setNewDueDate] = useState<Date>()
  const handleDueDateChange = (date: Date) => {
    const newDueDate = date
    console.log(newDueDate)
    setNewDueDate(newDueDate)
  }

  return (
    <div id={id} className='form-secondContainer-wrapper'>
      <div className='form-secondContainer-wrapper-first-side installments-wrapper'>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Total Premium</span>
          <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Received Premium</span>
          <span className='form-secondContainer-header-subtitle'>$50,000 USD</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Outstanding Premium</span>
          <span className='form-secondContainer-header-subtitle'>$50,000 USD</span>
        </div>
        <div className='form-secondContainer-second'>
          <DatePickerWrapper className='information-datepicker'>
            <DatePicker
              selected={newDueDate}
              shouldCloseOnSelect
              id='expiration-date'
              customInput={<CustomInput label='Expiration date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              className={''}
              onChange={handleDueDateChange}
              showTimeSelect
              showMonthDropdown
              showYearDropdown
              showDisabledMonthNavigation
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='dd/MM/yyyy'
            />
          </DatePickerWrapper>
        </div>
      </div>
    </div>
  )
}
