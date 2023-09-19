import { ContainerInputs, StyledTextarea, TitleInputs } from '@/styles/Claims/ContractStyles/contractStyles'
import { Box, Button, FormControl, Grid, InputLabel, Select, TextField, Typography } from '@mui/material'

// ** Third Party Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import CustomInput from '@/views/claims/ContractView/Components/CustomInput'
import DatePicker from 'react-datepicker'
import Icon from 'src/@core/components/icon'

const ClaimRegister = () => {
  const handlechangeValue = (event: KeyboardEvent) => {
    event.preventDefault()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 5, sm: 5, md: 5 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Box>
            <Typography variant='h6'>Information</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>DOL</TitleInputs>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                shouldCloseOnSelect
                id='reception-date'
                customInput={<CustomInput label='Date of Occurrence of the Claim' sx={{ width: '100%' }} />}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
                placeholderText='DD/MM/YYYY'
                onChange={() => handlechangeValue}
              />
            </DatePickerWrapper>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Report Date</TitleInputs>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                shouldCloseOnSelect
                id='reception-date'
                customInput={<CustomInput label='Report/Notice Date' sx={{ width: '100%' }} />}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
                placeholderText='DD/MM/YYYY'
                onChange={() => handlechangeValue}
              />
            </DatePickerWrapper>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Client Reference</TitleInputs>
            <FormControl fullWidth>
              <TextField autoFocus name='customerId' label='Customer ID' value={'00000'} disabled />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ContainerInputs>
            <TitleInputs>Cause</TitleInputs>
            <FormControl fullWidth>
              <StyledTextarea />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Location of Claim</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Location Name</InputLabel>
              <Select name='locationName' label='Location Name' defaultValue={''} labelId='location-name'></Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField autoFocus name='address' label='Address' value={''} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select name='state' label='State' defaultValue={''} labelId='state'></Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select name='city' label='City' defaultValue={''} labelId='city'></Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Municipality/Province</InputLabel>
              <Select
                name='municipalityProvince'
                label='Municipality/Province'
                defaultValue={''}
                labelId='municipality-province'
              ></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Claim Status</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name='statusClaim' label='Status' defaultValue={''} labelId='status-claim'></Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>CESAS</InputLabel>
              <Select name='cesas' label='CESAS' defaultValue={''} labelId='cesas'></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Expert</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Expert</InputLabel>
              <Select name='expert' label='Expert' defaultValue={''} labelId='expert'></Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Executive</InputLabel>
              <Select name='executive' label='Executive' defaultValue={''} labelId='executive'></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Adjuster</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Adjuster</InputLabel>
              <Select name='adjuster' label='Adjuster' defaultValue={''} labelId='adjuster'></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '40px', textAlign: 'start' }}>
        <Button className='create-contact-btn'>
          ADD FILES
          <div className='btn-icon'>
            <Icon icon='mdi:plus-circle-outline' />
          </div>
        </Button>
      </Box>
    </Box>
  )
}

export default ClaimRegister
