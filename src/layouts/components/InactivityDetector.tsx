import { useEffect, useState } from 'react'

// ** Custom Hooks
import useIdleTimeout from '@/hooks/useIdleTimeout'

// ** Components
import InactivityModal from '@/views/components/modals/InactivityModal'

// ** Utils
import { formatTime } from '@/utils/formatDates'

const InactivityDetector: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [remaining, setRemaining] = useState<number>(0)
  const [userLocalData, setuserLocalData] = useState<userLocalDataDto>({})
  const { idleTimer, handleIdle } = useIdleTimeout(() => {
    setOpenModal(true)
  }, 10 * 60)

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
        headingText={`Are you there, ${userLocalData?.fullName}?`}
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
