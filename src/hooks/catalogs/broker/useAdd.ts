import BrokeService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useAddBroker = () => {
  const saveBroker = async (data: Omit<BrokerDto, 'id'>) => {
    const broker = await BrokeService.add(data)

    return broker
  }

  return {
    saveBroker
  }
}
