// ** React Imports
import { ReactNode, useState } from 'react'
import Lottie from 'react-lottie'
import loginAnimation from './animations/login-animation.json'

// ** MUI Components
import Button from '@mui/material/Button'

// ** Layout Import
import { Icon } from '@iconify/react'
import { Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import EmailStep1 from './email/emailStep1'
import EmailStep2 from './email/emailStep2'
import InitialStep from './initialStep'
import WSStep1 from './whatsapp/wsStep1'
import WSStep2 from './whatsapp/wsStep2'

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

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(0)
  const [variantStep, setVariantStep] = useState('')

  const handleVariant = (variant: string, step: number) => {
    setVariantStep(variant)
    setStep(step)
  }
  const Back = () => {
    return (
      <div className='back'>
        <Button
          onClick={() => {
            handleVariant(variantStep, step - 1)
          }}
          variant='text'
          color='primary'
          size='large'
          startIcon={<Icon icon='mdi:arrow-left-thin' fontSize={15} />}
        >
          BACK
        </Button>
      </div>
    )
  }
  const shouldBackButton = [1]
  const shouldBackButtonWS = [1, 2, 3]
  const subtitles = [
    'How would you like to reset your password?',
    `Enter your email and we'll send you instructions to reset your password.`,
    `We have sent you a link to reset your password, remember to check the spam folder too.`
  ]
  const wssubtitles = [
    'How would you like to reset your password?',
    `Enter your WhatsApp and we'll send you a code to reset your password.`,
    `Enter the 6 digit code we sent to your WhatsApp:`
  ]

  return (
    <div className='password-view'>
      <Background />
      <div className='container'>
        <div className='main-form'>
          {shouldBackButton.includes(step) && variantStep === 'email' ? <Back /> : ''}
          {shouldBackButtonWS.includes(step) && variantStep === 'whatsapp' ? <Back /> : ''}

          <Typography variant='h6' sx={{ mb: 4 }}>
            Forgot Password
          </Typography>
          <Typography variant='subtitle2' sx={{ mb: 6 }}>
            {variantStep === 'email' || variantStep === '' ? subtitles[step] : wssubtitles[step]}
          </Typography>
          {step === 0 ? (
            <InitialStep handleVariant={handleVariant} />
          ) : variantStep === 'email' ? (
            step === 1 ? (
              <EmailStep1 handleVariant={handleVariant} />
            ) : step === 2 ? (
              <EmailStep2 handleVariant={handleVariant} />
            ) : (
              <InitialStep handleVariant={handleVariant} />
            )
          ) : variantStep === 'whatsapp' ? (
            step === 1 ? (
              <WSStep1 handleVariant={handleVariant} />
            ) : step === 2 ? (
              <WSStep2 />
            ) : (
              <InitialStep handleVariant={handleVariant} />
            )
          ) : (
            <InitialStep handleVariant={handleVariant} />
          )}
        </div>
      </div>
    </div>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPasswordPage.guestGuard = true

export default ForgotPasswordPage
