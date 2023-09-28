import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BrokerInfo } from '../interfaces/brokerInfo'
import { receivableBrokerIdAdapter } from '../services/getReceivableBrokerId/frontAdapters/ReceivableBrokerIdAdapter'
import { getReceivableBrokerIdService } from '../services/getReceivableBrokerId/getReceivableBrokerIdService'

export const useBrokerDetails = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [brokerDetails, setBrokerDetails] = useState<BrokerInfo | null>(null)

  const { id } = router.query

  const getReceivableBrokerIdAsync = async (id:number) => {
    const brokerInfo = await getReceivableBrokerIdService({capabilityId: +id})

    const brokerDetailsAdapted = receivableBrokerIdAdapter(brokerInfo)
    setBrokerDetails(brokerDetailsAdapted)
    setIsLoading(false)
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getReceivableBrokerIdAsync(+id)
    }
  }, [id])

  return {
    isLoading,
    brokerDetails
  }
}
