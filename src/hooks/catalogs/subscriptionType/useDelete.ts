import SubscriptionTypeService from '@/services/catalogs/subscriptionType.service'

export const useDeleteSubscriptionType = () => {
  const deleteSubscriptionType = async (id: number) => {
    const deleteSubscriptionTypeById = await SubscriptionTypeService.deleteById(id)

    return deleteSubscriptionTypeById
  }

  return {
    deleteSubscriptionType
  }
}
