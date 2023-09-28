import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ReinsurerInfo } from '../interfaces/reinsurerInfo'
import { payableReinsuranceIdAdapter } from '../services/getPayableReinsurerId/frontAdapters/payableReinsuranceIdAdapter'
import { getPayableReinsuredIdService } from '../services/getPayableReinsurerId/getPayableReinsuredIdService'

export const useReinsurerDetails = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [reinsurerDetails, setReinsurerDetails] = useState<ReinsurerInfo | null>(null)

  const { id } = router.query

  const getPayableReinsuranceIdAsync = async (id:number) => {
    const reinsuredInfo = await getPayableReinsuredIdService({capabilityId: +id})

    const reinsuredDetailsAdapted = payableReinsuranceIdAdapter(reinsuredInfo)
    console.log('reinsuredDetailsAdapted', reinsuredDetailsAdapted)
    setReinsurerDetails(reinsuredDetailsAdapted)
    setIsLoading(false)
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      console.log('id', id)
        getPayableReinsuranceIdAsync(+id)
    }
  }, [id])

  return {
    isLoading,
    reinsurerDetails
  }
}
