import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

export const useAddBrokerContact = () => {
  const saveBrokerContact = async (data: Omit<BrokerContactDto, 'id'>) => {
    const contact = await BrokerContactService.add(data)

    return contact
  }

  return {
    saveBrokerContact
  }
}
