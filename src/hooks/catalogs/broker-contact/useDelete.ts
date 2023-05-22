import BrokeContactService from '@/services/catalogs/broker-contact.service'
import { BrokerContactsDeleteDto } from '@/services/catalogs/dtos/broker-contact.dto'

export const useDeleteBrokerContact = () => {
  const deleteBrokerContact = async (brokerContactsDelete: Partial<BrokerContactsDeleteDto>) => {
    const deleteBrokerContacts = await BrokeContactService.deleteBrokerContacts(brokerContactsDelete)

    return deleteBrokerContacts
  }

  return {
    deleteBrokerContact
  }
}
