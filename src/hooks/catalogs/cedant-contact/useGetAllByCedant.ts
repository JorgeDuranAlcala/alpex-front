import { useState } from 'react'
import CedantContactService from 'src/services/catalogs/cedant-contact.service'
import { CedantContactDto } from 'src/services/catalogs/dtos/cedant-contact.dto'

export const useGetAllByIdCedant = () => {
  const [contacts, setContacts] = useState<CedantContactDto[]>()

  const findByIdCedant = async (idCedant: number): Promise<CedantContactDto[]> => {
    const contacts = await CedantContactService.findByIdCedant(idCedant)
    setContacts(contacts)

    return contacts
  }

  return {
    contacts,
    findByIdCedant
  }
}
