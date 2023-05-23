import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

export const useUpdateById = () => {
  const update = async (id: number, brokerContact: Omit<BrokerContactDto, 'id'>) => {
    const updateBrokerContact = await BrokerContactService.updateById(id, brokerContact)

    return updateBrokerContact
  }

  return {
    update
  }
}
