// ** React Imports
import { ForwardedRef, forwardRef, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import DatePicker from 'react-datepicker';

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes';
import colors from '../../colors';
import fonts from '../../font';

interface PickerProps {
  label?: string;
}

const CustomInputWithIcon = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      variant="standard"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon icon='mdi:calendar-blank' fontSize={20} />
          </InputAdornment>
        ),
      }}
      sx={{ 
        width: { sm: '180px', xs: '150px' }, 
        padding:'0', 
        '& .MuiInputBase-input': { color: 'text.secondary',fontFamily:fonts.inter },
        '& .MuiFormLabel-root':{padding:'0', fontFamily:fonts.inter}
       }}
      {...props}
    />
  );
});

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      variant="standard"
      sx={{ 
        width: { sm: '180px', xs: '150px' }, 
        padding:'0',
        '& .MuiInputBase-input': { color: 'text.secondary',fontFamily:fonts.inter },
        '& .MuiFormLabel-root':{padding:'0', fontFamily:fonts.inter}
       }}
      {...props}
    />
  );
});


const FilterMenuEffectiveDate = () => {
  const [effectiveDate, setEffectiveDate] = useState<DateType>(new Date())
  const [month, setMonth] = useState<DateType>(new Date())
  const [year, setYear] = useState<DateType>(new Date())

return (
    <>
      <Box component={'li'} sx={{padding:'8px 16px 12px 16px'}}>
        <DatePickerWrapper>
        <DatePicker
            selected={effectiveDate}
            shouldCloseOnSelect
            id='effective-date'
            customInput={
              <CustomInputWithIcon
                label='Write a full date'
              />
            }
            onChange={(date: Date) => setEffectiveDate(date)}
            popperProps={{strategy: 'fixed'}} 
            popperPlacement="right"
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [120, 10],
                },
              },
            ]}
          />
        </DatePickerWrapper>
      </Box>

      <Box component={'li'} sx={{padding:'12px 16px'}}>
        <Divider textAlign="left" sx={{fontFamily:fonts.inter, color:colors.text.disabled}}>or</Divider>
      </Box>
      
      <Box component={'li'} sx={{padding:'12px 16px 8px 16px'}}>
        <Box sx={{marginBottom:'12px'}}>
          <DatePickerWrapper>
          <DatePicker
              showMonthYearPicker
              dateFormat="MMMM"
              selected={month}
              shouldCloseOnSelect
              id='month'
              customInput={
                <CustomInput
                  label='By month'
                />
              }
              onChange={(date: Date) => setMonth(date)}
              popperClassName='account-datepicker-popper-only-month'
              popperProps={{strategy: 'fixed'}} 
              popperPlacement="right"
              popperModifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [120, 10],
                  },
                },
              ]}
            />
          </DatePickerWrapper>
        </Box>

        <Box sx={{marginBottom:'12px'}}>
          <DatePickerWrapper>
            <DatePicker
                showYearPicker
                dateFormat="yyyy"
                selected={year}
                shouldCloseOnSelect
                id='year'
                customInput={
                  <CustomInput
                    label='By year'
                  />
                }
                onChange={(date: Date) => setYear(date)}
                popperProps={{strategy: 'fixed'}} 
                popperPlacement="right"
                popperModifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [120, 10],
                    },
                  },
                ]}
              />
            </DatePickerWrapper>
        </Box>
      </Box>
      <Box component={'li'} sx={{padding:'0 16px 12px 16px', textAlign:'center'}}>
        <Button sx={{fontFamily:fonts.inter}} variant="outlined">APPLY FILTER</Button>
      </Box>
    </>
  );
};

export default FilterMenuEffectiveDate;