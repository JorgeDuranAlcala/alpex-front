import InactivityModal from '@/views/components/modals/InactivityModal'
import { useEffect, useRef, useState } from 'react'

const InactivityDetector: React.FC<{ timeout: number; warningTimeout: number }> = ({ timeout, warningTimeout }) => {
  const timeoutRef = useRef<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [openDeleteCountry, setOpenDeleteCountry] = useState(false)

  const handleUserActivity = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    console.log('User is inactive')
    setShowModal(true)

    timeoutRef.current = window.setTimeout(() => {
      // Perform your desired action here (e.g., show a warning)
      console.log('After timeout')
    }, timeout)
  }

  // Create a debounced version of the handleUserActivity function
  const debouncedHandleUserActivity = useRef(
    (() => {
      let timer: number | null = null

      return () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = window.setTimeout(handleUserActivity, warningTimeout)
      }
    })()
  ).current

  useEffect(() => {
    window.addEventListener('mousemove', debouncedHandleUserActivity)
    window.addEventListener('keydown', debouncedHandleUserActivity)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      window.removeEventListener('mousemove', debouncedHandleUserActivity)
      window.removeEventListener('keydown', debouncedHandleUserActivity)
    }
  }, [debouncedHandleUserActivity])

  const deleteCountry = async () => {
    console.log('LA acción we')
    setOpenDeleteCountry(false)
  }

  return (
    <>
      <InactivityModal
        openModal={showModal}
        onClose={() => {
          setOpenDeleteCountry(false)
        }}
        onDelete={deleteCountry}
        textItem='Country'
      />
    </>
  )
}

export default InactivityDetector
