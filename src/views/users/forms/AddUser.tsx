import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CountrySelect, { ICountry } from 'src/pages/components/custom/select/CountrySelect'
import { StyledDescription, StyledSubtitle, StyledTitle } from 'src/pages/components/custom/typography'
import { UserSection } from 'src/styles/Forms/usersSection'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  company: yup.string().required()
})

interface FormInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  dualRole: string
}

const UserForm: FormInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  dualRole: ''
}
const roles = [
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'Lead underwriter',
    value: 'leadUnderwriter'
  },
  {
    label: 'Technical assistant',
    value: 'technicalAssistant'
  },
  {
    label: 'Underwriter',
    value: 'underwriter'
  }
]

const companies = [
  {
    label: 'Dynamic',
    value: 'Dynamic'
  },
  {
    label: 'Claims',
    value: 'Claims'
  },
  {
    label: 'ReinsuranceCompany1',
    value: 'Reinsurance1'
  },
  {
    label: 'ReinsuranceCompany2',
    value: 'Reinsurance2'
  }
]

const AddUser = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const [formData, setFormData] = useState<FormInfo>(UserForm)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>()

  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    setFormData({ ...formData, [field]: value })
  }

  useEffect(() => {
    setFormData({ ...formData, role: '', dualRole: '' })
    //eslint-disable-next-line
  }, [formData.company])

  return (
    <>
      <div>
        <UserSection>
          <StyledTitle>User Details</StyledTitle>
        </UserSection>
        <UserSection>
          <StyledDescription maxWidth={'734px'}>
            Fill out the information below to add a user. The user will have access to this platform and depending on
            their role, they can see certain data.
          </StyledDescription>
        </UserSection>
        <div className='form-wrapper'>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <UserSection otherProps={{ marginTop: '40px' }}>
              <StyledSubtitle>Basic info</StyledSubtitle>
              <Grid container spacing={2}>
                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='firstName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='First Name'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.firstName)}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.firstName && (
                        <FormHelperText sx={{ color: 'error.main' }}>Invalid first name</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='lastName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='Last Name'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.lastName)}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.lastName && (
                        <FormHelperText sx={{ color: 'error.main' }}>Invalid last name</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='Email'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.email)}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.email && <FormHelperText sx={{ color: 'error.main' }}>Invalid email</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <CountrySelect
                        size='medium'
                        otherProps={{ width: '100%' }}
                        setSelectedCountry={setSelectedCountry}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='phone'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            autoFocus
                            label='Phone Number'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.phone)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>+{selectedCountry?.phone}</InputAdornment>
                              )
                            }}
                            disabled={selectedCountry?.phone === undefined || selectedCountry?.phone === null}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>Invalid phone</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <TextField
                        autoFocus
                        name='Email'
                        label='Email'
                        value={formData.email}
                        onChange={e => handleFormChange('email', e.target.value)}
                        hidden={true}
                        disabled={true}
                        style={{ visibility: 'hidden' }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </UserSection>

            <UserSection otherProps={{ marginTop: '40px' }}>
              <StyledSubtitle>Company info</StyledSubtitle>
              <Grid container spacing={2}>
                <Grid container xs={12} md={6} item spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='company'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Company</InputLabel>
                            <Select
                              label='Company'
                              value={value}
                              onBlur={onBlur}
                              onChange={e => onChange(e.target.value)}
                              labelId='broker'
                            >
                              {companies.map(company => (
                                <MenuItem key={company.value} value={company.value}>
                                  {company.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        )}
                      />
                      {errors.company && <FormHelperText sx={{ color: 'error.main' }}>Invalid company</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        visibility:
                          formData.company === 'Dynamic' || formData.company === 'Claims' ? 'visible' : 'hidden',
                        mb: 2,
                        mt: 2
                      }}
                      fullWidth
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        label='Select a role'
                        value={formData.role}
                        onChange={e => handleFormChange('role', e.target.value)}
                        labelId='broker'
                      >
                        {roles.map(rol => (
                          <MenuItem key={rol.value} value={rol.value}>
                            {rol.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {false && (
                        <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                          Please select a role
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{ visibility: formData.role === 'admin' ? 'visible' : 'hidden', mb: 2, mt: 2 }}
                    >
                      <InputLabel>Second role</InputLabel>
                      <Select
                        label='Select a second role'
                        value={formData.dualRole}
                        onChange={e => handleFormChange('dualRole', e.target.value)}
                        labelId='broker'
                      >
                        {roles.map(rol => {
                          if (rol.value === 'admin') return null
                          else
                            return (
                              <MenuItem key={rol.value} value={rol.value}>
                                {rol.label}
                              </MenuItem>
                            )
                        })}
                      </Select>
                      {false && (
                        <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                          Please select a second role
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </UserSection>
            <Button type='submit' variant='contained' color='primary' size='large'>
              CONTINUE
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser
