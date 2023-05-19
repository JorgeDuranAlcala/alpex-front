import BrokeService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useUpdateById = () => {
  const update = async (id: number, broker: Omit<BrokerDto, 'id'>) => {
    const updateBroker = await BrokeService.updateById(id, broker)

    return updateBroker
  }

  return {
    update
  }
}
