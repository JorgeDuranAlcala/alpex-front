import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { broker_info_mock } from '../../mocks/broker_info_mock'
import { BrokerInfo } from '../interfaces/brokerInfo'

export const useBrokerDetails = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [brokerDetails, setBrokerDetails] = useState<BrokerInfo | null>(null)

  const { id } = router.query

  useEffect(() => {
    setIsLoading(true)

    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {
      if (id) {
        setBrokerDetails(broker_info_mock)
        setIsLoading(false)
      }
    }, 500)
  }, [id])

  return {
    isLoading,
    brokerDetails
  }
}
