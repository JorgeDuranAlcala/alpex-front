import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'

// ** Components
import TokenModal from '@/views/components/modals/TokenModal'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

// ** Utils
import { formatTime } from '@/utils/formatDates'

// ** Custom Hooks
import { useAuth } from '@/hooks/useAuth'

const TOKEN_WARNING_THRESHOLD = 20 // s
const INTERVAL_TIME_CHECK = 10 * 1000 // ms

const CheckTokenValidityLayout: React.FC = () => {
  // ** Hooks
  const [userLocalData, setuserLocalData] = useState<userLocalDataDto>({})
  const [openModal, setOpenModal] = useState(false)
  const [remaining, setRemaining] = useState<number>(0)
  const { logout } = useAuth()

  type userLocalDataDto = {
    email?: string
    fullName?: string
    id?: string
    role?: string
    username?: string
  }

  const checkTokenValidity = (): void => {
    const remainingTime = calculateRemainingTime()
    console.log('Low remainingTime', remainingTime)

    if (remainingTime <= TOKEN_WARNING_THRESHOLD) {
      if (!openModal) setOpenModal(true)
    }
  }

  const calculateRemainingTime = (): number => {
    const token = localStorage.getItem(defaultAuthConfig.storageTokenKeyName)

    if (token) {
      // @ts-ignore
      const decodedToken: { exp: number } = jwt.decode(token, { complete: true })?.payload
      const currentTime = Math.floor(Date.now() / 1000)

      return decodedToken.exp - currentTime
    } else {
      return 0
    }
  }

  const refreshToken = () => {
    console.log('refreshToken')
  }

  const handleLogout = () => {
    console.log('closeSession')
    setOpenModal(false)
    logout()
  }

  // Check token each INTERVAL_TIME_CHECK
  useEffect(() => {
    const token = localStorage.getItem(defaultAuthConfig.storageTokenKeyName)

    if (token && userLocalData) {
      checkTokenValidity()

      const interval = setInterval(() => {
        checkTokenValidity()
      }, INTERVAL_TIME_CHECK)

      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update remaining time more fastly, only when show modal
  useEffect(() => {
    if (openModal) {
      const interval = setInterval(() => {
        const remainingTime = calculateRemainingTime()
        console.log('Fast remainingTime', remainingTime)
        setRemaining(remainingTime)
        remainingTime < 0 && logout()
      }, 500)

      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  // Charge user data
  useEffect(() => {
    const userData = JSON.parse(String(localStorage.getItem('userData')))
    setuserLocalData(userData)
  }, [])

  return (
    <>
      <TokenModal
        renderButton={() => <span> </span>}
        headingText={`Session timeout warning`}
        text='Your session is about to expire. Do you want to extend the session?'
        handleClickContinue={handleLogout}
        setShow={openModal}
        onClose={refreshToken}
        remainingTime={formatTime(remaining)}
      />
    </>
  )
}

export default CheckTokenValidityLayout
