// ** React Imports
import loginAnimation from '@/pages/reset-password/animations/resetPassword-animation.json'

// import queryString from 'query-string'
import { ReactNode, useState } from 'react'
import Lottie from 'react-lottie'

// ** MUI Components

// ** Layout Import

import BlankLayout from 'src/@core/layouts/BlankLayout'
import ResetPasswordStepOne from './ResetPasswordStepOne'
import SuccessResetPassword from './SuccessResetPassword'

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
  const [variantStep, setVariantStep] = useState<string>('')
  const handleVariant = (variant: string, step: number) => {
    setVariantStep(variant)
    setStep(step)
  }

  return (
    <div className='password-view'>
      <Background />
      {step === 0 ? (
        <ResetPasswordStepOne handleVariant={handleVariant} />
      ) : (
        variantStep === 'succesResetPass' && step === 1 && <SuccessResetPassword />
      )}
    </div>
  )
}

ForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPasswordPage.guestGuard = true

export default ForgotPasswordPage
