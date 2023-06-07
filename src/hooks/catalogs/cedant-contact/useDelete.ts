import BrokeContactService from '@/services/catalogs/cedant-contact.service'
import { CedantContactsDeleteDto } from '@/services/catalogs/dtos/cedant-contact.dto'

export const useDeleteCedantContact = () => {
  const deleteCedantContact = async (cedantContactsDelete: Partial<CedantContactsDeleteDto>) => {
    const deleteCedantContacts = await BrokeContactService.deleteCedantContacts(cedantContactsDelete)

    return deleteCedantContacts
  }

  return {
    deleteCedantContact
  }
}
