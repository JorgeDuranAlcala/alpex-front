import { useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useAuth } from './useAuth'

/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */
const useIdleTimeout = (onIdle: () => void, idleTime = 1) => {
  const idleTimeout = 1000 * idleTime
  const [isIdle, setIdle] = useState(false)

  // ** Hooks
  const { logout } = useAuth()

  const handleIdle = () => {
    setIdle(true)
    logout()
  }

  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptTimeout: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    debounce: 500
  })

  return {
    isIdle,
    setIdle,
    handleIdle,
    idleTimer
  }
}
export default useIdleTimeout
