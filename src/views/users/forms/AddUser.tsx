import { yupResolver } from '@hookform/resolvers/yup'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'

import { useGetAllCompanies } from '@/hooks/catalogs/company/getAllCompanies'
import { useGetAllRoles } from '@/hooks/catalogs/roles/getAllRoles'
import { useEditUser } from '@/hooks/catalogs/users'
import { useAddUser } from '@/hooks/catalogs/users/addUser'
import { UsersPostDto, UsersPutDto } from '@/services/users/dtos/UsersDto'
import { fetchAccounts } from '@/store/apps/users'
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
import { useAppDispatch, useAppSelector } from 'src/store'

import { UserSection } from 'src/styles/Forms/usersSection'
import CountrySelect, { ICountry } from 'src/views/custom/select/CountrySelect'
import { StyledDescription, StyledSubtitle, StyledTitle } from 'src/views/custom/typography'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  surname: yup.string().required(),
  phone: yup.string().required(),
  company: yup.string().required()
})

interface FormInfo {
  name: string
  surname: string
  email: string
  phone: string
  company: string
  role: string
  dualRole: string
}

const UserForm: FormInfo = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  dualRole: ''
}
const initialForm: UsersPutDto = {
  id: 1,
  name: '',
  surname: '',
  email: '',
  phone: '',
  idCompany: 0,
  roles: [],
  areaCode: ''
}

// const ADMIN_COMPANIES = ['dynamic', 'claims']
const ADMIN_COMPANIES = ['3', '4']

interface IAddUser {
  selectUser: boolean
}
const AddUser = ({ selectUser }: IAddUser) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormInfo>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const useWatchCompany = watch('company')
  const useWatchRole = watch('role')
  const usersReducer = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<FormInfo>(UserForm)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>()
  const [dualRoleDisabled, setDualRoleDisabled] = useState<boolean>(false)
  const [roleDisabled, setRoleDisabled] = useState<boolean>(false)
  const [editable, setEditable] = useState<boolean>(false)

  const [idCompany, setIdCompany] = useState<string>('')
  const [idRole, setIdRole] = useState<string>('')
  const [informativeIdRole, setInformativeIdRole] = useState<string>('')

  const { setUserPost } = useAddUser()
  const { setUserPut } = useEditUser()

  const { company } = useGetAllCompanies()

  const { roles } = useGetAllRoles()

  const onSubmit = (data: any) => {
    if (selectUser) {
      const dataToSend: UsersPutDto = {
        id: usersReducer.current?.id || 1,
        name: data.name || '',
        surname: data.surname || '',
        email: data.email || '',
        phone: data.phone || '',
        idCompany: parseInt(idCompany),
        roles: parseInt(idRole)
          ? [
              {
                id: parseInt(idRole)
              }
            ]
          : parseInt(idRole) && parseInt(informativeIdRole)
          ? [
              {
                id: parseInt(idRole)
              },
              {
                id: parseInt(informativeIdRole)
              }
            ]
          : [],
        areaCode: selectedCountry?.phone || ''
      }
      setUserPut(dataToSend)
      dispatch(fetchAccounts(usersReducer))
    } else {
      const dataToSend: UsersPostDto = {
        name: data.name || '',
        surname: data.surname || '',
        email: data.email || '',
        phone: data.phone || '',
        idCompany: parseInt(idCompany),
        roles: parseInt(idRole)
          ? [
              {
                id: parseInt(idRole)
              }
            ]
          : parseInt(idRole) && parseInt(informativeIdRole)
          ? [
              {
                id: parseInt(idRole)
              },
              {
                id: parseInt(informativeIdRole)
              }
            ]
          : [],
        areaCode: selectedCountry?.phone || ''
      }
      setUserPost(dataToSend)
      dispatch(fetchAccounts(usersReducer))
      reset({ ...initialForm })
    }
  }

  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    setFormData({ ...formData, [field]: value })
  }

  useEffect(() => {
    if (usersReducer.current !== undefined && usersReducer.current !== null && selectUser) {
      reset({ ...usersReducer.current })
    }
    //eslint-disable-next-line
  }, [usersReducer.current])

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

  useEffect(() => {
    if (useWatchRole === '5') {
      setDualRoleDisabled(false)
      setValue('dualRole', '', { shouldValidate: true })
    } else {
      setDualRoleDisabled(true)
    }
    //eslint-disable-next-line
  }, [useWatchRole])

  // useEffect(() => {
  //   dispatch(fetchAccounts(usersReducer))
  //   //eslint-disable-next-line
  // }, [usersReducer.filters])

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
                        name='name'
                        control={control}
                        defaultValue={''}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='First Name'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.name)}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.name && <FormHelperText sx={{ color: 'error.main' }}>Invalid first name</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='surname'
                        control={control}
                        defaultValue={''}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Last Name'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.surname)}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0D567B'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                            }}
                          />
                        )}
                      />
                      {errors.surname && (
                        <FormHelperText sx={{ color: 'error.main' }}>Invalid last name</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='email'
                        control={control}
                        defaultValue={''}
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
                      {errors.email ? (
                        <FormHelperText sx={{ color: 'error.main' }}>Invalid email</FormHelperText>
                      ) : (
                        <FormHelperText>
                          The user will receive an automated password to this email so they can login.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth defaultValue={''} sx={{ mb: 2, mt: 2 }}>
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
                        defaultValue={''}
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
                    <FormControl defaultValue={''} fullWidth sx={{ mb: 2, mt: 2 }}>
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
                        defaultValue={''}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Company</InputLabel>
                            <Select
                              label='Company'
                              value={value}
                              onBlur={onBlur}
                              onChange={e => {
                                onChange(e.target.value)
                                setIdCompany(e.target.value)
                              }}
                              labelId='broker'
                            >
                              {company?.map(company => (
                                <MenuItem key={company.name} value={company.id.toString()}>
                                  {company.alias}
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
                      defaultValue={''}
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
                              onChange={e => {
                                onChange(e.target.value)
                                setIdRole(e.target.value)
                              }}
                              labelId='broker'
                            >
                              {roles?.map(rol => (
                                <MenuItem key={rol.id} value={rol.id.toString()}>
                                  {rol.role}
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
                        defaultValue={''}
                        name='dualRole'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Role</InputLabel>
                            <Select
                              label='Select a role'
                              value={value}
                              onBlur={onBlur}
                              onChange={e => {
                                onChange(e.target.value)
                                setInformativeIdRole(e.target.value)
                              }}
                              labelId='broker'
                            >
                              {roles?.map(rol => {
                                if (rol.role === 'admin') return null
                                else
                                  return (
                                    <MenuItem key={rol.id} value={rol.id.toString()}>
                                      {rol.role}
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
            {!selectUser ? (
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
            ) : (
              <>
                {!editable ? (
                  <Button
                    startIcon={<Icon icon='mdi:pencil' />}
                    type='button'
                    variant='outlined'
                    color='primary'
                    size='large'
                    sx={{ float: 'right', ml: 5 }}
                    onClick={() => setEditable(true)}
                  >
                    EDIT
                  </Button>
                ) : (
                  <Button
                    startIcon={<Icon icon='material-symbols:save' />}
                    type='submit'
                    variant='outlined'
                    color='primary'
                    size='large'
                    sx={{ float: 'right', ml: 5 }}
                  >
                    SAVE
                  </Button>
                )}
                <Button
                  startIcon={<Icon icon='ic:baseline-delete-outline' />}
                  type='button'
                  variant='text'
                  color='primary'
                  size='large'
                  sx={{ float: 'right' }}
                >
                  DELETE
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser
