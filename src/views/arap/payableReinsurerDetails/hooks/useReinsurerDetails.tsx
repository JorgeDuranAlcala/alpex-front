import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { reinsurer_info_mock } from '../../mocks/reinsurer_info_mock'
import { ReinsurerInfo } from '../interfaces/reinsurerInfo'

export const useReinsurerDetails = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [reinsurerDetails, setReinsurerDetails] = useState<ReinsurerInfo | null>(null)

  const { id } = router.query

  useEffect(() => {
    setIsLoading(true)

    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {
      if (id) {
        setReinsurerDetails(reinsurer_info_mock)
        setIsLoading(false)
      }
    }, 500)
  }, [id])

  return {
    isLoading,
    reinsurerDetails
  }
}
