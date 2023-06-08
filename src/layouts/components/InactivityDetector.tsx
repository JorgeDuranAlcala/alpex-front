import useIdleTimeout from '@/hooks/useIdleTimeout'
import InactivityModal from '@/views/components/modals/InactivityModal'
import { useEffect, useState } from 'react'

const InactivityDetector: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [remaining, setRemaining] = useState<number>(0)
  const [userLocalData, setuserLocalData] = useState<userLocalDataDto>({})
  const { idleTimer, handleIdle } = useIdleTimeout(() => {
    setOpenModal(true)
  }, 1 * 60)

  type userLocalDataDto = {
    email?: string
    fullName?: string
    id?: string
    role?: string
    username?: string
  }

  const stay = () => {
    setOpenModal(false)
    idleTimer.reset()
  }

  const handleLogout = () => {
    handleIdle()
    setOpenModal(false)
    idleTimer.reset()
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (remainingSeconds <= 0 && minutes <= 0) {
      return '00:00'
    }

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(Number(idleTimer.getRemainingTime()) / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => {
    const userData = JSON.parse(String(localStorage.getItem('userData')))
    setuserLocalData(userData)
  }, [])

  return (
    <>
      <InactivityModal
        renderButton={() => <span> </span>}
        headingText={`Are you there, ${userLocalData?.username}`}
        text='Your session will close due to inactivity, how do you want to proceed?'
        handleClickContinue={handleLogout}
        setShow={openModal}
        onClose={stay}
        remainingTime={formatTime(remaining)}
      />
    </>
  )
}

export default InactivityDetector
