import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Components

// ** Third Party Imports
import { useForm } from 'react-hook-form'

// ** Types

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AvatarInitials from 'src/views/custom/avatars'
import SwitchAlpex from 'src/views/custom/switchs'

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}
interface FormInfo extends PreviousFormInfo {
  NetPremium: string
  SharePercent: string
  DynamicComissionPercent: string
  FrontingFee: string
  ReinsuranceCompany: string
  PremiumPerShare: string
  DynamicComission: string
  FrontingFeePercent: string
  NetInsurancePremium: string
  RetroCedant: string
  RetroCedantContact: string
}

interface PreviousFormInfo {
  RecievedNetPremium?: string
  DistribuitedNetPremium?: string
  Diference?: string
}

const SecurityForm: FormInfo = {
  NetPremium: '',
  SharePercent: '',
  DynamicComissionPercent: '',
  FrontingFee: '',
  ReinsuranceCompany: '',
  PremiumPerShare: '',
  DynamicComission: '',
  FrontingFeePercent: '',
  NetInsurancePremium: '',
  RetroCedant: '',
  RetroCedantContact: '',
  RecievedNetPremium: '',
  DistribuitedNetPremium: '',
  Diference: ''
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
          <InputAdornment position='end'>
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})
//Pending types
const FormSection = ({ index, formData, setFormData }: any) => {
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)
  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    const data = [...formData]
    data[index][field] = value
    setFormData(data)
  }

  useEffect(() => {
    const data = [...formData]
    data[index]['RetroCedantContact'] = ''
    setFormData(data)
  }, [formData[index].RetroCedant])

  return (
    <>
      <div className='title'>Security</div>
      <span className='switch-text'>Fronting fee </span>
      <SwitchAlpex
        onClick={() => {
          setFrontingFeeEnabled(!frontingFeeEnabled)
        }}
      />
      <div className='form-wrapper space-top'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Net premium at 100%'
              value={formData.NetPremium}
              onChange={e => handleFormChange('NetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={formData[index].SharePercent}
              onChange={e => handleFormChange('SharePercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={formData.DynamicComissionPercent}
              onChange={e => handleFormChange('DynamicComissionPercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={formData.FrontingFeePercent}
                onChange={e => handleFormChange('FrontingFeePercent', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Reinsurance companies</InputLabel>

            <Select
              label='Select a reinsurance company'
              value={formData.ReinsuranceCompany}
              onChange={e => handleFormChange('ReinsuranceCompany', e.target.value)}
              labelId='broker'
            >
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a reinsurance company
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Premium per share'
              value={formData.PremiumPerShare}
              onChange={e => handleFormChange('PremiumPerShare', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={formData.DynamicComission}
              onChange={e => handleFormChange('DynamicComission', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={formData.FrontingFee}
                onChange={e => handleFormChange('FrontingFee', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={formData.NetInsurancePremium}
              onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro cedant</InputLabel>

            <Select
              label='Select Retro cedant'
              value={formData.RetroCedant}
              onChange={e => {
                handleFormChange('RetroCedant', e.target.value)
              }}
              labelId='broker'
            >
              <MenuItem value=''>Select Retro cedant</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Retro cedant
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro Cedant contact</InputLabel>
            <Select
              label='Select Retro Cedant contact '
              value={formData[index].RetroCedantContact}
              onChange={e => handleFormChange('RetroCedantContact', e.target.value)}
              labelId='broker'
              disabled={formData[index].RetroCedant === ''}
            >
              <MenuItem value=''>Select Retro Cedant contact</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a Retro Cedant contact
              </FormHelperText>
            )}
          </FormControl>
          {formData[index].RetroCedantContact !== '' && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact phone'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact country'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
            </>
          )}
        </div>
        <div className='fullwidth'>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Recieved net premium'
              disabled
              fullWidth
              value={formData.RecievedNetPremium}
              onChange={e => handleFormChange('RecievedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Distribuited net premium'
              disabled
              value={formData.DistribuitedNetPremium}
              onChange={e => handleFormChange('DistribuitedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Diference'
              disabled
              value={formData.Diference}
              onChange={e => handleFormChange('Diference', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
        </div>
      </div>
    </>
  )
}

const Security = () => {
  const [formData, setFormData] = useState<FormInfo[]>([{ ...SecurityForm }])

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const handleSubmit = () => {
    console.log('elsubmit')
  }
  const {
    control,
    formState: { errors }
  } = useForm()
  const addNewForm = () => {
    setFormData([...formData, { ...SecurityForm }])
  }

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            {formData.map((_, index) => (
              <FormSection index={index} formData={formData} setFormData={setFormData} />
            ))}
          </div>
        </form>
        <div className='add-reinsurer'>
          <AvatarInitials name='Juan del Rio' />

          <Button
            type='button'
            onClick={addNewForm}
            variant='text'
            color='primary'
            size='large'
            fullWidth
            sx={{ justifyContent: 'start' }}
          >
            <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD REINSURER
          </Button>
        </div>
      </div>
    </>
  )
}

export default Security
