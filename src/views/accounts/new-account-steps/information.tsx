// ** MUI Imports
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from "@mui/material/InputLabel"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'


const Information = () => {

  const { control, formState: { errors } } = useForm();

  const handleSubmit = () => {
    console.log("elsubmit")
  };

  return (
    <>
      <div className='information'>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className="section">
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
                <div className="title">Bussines</div>
              </div>
              <div className="form-col">
                <div className="title">Dates</div>
              </div>
              <div className="form-col">
                <div className="title">Underwriter team</div>
              </div>


            </div>
          </div>

          <div className="section">
            <div className="title">Placement structure</div>
            <div className="form-wrapper">
              <div className="form-col">
              </div>
              <div className="form-col">
              </div>
              <div className="form-col">
              </div>
            </div>
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
