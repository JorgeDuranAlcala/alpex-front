import CedantService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useAdd = () => {
  const save = async (data: Omit<BrokerDto, 'id'>) => {
    const broker = await CedantService.add(data)

    return broker
  }

  return {
    save
  }
}
