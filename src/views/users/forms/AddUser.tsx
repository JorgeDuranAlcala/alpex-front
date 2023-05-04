import { yupResolver } from '@hookform/resolvers/yup'
import Icon from 'src/@core/components/icon'
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
import UsersServices from 'src/services/users/users.service'
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

const ADMIN_COMPANIES = ['Dynamic', 'Claims']

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

interface IAddUser {
  handleView: (view: string) => void
}
const AddUser = ({ handleView }: IAddUser) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const useWatchCompany = watch('company')
  const useWatchRole = watch('role')

  const [formData, setFormData] = useState<FormInfo>(UserForm)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>()
  const [dualRoleDisabled, setDualRoleDisabled] = useState<boolean>(false)
  const [roleDisabled, setRoleDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (ADMIN_COMPANIES.includes(useWatchCompany)) {
      setRoleDisabled(false)
      setValue('role', '', { shouldValidate: true })
      setValue('dualRole', '', { shouldValidate: true })
    } else {
      setRoleDisabled(true)
      setDualRoleDisabled(true)
    }
    //eslint-disable-next-line
  }, [useWatchCompany])

  console.log(errors)

  useEffect(() => {
    if (useWatchRole === 'admin') {
      setDualRoleDisabled(false)
      setValue('dualRole', '', { shouldValidate: true })
    } else {
      setDualRoleDisabled(true)
    }
    //eslint-disable-next-line
  }, [useWatchRole])

  const onSubmit = (data: any) => {
    console.log(data)
    getData()
    handleView('list')
  }
  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    setFormData({ ...formData, [field]: value })
  }

  const getData = async () => {
    const data = await UsersServices.getUsers({ page: 1, take: 1 })
    console.log(data)
  }

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
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
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
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
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
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
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
                        visibility: roleDisabled ? 'hidden' : 'visible',
                        mb: 2,
                        mt: 2
                      }}
                      fullWidth
                    >
                      <Controller
                        name='role'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Role</InputLabel>
                            <Select
                              label='Select a role'
                              value={value}
                              onBlur={onBlur}
                              onChange={e => onChange(e.target.value)}
                              labelId='broker'
                            >
                              {roles.map(rol => (
                                <MenuItem key={rol.value} value={rol.value}>
                                  {rol.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        )}
                      />
                      {errors.role && <FormHelperText sx={{ color: 'error.main' }}>Invalid role</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ visibility: dualRoleDisabled ? 'hidden' : 'visible', mb: 2, mt: 2 }}>
                      <Controller
                        name='dualRole'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Role</InputLabel>
                            <Select
                              label='Select a role'
                              value={value}
                              onBlur={onBlur}
                              onChange={e => onChange(e.target.value)}
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
                          </>
                        )}
                      />
                      {errors.dualRole && (
                        <FormHelperText sx={{ color: 'error.main' }}>Select a valid dual role</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </UserSection>
            <Button
              startIcon={<Icon icon='mdi:check' />}
              type='submit'
              variant='outlined'
              color='primary'
              size='large'
              sx={{ float: 'right' }}
            >
              ADD USER
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser
