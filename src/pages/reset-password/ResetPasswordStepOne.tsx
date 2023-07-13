// ** React Imports
import { useRouter } from 'next/router'

// import queryString from 'query-string'
import { useEffect, useState } from 'react'

// ** MUI Components

// ** Layout Import

import { useUpdatePassword } from '@/hooks/recoverPassword/updatePassword'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = {
  password: string
  passwordConfirm: string
}

interface InitialStep {
  handleVariant: (variant: string, step: number) => void
}

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  passwordConfirm: yup.string().min(5).required()
})

const ResetPasswordStepOne = ({ handleVariant }: InitialStep) => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { setToken, setUpdatePassword, response } = useUpdatePassword()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormData> = data => {
    if (data.password === data.passwordConfirm) {
      setUpdatePassword({ password: data?.password, passwordConfirm: data?.passwordConfirm })
      setToken(router.query.token)
    } else {
      setError('passwordConfirm', {
        type: 'manual',
        message: 'Password does not match'
      })
    }
  }

  useEffect(() => {
    if (response?.statusCode === 200) {
      handleVariant('succesResetPass', 1)
    }
  }, [handleVariant, response?.statusCode])

  return (
    <div className='container'>
      <div className='main-form'>
        <Typography variant='h6' sx={{ mb: 4 }}>
          Reset Password
        </Typography>
        <Typography variant='subtitle2' sx={{ mb: 6 }}>
          Enter your new password, consider it must have 8 characters and a special character.
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              New password
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  style={{ border: '#2535A8' }}
                  value={value}
                  onBlur={onBlur}
                  label='New password'
                  onChange={onChange}
                  id='auth-login-v2-password'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 8 }}>
            <InputLabel htmlFor='auth-login-v2-confirmPassword' error={Boolean(errors.password)}>
              Confirm password
            </InputLabel>
            <Controller
              name='passwordConfirm'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label='Confirm password'
                  onChange={onChange}
                  id='auth-login-v2-confirmPassword'
                  error={Boolean(errors.passwordConfirm)}
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Icon icon={showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.passwordConfirm && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                'Password does not match'
              </FormHelperText>
            )}
          </FormControl>
          <div className='buttons'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              style={{ backgroundColor: '#2535A8' }}
            >
              CONTINUE
            </Button>
            <Button
              onClick={() => router.push('/login')}
              variant='text'
              size='large'
              startIcon={<Icon icon='mdi:arrow-left-thin' fontSize={20} color='#2535A8' />}
            >
              <Typography fontWeight={500} fontSize={'15px'} letterSpacing={'0.46px'} color={'#2535A8'}>
                Back to login
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordStepOne
