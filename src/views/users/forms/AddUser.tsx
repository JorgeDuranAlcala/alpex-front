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
import { FocusEvent, FocusEventHandler, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'src/store'

// import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'

// import CompanySelect from '@/views/custom/select/CompanySelect'
// import useAxiosErrorHandling from '@/hooks/catalogs/users/handleError'

import { UserSection } from 'src/styles/Forms/usersSection'
import CountrySelect, { ICountry } from 'src/views/custom/select/CountrySelect'
import { StyledDescription, StyledSubtitle, StyledTitle } from 'src/views/custom/typography'
import AlertAddUser from '../AlertUserAdded'

interface FormInfo {
  name: string
  surname: string
  email: string
  phone: string
  company: string
  role: string
  dualRole: string
  areaCode?: string
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

interface IAddUser {
  selectUser: boolean
  title: string
  subTitle: string
}
interface errorsEmail {
  fieldRequired: boolean | undefined
  validateEmail: boolean | undefined
  duplicateEmail: boolean | undefined
}
const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `This field is required.`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  phone: yup.string().required(),
  company: yup.string().required(),
  email: yup.string().email().required(),

  // role: yup.string().required(),
  // dualRole: yup.string().required(),
  name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  surname: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required()
})

// const ADMIN_COMPANIES = ['dynamic', 'claims']
const ADMIN_COMPANIES = ['1', '2']

const AddUser = ({ selectUser, title, subTitle }: IAddUser) => {
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

  const { setUserPost, error, user } = useAddUser()
  const { setUserPut } = useEditUser()

  const { company } = useGetAllCompanies()
  console.log({ error })
  console.log('Error-->', error?.message)

  const { roles } = useGetAllRoles()

  const ErrorsEmailText = {
    fieldRequired: 'This field is required.',
    validEmail: 'Enter a valid email, example: name@gmail.com',
    emailAlreadyExist: error?.message
  }

  const useWatchCompany = watch('company')
  const useWatchRole = watch('role')
  const useWatchEmail = watch('email')
  const useWatchDualRole = watch('dualRole')

  const usersReducer = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<FormInfo>(UserForm)
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>()
  const [dualRoleDisabled, setDualRoleDisabled] = useState<boolean>(false)
  const [roleDisabled, setRoleDisabled] = useState<boolean>(false)
  const [editable, setEditable] = useState<boolean>(false)
  const [idCompany, setIdCompany] = useState<any>('')
  const [idRole, setIdRole] = useState<any>('')
  const [informativeIdRole, setInformativeIdRole] = useState<any>('')

  // const [open, setopen] = useState(true)

  // const [selectCompany, setSelectCompany] = useState<ReinsuranceCompanyDto | undefined | string>()
  // const flagCompany = true

  // const [selectRol, setSelectRol] = useState<RolesCreateUser | undefined | string>()
  // const [selectDualRol, setSelectDualRol] = useState<RolesCreateUser | undefined | string>()

  console.log(usersReducer)

  console.log({ idCompany })
  console.log({ selectedCountry })
  console.log({ idRole })
  console.log({ informativeIdRole })
  console.log({ useWatchCompany })
  console.log({ useWatchRole })
  console.log({ useWatchDualRole })

  // console.log({ selectRol })
  // console.log({ selectDualRol })
  // console.log({ selectCompany })

  // const [email, setEmail] = useState<string>('')
  const [errorsTextEmail, setErrorsTextEmail] = useState<any>({
    fieldRequired: '',
    validEmail: '',
    emailExisting: ''
  })

  console.log(errorsTextEmail.emailExisting)
  const [errorEmail, setErrorEmail] = useState<errorsEmail>({
    fieldRequired: false,
    validateEmail: false,
    duplicateEmail: false
  })

  const onSubmit = (data: any) => {
    if (selectUser) {
      const dataToSend: UsersPutDto = {
        id: usersReducer.current?.id || 1,
        name: data.name || '',
        surname: data.surname || '',
        email: data.email || '',
        phone: data.phone || '',
        idCompany: parseInt(idCompany),
        roles:
          parseInt(idRole) && parseInt(informativeIdRole)
            ? [
                {
                  id: parseInt(idRole)
                },
                {
                  id: parseInt(informativeIdRole)
                }
              ]
            : parseInt(useWatchRole) && !parseInt(useWatchDualRole)
            ? [
                {
                  id: parseInt(useWatchRole)
                }
              ]
            : [],
        areaCode: selectedCountry?.phone || ''
      }
      setUserPut(dataToSend)
      setTimeout(() => {
        dispatch(fetchAccounts(usersReducer))
      }, 100)
    } else {
      const dataToSend: UsersPostDto = {
        name: data.name || '',
        surname: data.surname || '',
        email: data.email || '',
        phone: data.phone || '',
        idCompany: parseInt(useWatchCompany),
        roles:
          parseInt(useWatchRole) && parseInt(useWatchDualRole)
            ? [
                {
                  id: parseInt(useWatchRole)
                },
                {
                  id: parseInt(useWatchDualRole)
                }
              ]
            : parseInt(useWatchRole) && !parseInt(useWatchDualRole)
            ? [
                {
                  id: parseInt(useWatchRole)
                }
              ]
            : [],
        areaCode: selectedCountry?.phone || ''
      }
      setUserPost(dataToSend)
      setTimeout(() => {
        dispatch(fetchAccounts(usersReducer))
      }, 100)

      // reset({ ...initialForm })
    }
  }

  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    setFormData({ ...formData, [field]: value })
  }
  const handleInputEmail = () => {
    if (useWatchEmail === undefined || useWatchEmail === '') {
      setErrorEmail({
        ...errorEmail,
        fieldRequired: true,
        validateEmail: false
      })
      setErrorsTextEmail({ ...errorsTextEmail, fieldRequired: ErrorsEmailText.fieldRequired })
    }
  }

  // const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value)
  // }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event: FocusEvent<HTMLInputElement>) => {
    const input = event.target.value
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/
    console.log(input)

    if (!input) {
      setErrorEmail({
        ...errorEmail,
        fieldRequired: true,
        validateEmail: false,
        duplicateEmail: false
      })
      setErrorsTextEmail({ ...errorsTextEmail, fieldRequired: ErrorsEmailText.fieldRequired })
    } else if (!regexEmail.test(input)) {
      setErrorEmail({ ...errorEmail, validateEmail: true, fieldRequired: false, duplicateEmail: false })
      setErrorsTextEmail({ ...errorsTextEmail, validEmail: ErrorsEmailText.validEmail })
      console.log('email no valido')
    } else {
      setErrorEmail({
        ...errorEmail,
        fieldRequired: false,
        validateEmail: false,
        duplicateEmail: false
      })
    }
  }
  useEffect(() => {
    if (usersReducer.current !== undefined && usersReducer.current !== null && selectUser) {
      reset({ ...usersReducer.current })
    }
    //eslint-disable-next-line
  }, [usersReducer.current])

  useEffect(() => {
    if (selectUser) {
      setRoleDisabled(false)
    } else {
      if (ADMIN_COMPANIES.includes(useWatchCompany)) {
        setRoleDisabled(false)
        setValue('role', '', { shouldValidate: true })
        setValue('dualRole', '', { shouldValidate: true })
      } else {
        setRoleDisabled(true)
        setDualRoleDisabled(true)
      }
    }
    //eslint-disable-next-line
  }, [useWatchCompany])

  useEffect(() => {
    if (roles) {
      const roleIdAdmin = roles?.find(role => role.role === 'admin')
      if (selectUser) {
        if (roleIdAdmin && idRole === String(roleIdAdmin.id)) {
          setDualRoleDisabled(false)
          setValue('dualRole', '', { shouldValidate: true })
        } else {
          setDualRoleDisabled(true)
        }
      } else {
        if (roleIdAdmin && useWatchRole === String(roleIdAdmin.id)) {
          setDualRoleDisabled(false)
          setValue('dualRole', '', { shouldValidate: true })
        } else {
          setDualRoleDisabled(true)
        }
      }
    }
    //eslint-disable-next-line
  }, [useWatchRole, selectUser, idRole])

  useEffect(() => {
    if (error?.statusCode === 417) {
      setErrorEmail({
        ...errorEmail,
        fieldRequired: false,
        validateEmail: false,
        duplicateEmail: true
      })
      setErrorsTextEmail({ ...errorsTextEmail, emailExisting: ErrorsEmailText.emailAlreadyExist })
    } else {
      setErrorEmail({
        ...errorEmail,
        fieldRequired: false,
        validateEmail: false,
        duplicateEmail: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (user?.statusCode === 201) {
      reset({ ...initialForm })
    }
  }, [reset, user?.statusCode])

  // useEffect(() => {

  // if (open) {
  //   document.body.classList.add('alertUser')
  // } else {
  //   document.body.classList.remove('alertUser')
  // }
  // }, [open])

  // console.log({ open })
  // useEffect(() => {
  //   setTimeout(() => {
  //     // setOpen(false)
  //     document.body.classList.remove('alertUser')
  //   }, 5000)
  // }, [])

  useEffect(() => {
    if (selectUser) {
      const reducersCompany = usersReducer?.current?.idCompany?.id
      const companySelect = company?.find(c => c.id === reducersCompany)
      setIdCompany(companySelect?.id.toString())
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company, setIdCompany])

  // useEffect(() => {
  //   if (selectUser) {
  //     setIdCompany(useWatchCompany)
  //     setIdRole(useWatchRole)
  //   }
  // }, [selectUser, useWatchCompany, useWatchRole])

  useEffect(() => {
    const reducersRol = usersReducer?.current?.roles[0]?.id
    const rolSelect = roles?.find(rol => rol.id === reducersRol)
    setIdRole(rolSelect?.id.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, setIdRole])

  useEffect(() => {
    const reducersDualRol = usersReducer?.current?.roles[1]?.id
    const dualRolSelect = roles?.find(dualRol => dualRol.id === reducersDualRol)
    setInformativeIdRole(dualRolSelect?.id.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, setInformativeIdRole])

  // useEffect(() => {
  //   dispatch(fetchAccounts(usersReducer))
  //   //eslint-disable-next-line
  // }, [usersReducer.filters])

  return (
    <>
      <AlertAddUser />
      <div style={{ padding: '20px 20px 80px' }}>
        <UserSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </UserSection>
        <UserSection>
          {selectUser ? (
            <StyledDescription maxWidth={'734px'} sx={{ marginTop: '12px' }}>
              This user can currently acces to the platform and access certain data. You can edit their information
              below by clicking the buton "Edit".
            </StyledDescription>
          ) : (
            <StyledDescription maxWidth={'734px'} sx={{ marginTop: '12px' }}>
              Fill out the information below to {subTitle}. The user will have access to this platform and depending on
              their role, they can see certain data.
            </StyledDescription>
          )}
        </UserSection>
        <div className='form-wrapper'>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <UserSection otherProps={{ marginTop: '40px' }}>
              <StyledSubtitle>Basic info</StyledSubtitle>
              <Grid container spacing={5}>
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
                                borderColor: '#2535A8'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                            }}
                          />
                        )}
                      />
                      {errors.name && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>
                      )}
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
                                borderColor: '#2535A8'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                            }}
                          />
                        )}
                      />
                      {errors.surname && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.surname.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      {/* <TextField
                        error={errorEmail?.fieldRequired || errorEmail?.validateEmail}
                        name='Email'
                        label='Email'
                        value={email}
                        onChange={handleChangeEmail}
                        onBlur={handleBlur}
                        sx={{
                          '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2535A8'
                          },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                        }}
                      />
                      {errorEmail.fieldRequired ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{errorsTextEmail.fieldRequired}</FormHelperText>
                      ) : errorEmail.validateEmail ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{errorsTextEmail.validEmail}</FormHelperText>
                      ) : (
                        <FormHelperText>
                          The user will receive an automated password to this email so they can login.
                        </FormHelperText>
                      )} */}
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Email'
                            type='email'
                            value={value}
                            onBlur={handleBlur || onBlur}
                            onChange={onChange}
                            error={errorEmail?.fieldRequired || errorEmail?.validateEmail || errorEmail?.duplicateEmail}
                            sx={{
                              '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2535A8'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                            }}
                          />
                        )}
                      />
                      {errorEmail.fieldRequired ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{errorsTextEmail.fieldRequired}</FormHelperText>
                      ) : errorEmail.validateEmail ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{errorsTextEmail.validEmail}</FormHelperText>
                      ) : errorEmail.duplicateEmail ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{errorsTextEmail.emailExisting}</FormHelperText>
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
                    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                      <Controller
                        name='areaCode'
                        control={control}
                        render={({ field: { value } }) => (
                          <CountrySelect
                            areaCode={value}
                            size='medium'
                            otherProps={{ width: '100%' }}
                            setSelectedCountry={setSelectedCountry}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2, mt: errors.phone ? 4 : 0 }}>
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
                                borderColor: '#2535A8'
                              },
                              '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                            }}
                          />
                        )}
                      />
                      {errors.phone && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          Select a country for the country code.
                        </FormHelperText>
                      )}
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
              <Grid container spacing={5}>
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
                              error={Boolean(errors.company)}
                              label='Company'
                              value={selectUser ? idCompany : value}
                              onBlur={onBlur}
                              onChange={e => {
                                onChange(e.target.value)
                                setIdCompany(e.target.value)
                              }}
                              labelId='broker'
                            >
                              {company?.map(company => (
                                <MenuItem key={company.name} value={company.id.toString()}>
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        )}
                      />
                      {errors.company && (
                        <FormHelperText sx={{ color: 'error.main' }}>This action is required.</FormHelperText>
                      )}
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
                              error={Boolean(errors.role)}
                              label='Select a role'
                              value={selectUser ? idRole : value}
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
                      {errors.role && (
                        <FormHelperText sx={{ color: 'error.main' }}>This action is required.</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        visibility: dualRoleDisabled ? 'hidden' : 'visible',
                        mb: 2,
                        mt: 2
                      }}
                    >
                      <Controller
                        defaultValue={''}
                        name='dualRole'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <>
                            <InputLabel>Role</InputLabel>
                            <Select
                              label='Select a role'
                              value={selectUser ? informativeIdRole : value}
                              error={Boolean(errors.dualRole)}
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
                        <FormHelperText sx={{ color: 'error.main' }}>This action is required.</FormHelperText>
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
                onClick={handleInputEmail}
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
