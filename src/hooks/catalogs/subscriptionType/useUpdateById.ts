import { SubscriptionTypeDto } from 'src/services/catalogs/dtos/SubscriptionType.dto'
import SubscriptionTypeService from 'src/services/catalogs/subscriptionType.service'

export const useUpdateById = () => {
  const update = async (id: number, subscriptionType: Omit<SubscriptionTypeDto, 'id'>) => {
    const updateSubscriptionType = await SubscriptionTypeService.updateById(id, subscriptionType)

    return updateSubscriptionType
  }

  return {
    update
  }
}
