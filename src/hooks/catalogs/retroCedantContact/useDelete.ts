import { RetroCedantContactsDeleteDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import BrokeContactService from '@/services/catalogs/retroCedantContact.service'

export const useDeleteRetroCedantContact = () => {
  const deleteRetroCedantContact = async (retroCedantContactsDelete: Partial<RetroCedantContactsDeleteDto>) => {
    const deleteRetroCedantContacts = await BrokeContactService.deleteRetroCedantContacts(retroCedantContactsDelete)

    return deleteRetroCedantContacts
  }

  return {
    deleteRetroCedantContact
  }
}
