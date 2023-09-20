import { ContainerInputs } from '@/styles/Claims/ContractStyles/contractStyles'
import { Box, Button, FormControl, Grid, InputLabel, Select, TextField } from '@mui/material'

// ** Third Party Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import CustomInput from '@/views/claims/ContractView/Components/CustomInput'
import DatePicker from 'react-datepicker'
import Icon from 'src/@core/components/icon'

const FollowData = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 5, sm: 5, md: 5 }}>
        <Grid item xs={12} sm={12} md={12} marginTop={4}>
          <ContainerInputs>
            <FormControl fullWidth>
              {/* <StyledTextarea placeholder='Note' /> */}
              <TextField id='outlined-multiline-static' label='Note' multiline rows={1} defaultValue='' />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                shouldCloseOnSelect
                id='date'
                customInput={<CustomInput label='Date' sx={{ width: '100%' }} />}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
                placeholderText='DD/MM/YYYY'
                onChange={() => console.log('Change')}
              />
            </DatePickerWrapper>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <FormControl fullWidth>
              <InputLabel>Executive</InputLabel>
              <Select name='executive' label='Executive' defaultValue={''} labelId='executive'></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '40px', textAlign: 'start' }}>
        <Button className='create-contact-btn'>
          ADD FILE
          <div className='btn-icon'>
            <Icon icon='mdi:plus-circle-outline' />
          </div>
        </Button>
      </Box>
    </Box>
  )
}

export default FollowData
