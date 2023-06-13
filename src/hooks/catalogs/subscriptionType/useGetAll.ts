import { useEffect, useState } from 'react'
import { SubscriptionTypeDto } from 'src/services/catalogs/dtos/SubscriptionType.dto'
import SubscriptionTypeService from 'src/services/catalogs/subscriptionType.service'

export const useGetAllSubscriptionType = () => {
  const [subscriptionTypes, setSubscriptionType] = useState<SubscriptionTypeDto[]>([])

  const getAllSubscriptionType = async () => {
    const data = await SubscriptionTypeService.getAll()
    setSubscriptionType(data)
  }

  useEffect(() => {
    getAllSubscriptionType()
  }, [])

  return {
    subscriptionTypes,
    getAllSubscriptionType
  }
}
