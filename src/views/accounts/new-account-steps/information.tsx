import { ForwardedRef, forwardRef, useState } from 'react'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from "@mui/material/InputLabel"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Components
import NumericInput from 'src/views/components/app-inputs/NumericInput'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'


interface PickerProps {
  label?: string
}
/* eslint-disable */
const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id="date-textfield"
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarTodayIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />

  )
})

const BasicInfo = () => {

  const { control, formState: { errors } } = useForm();
  const [receptionDate, setReceptionDate] = useState<DateType>(null)
  const [effectiveDate, setEffectiveDate] = useState<DateType>(null)
  const [expirationDate, setExpirationDate] = useState<DateType>(null)



  const handleSubmit = () => {
    console.log("elsubmit")
  };

  return (
    <>
      <div className="title">Basic info</div>
      <div className="form-wrapper">
        <div className="form-col">
          <div className="title">Insured</div>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='insured'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label='insured'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.insured)}
                />
              )}
            />
            {errors.insured && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Controller
              name='country'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Country'
                  value={value}
                  onChange={onChange}
                  labelId='invoice-country'
                  error={Boolean(errors.country)}
                >
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='Russia'>Russia</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Canada'>Canada</MenuItem>
                </Select>
              )}
            />
            {errors.country && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                Select a country
              </FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="form-col">
          <div className="title">Broker</div>
          <FormControl fullWidth>
            <InputLabel>Select Broker</InputLabel>
            <Controller
              name='broker'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Broker'
                  value={value}
                  onChange={onChange}
                  labelId='broker'
                  error={Boolean(errors.broker)}
                >
                  <MenuItem value='br1'>Br1</MenuItem>
                  <MenuItem value='br2'>Br2</MenuItem>
                  <MenuItem value='br3'>Br3</MenuItem>
                </Select>
              )}
            />
            {errors.broker && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Broker
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Select Broker Contact</InputLabel>
            <Controller
              name='broker-contact'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Broker Contact'
                  value={value}
                  onChange={onChange}
                  labelId='broker-contact'
                  error={Boolean(errors.brokerContact)}
                >
                  <MenuItem value='brc1'>Broker contact 1</MenuItem>
                  <MenuItem value='brc2'>Broker contact 2</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Button className="create-contact-btn">
            <Icon icon='mdi:plus-circle-outline' />
            CREATE NEW CONTACT
          </Button>
        </div>
        <div className="form-col">
          <div className="title">Cedant</div>
          <FormControl fullWidth>
            <InputLabel>Select Cedant</InputLabel>
            <Controller
              name='cedant'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Cedant'
                  value={value}
                  onChange={onChange}
                  labelId='cedant'
                  error={Boolean(errors.cedant)}
                >
                  <MenuItem value='cedant1'>cedant 1</MenuItem>
                  <MenuItem value='cedant2'>cedant 2</MenuItem>
                  <MenuItem value='cedant3'>cedant 3</MenuItem>
                </Select>
              )}
            />
            {errors.cedant && (
              <FormHelperText sx={{ color: 'error.main' }} id='select-cedant-error'>
                Please select Cedant
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Select Cedant Contact</InputLabel>
            <Controller
              name='cedant-contact'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Cedant Contact'
                  value={value}
                  onChange={onChange}
                  labelId='cedant-contact'
                  error={Boolean(errors.cedantContact)}
                >
                  <MenuItem value='cedantc1'>Cedant contact 1</MenuItem>
                  <MenuItem value='cedantc2'>Cedant contact 2</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Button className="create-contact-btn">
            <Icon icon='mdi:plus-circle-outline' />
            CREATE NEW CONTACT
          </Button>
        </div>
        <div className="form-col">
          <div className="title">Business</div>
          <FormControl fullWidth>
            <InputLabel>Line of business</InputLabel>
            <Controller
              name='bussines'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Line of Business'
                  value={value}
                  onChange={onChange}
                  labelId='business'
                  error={Boolean(errors.business)}
                >
                  <MenuItem value='lb1'>Lb 1</MenuItem>
                  <MenuItem value='lb2'>Lb 2</MenuItem>
                  <MenuItem value='lb3'>Lb 3</MenuItem>
                </Select>
              )}
            />
            {errors.business && (
              <FormHelperText sx={{ color: 'error.main' }} id='business-error'>
                Please select a line of business
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="form-col">
          <div className="title">Dates</div>
          <DatePickerWrapper>

            <DatePicker

              selected={receptionDate}
              shouldCloseOnSelect
              id='reception-date'
              customInput={
                <CustomInput
                  label='Reception date'
                />
              }
              onChange={(date: Date) => setReceptionDate(date)}
            />


            <DatePicker
              selected={effectiveDate}
              shouldCloseOnSelect
              id='effective-date'
              customInput={
                <CustomInput
                  label='Effective date'
                />
              }
              onChange={(date: Date) => setEffectiveDate(date)}
            />
            <DatePicker
              selected={expirationDate}
              shouldCloseOnSelect
              id='expiration-date'
              customInput={
                <CustomInput
                  label='Expiration date'
                />
              }
              onChange={(date: Date) => setExpirationDate(date)}
            />
          </DatePickerWrapper>


        </div>
        <div className="form-col">
          <div className="title">Underwriter team</div>
          <FormControl fullWidth>
            <InputLabel>Underwriter</InputLabel>
            <Controller
              name='underwriter'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Underwriter'
                  value={value}
                  onChange={onChange}
                  labelId='underwriter'
                >
                  <MenuItem value='u1'>U1</MenuItem>
                  <MenuItem value='u2'>U2</MenuItem>
                  <MenuItem value='u3'>U3</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Lead underwriter</InputLabel>
            <Controller
              name='lead-underwriter'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Lead Underwriter'
                  value={value}
                  onChange={onChange}
                  labelId='lead-underwriter'
                >
                  <MenuItem value='Lu1'>LU1</MenuItem>
                  <MenuItem value='Lu2'>LU2</MenuItem>
                  <MenuItem value='Lu3'>LU3</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Technical assistant</InputLabel>
            <Controller
              name='assistant'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Technical assistant'
                  value={value}
                  onChange={onChange}
                  labelId='assistant'
                >
                  <MenuItem value='assistant1'>Assistant 1</MenuItem>
                  <MenuItem value='assistant2'>Assistant 2</MenuItem>
                  <MenuItem value='assistant3'>Assistant 3</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>
      </div>
    </>
  )
}

const PlacementStructure = () => {

  const changeInput= () =>{
    console.log("input")
  }

  const { control, formState: { errors } } = useForm();

  return (
    <>
      <div className="title">Placement Structure</div>
      <div className="form-wrapper">
        <div className="form-col">
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Controller
              name='currency'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Currency'
                  value={value}
                  onChange={onChange}
                  labelId='currency'
                  error={Boolean(errors.currency)}
                >
                  <MenuItem value='USD'>USD</MenuItem>
                  <MenuItem value='MXN'>MXN</MenuItem>
                  <MenuItem value='EUR'>EUR</MenuItem>
                </Select>
              )}
            />
            {errors.currency && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                Select a currency
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='insured'
              control={control}
              rules={{ required: true }}
              render={({ field: { value} }) => (
                <NumericInput
                  label="Total values"
                  field={value}
                  onValueChange={changeInput}
                />
              )}
            />
            {errors.insured && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>

        </div>

        <div className="form-col">

          <FormControl fullWidth>
            <InputLabel>Select Broker</InputLabel>
            <Controller
              name='broker'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Broker'
                  value={value}
                  onChange={onChange}
                  labelId='broker'
                  error={Boolean(errors.broker)}
                >
                  <MenuItem value='br1'>Br1</MenuItem>
                  <MenuItem value='br2'>Br2</MenuItem>
                  <MenuItem value='br3'>Br3</MenuItem>
                </Select>
              )}
            />
            {errors.broker && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Broker
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Select Broker Contact</InputLabel>
            <Controller
              name='broker-contact'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Broker Contact'
                  value={value}
                  onChange={onChange}
                  labelId='broker-contact'
                  error={Boolean(errors.brokerContact)}
                >
                  <MenuItem value='brc1'>Broker contact 1</MenuItem>
                  <MenuItem value='brc2'>Broker contact 2</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div className="form-col">

          <FormControl fullWidth>
            <InputLabel>Select Cedant</InputLabel>
            <Controller
              name='cedant'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Cedant'
                  value={value}
                  onChange={onChange}
                  labelId='cedant'
                  error={Boolean(errors.cedant)}
                >
                  <MenuItem value='cedant1'>cedant 1</MenuItem>
                  <MenuItem value='cedant2'>cedant 2</MenuItem>
                  <MenuItem value='cedant3'>cedant 3</MenuItem>
                </Select>
              )}
            />
            {errors.cedant && (
              <FormHelperText sx={{ color: 'error.main' }} id='select-cedant-error'>
                Please select Cedant
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Select Cedant Contact</InputLabel>
            <Controller
              name='cedant-contact'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Select Cedant Contact'
                  value={value}
                  onChange={onChange}
                  labelId='cedant-contact'
                  error={Boolean(errors.cedantContact)}
                >
                  <MenuItem value='cedantc1'>Cedant contact 1</MenuItem>
                  <MenuItem value='cedantc2'>Cedant contact 2</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>
      </div>
    </>
  )
}

const Information = () => {

  const handleSubmit = () => {
    console.log("elsubmit")
  };

  return (
    <>
      <div className='information'>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className="section">
            <BasicInfo />
          </div>

          <div className="section">
            <PlacementStructure/>
          </div>

          <div className="section">
            <div className="title">File submit</div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Information
