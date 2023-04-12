// ** React Imports
import { ForwardedRef, forwardRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// ** Third Party Imports
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

interface PickerProps {
  label?: string;
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      {...props}
    />
  );
});

const FilterMenuEffectiveDate = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px 0', position: 'relative' }}>
      <DatePickerWrapper>
        <DatePicker
          id='due-date'
          customInput={<CustomInput />}

          //portalId='DIEGO'
          popperPlacement='bottom-end'
          onChange={(date: Date) => console.log(date)}
        />
      </DatePickerWrapper>
    </Box>
  );
};

export default FilterMenuEffectiveDate;