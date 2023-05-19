import BrokeService from '@/services/catalogs/broker.service'
import { BrokersDeleteDto } from 'src/services/catalogs/dtos/broker.dto'

export const useDeleteBroker = () => {
  const deleteBroker = async (brokersDelete: Partial<BrokersDeleteDto>) => {
    const deleteBrokers = await BrokeService.deleteBrokers(brokersDelete)

    return deleteBrokers
  }

  return {
    deleteBroker
  }
}
