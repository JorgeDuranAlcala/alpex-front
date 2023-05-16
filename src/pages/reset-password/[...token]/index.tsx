// ** React Imports
import loginAnimation from '@/pages/reset-password/animations/login-animation.json'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import Lottie from 'react-lottie'

// ** MUI Components

// ** Layout Import

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import * as yup from 'yup'

type FormData = {
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  confirmPassword: yup.string().min(5).required()
})
const Background = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className='background'>
      <div>
        <Lottie options={defaultOptions} />
      </div>
    </div>
  )
}

export interface ForgotPasswordProps {
  token: string[]
}

const ForgotPasswordPage = ({ token }: ForgotPasswordProps) => {
  const router = useRouter()
  console.log(router.query.token)
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<FormData> = data => {
    if (data.password !== data.confirmPassword)
      setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match'
      })
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  return (
    <div className='password-view'>
      <Background />
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
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Confirm password
              </InputLabel>
              <Controller
                name='confirmPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Confirm password'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.confirmPassword)}
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
              {errors.confirmPassword && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <div className='buttons'>
              <Button type='submit' variant='contained' color='primary' size='large'>
                CONTINUE
              </Button>
              <Button
                onClick={() => router.push('/login')}
                variant='text'
                color='primary'
                size='large'
                startIcon={<Icon icon='mdi:arrow-left-thin' fontSize={20} />}
              >
                BACK TO LOGIN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPasswordPage.guestGuard = true

export default ForgotPasswordPage
