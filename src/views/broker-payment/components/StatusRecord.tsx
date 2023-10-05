import { useEffect, useState } from 'react'

interface StatusInstallment {
  setSelectedStatus: React.Dispatch<React.SetStateAction<any>>
  initialStatus: string
  margin?: number
}

export default function StatusInstallment({ status }: any) {
  const [classStatus, setClassStatus] = useState('')
  useEffect(() => {
    const chekcStatus = status.toLowerCase()
    const classN = chekcStatus + '-status'
    setClassStatus(classN)
  }, [status])

  return (
    <div className='status-select'>
      <div className={classStatus}>{status}</div>
    </div>
  )
}
