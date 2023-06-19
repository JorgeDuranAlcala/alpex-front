// ** React Imports
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Lottie from 'react-lottie'
import loginAnimation from './animations/login-animation.json'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Footer from 'src/layouts/components/footer'

// ** Styled Components
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

type FormData = {
  email: string
  password: string
}

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

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [authError, setAuthError] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email, password } = data
    auth.login({ email: email.trim(), password: password.trim(), rememberMe }, () => {
      setAuthError(true)
    })
  }

  return (
    <div className='login-view'>
      <Footer isLogin={true} />
      <Background />
      <div className='login-form'>
        <div className='form-row title-form'>
          <div className='logo'>
            <img alt='logo' src='/images/logos/logo-alpex.svg' />
          </div>
        </div>
        <div className='form-row directions'>Login with your email and password.</div>
        <div className='form-row form-inputs'>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Email'
                    value={value || ''}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2535A8'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                    }}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  Enter a valid email, example: name@email.com
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value || ''}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    id='auth-login-v2-password'
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
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2535A8'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                    }}
                  />
                )}
              />

              {authError && <FormHelperText sx={{ color: 'error.main' }}>Incorrect email or password.</FormHelperText>}
            </FormControl>
          </form>
        </div>
        <div className='remember-me'>
          <FormControlLabel
            label='Remember Me'
            control={
              <Checkbox
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                sx={{
                  color: '#2535A8',
                  '&.Mui-checked': {
                    color: '#2535A8'
                  }
                }}
              />
            }
          />
        </div>
        <div className='form-row login-btn'>
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            sx={{ mb: 7 }}
            style={{ backgroundColor: '#2535A8' }}
          >
            Login
          </Button>
        </div>
        <div className='form-row'>
          <Link href='/forgot-password/' className='forgot-text'>
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
