import { useEffect, useState } from 'react'
import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

export const useGetAll = () => {
  const [contacts, setContacts] = useState<BrokerContactDto[]>()

  useEffect(() => {
    BrokerContactService.getAll()
      .then(contacts => {
        setContacts(contacts)
      })
      .catch(error => {
        throw error
      })
  }, [])

  return {
    contacts
  }
}
