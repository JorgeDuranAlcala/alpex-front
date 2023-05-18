import CedantContactService from 'src/services/catalogs/cedant-contact.service'
import { CedantContactDto } from 'src/services/catalogs/dtos/cedant-contact.dto'

export const useAddCedantContact = () => {
  const saveCedantContact = async (data: Omit<CedantContactDto, 'id'>) => {
    const contact = await CedantContactService.add(data)

    return contact
  }

  return {
    saveCedantContact
  }
}
