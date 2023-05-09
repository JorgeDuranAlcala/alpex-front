import { useState } from 'react'
import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

export const useGetAllByIdBroker = () => {
  const [contacts, setContacts] = useState<BrokerContactDto[]>()

  const findByIdBroker = async (idBroker: number): Promise<BrokerContactDto[]> => {
    const contacts = await BrokerContactService.findByIdBroker(idBroker)
    setContacts(contacts)

    return contacts
  }

  return {
    contacts,
    findByIdBroker
  }
}
