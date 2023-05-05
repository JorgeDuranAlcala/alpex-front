import BrokerService from '@/services/catalogs/broker.service'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'

export const useAdd = () => {
  const save = async (data: Omit<BrokerDto, 'id'>) => {
    const broker = await BrokerService.add(data)

    return broker
  }

  return {
    save
  }
}
