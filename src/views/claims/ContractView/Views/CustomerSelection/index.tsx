//Import MUI Material

import { Box, Button, FormControl, Grid, InputLabel, Select } from '@mui/material'
import TextField from '@mui/material/TextField'
import CustomInput from '../../Components/CustomInput'

//Import Styled Components
import { ContainerInputs, ContainerInstallments, TitleInputs } from '@/styles/Claims/ContractStyles/contractStyles'

// ** Third Party Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'

import { Status } from '@/views/arap/overview/components/PaymentsTable/renderedCells/Status'
import Icon from 'src/@core/components/icon'

import DatePicker from 'react-datepicker'
import { NumericFormat } from 'react-number-format'
import PickersTime from '../../Components/PickerTime'

const CustomerSelection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 5, sm: 5, md: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Client</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Name of Client</InputLabel>
              <Select
                name='economicSector'
                label='Name of Client'
                defaultValue={''}
                // value={String(basicInfo.economicSector)}
                // onChange={handleSelectChange}
                labelId='economic-sector'
              ></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Payment Satus</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name='economicSector'
                label='Status'
                defaultValue={''}
                // value={String(basicInfo.economicSector)}
                // onChange={handleSelectChange}
                labelId='economic-sector'
              ></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Sum Insured</TitleInputs>
            <FormControl fullWidth>
              <NumericFormat
                name='limit'
                value={'0'}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='limit'
                label='Sum Insured'
                multiline
                variant='outlined'
                prefix='$'
                decimalScale={2}
              />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Contact Number</TitleInputs>
            <FormControl fullWidth>
              <TextField autoFocus name='contractNumber' label='Contract ID' value={'00000'} disabled />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Installments</TitleInputs>
            <ContainerInstallments>
              <DatePickerWrapper className='information-datepicker' width={'80%'}>
                <DatePicker
                  shouldCloseOnSelect
                  id='reception-date'
                  customInput={<CustomInput label='Installment 1' sx={{ width: '100%' }} />}
                  showTimeSelect
                  showMonthDropdown
                  showYearDropdown
                  showDisabledMonthNavigation
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='dd/MM/yyyy h:mm aa'
                />
              </DatePickerWrapper>
              <Box sx={{ width: '23.77%' }}>
                <Status status='paid' fontSize='13px' padding='4px 12px' />
              </Box>
            </ContainerInstallments>
            <ContainerInstallments>
              <DatePickerWrapper className='information-datepicker' width={'80%'}>
                <DatePicker
                  shouldCloseOnSelect
                  id='reception-date'
                  customInput={<CustomInput label='Installment 2' sx={{ width: '100%' }} />}
                  showTimeSelect
                  showMonthDropdown
                  showYearDropdown
                  showDisabledMonthNavigation
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='dd/MM/yyyy h:mm aa'
                />
              </DatePickerWrapper>
              <Box sx={{ width: '23.77%' }}>
                <Status status='unpaid' fontSize='13px' padding='4px 12px' />
              </Box>
            </ContainerInstallments>
            <ContainerInstallments>
              <DatePickerWrapper className='information-datepicker' width={'80%'}>
                <DatePicker
                  shouldCloseOnSelect
                  id='reception-date'
                  customInput={<CustomInput label='Installment 3' sx={{ width: '100%' }} />}
                  showTimeSelect
                  showMonthDropdown
                  showYearDropdown
                  showDisabledMonthNavigation
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='dd/MM/yyyy h:mm aa'
                />
              </DatePickerWrapper>
              <Box sx={{ width: '23.77%' }}>
                <Status status='pending' fontSize='13px' padding='4px 12px' />
              </Box>
            </ContainerInstallments>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Share Percentage</TitleInputs>
            <FormControl fullWidth>
              <NumericFormat
                name='sharePercentage'
                value={''}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='share-percentage'
                label='Total Share %'
                multiline
                suffix={'%'}
                decimalScale={2}
                variant='outlined'
              />
            </FormControl>
            <FormControl fullWidth>
              <NumericFormat
                name='everestShare'
                value={''}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='everest-share'
                label='Everest Share %'
                multiline
                suffix={'%'}
                decimalScale={2}
                variant='outlined'
              />
            </FormControl>
            <FormControl fullWidth>
              <NumericFormat
                name='orionShare'
                value={''}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='orion-share'
                label='Orion Share %'
                multiline
                suffix={'%'}
                decimalScale={2}
                variant='outlined'
              />
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Contract Term</TitleInputs>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                shouldCloseOnSelect
                id='reception-date'
                customInput={<CustomInput label='Starting Date' sx={{ width: '100%' }} />}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
              />
            </DatePickerWrapper>
            <DatePickerWrapper className='information-datepicker'>
              <DatePicker
                shouldCloseOnSelect
                id='reception-date'
                customInput={<CustomInput label='Expiration Date' sx={{ width: '100%' }} />}
                showTimeSelect
                showMonthDropdown
                showYearDropdown
                showDisabledMonthNavigation
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy h:mm aa'
              />
            </DatePickerWrapper>
            <DatePickerWrapper className='information-datepicker'>
              <PickersTime />
            </DatePickerWrapper>
            <DatePickerWrapper className='information-datepicker'>
              <PickersTime />
            </DatePickerWrapper>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Line of Business</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Line of Business</InputLabel>
              <Select
                name='lineOfBusiness'
                label='Line of Business'
                defaultValue={''}
                // value={String(basicInfo.economicSector)}
                // onChange={handleSelectChange}
                labelId='economic-sector'
              ></Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Subranch</InputLabel>
              <Select
                name='subranch'
                label='Subranch'
                defaultValue={''}
                // value={String(basicInfo.economicSector)}
                // onChange={handleSelectChange}
                labelId='economic-sector'
              ></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Currency</TitleInputs>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                name='currency'
                label='Currency'
                defaultValue={''}
                // value={String(basicInfo.economicSector)}
                // onChange={handleSelectChange}
                labelId='economic-sector'
              ></Select>
            </FormControl>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Contract Files</TitleInputs>
          </ContainerInputs>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ContainerInputs>
            <TitleInputs>Endorsements</TitleInputs>
            <Box>
              <Button>
                View Endorsementys &nbsp;
                <Icon icon={'lucide:eye'} />
              </Button>
            </Box>
          </ContainerInputs>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomerSelection
