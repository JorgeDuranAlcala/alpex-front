import { SubscriptionTypeDto } from 'src/services/catalogs/dtos/SubscriptionType.dto'
import SubscriptionTypeService from 'src/services/catalogs/subscriptionType.service'

export const useAddSubscriptionType = () => {
  const saveSubscriptionType = async (data: Omit<SubscriptionTypeDto, 'id'>) => {
    const subscriptionType = await SubscriptionTypeService.add(data)

    return subscriptionType
  }

  return {
    saveSubscriptionType
  }
}
