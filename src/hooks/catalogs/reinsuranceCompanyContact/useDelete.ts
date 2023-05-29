import { ReinsuranceCompanyContactsDeleteDto } from '@/services/catalogs/dtos/ReinsuranceCompanyContact.dto'
import BrokeContactService from '@/services/catalogs/reinsuranceCompanyContact.service'

export const useDeleteReinsuranceCompanyContact = () => {
  const deleteReinsuranceCompanyContact = async (
    reinsuranceCompanyContactsDelete: Partial<ReinsuranceCompanyContactsDeleteDto>
  ) => {
    const deleteReinsuranceCompanyContacts = await BrokeContactService.deleteReinsuranceCompanyContacts(
      reinsuranceCompanyContactsDelete
    )

    return deleteReinsuranceCompanyContacts
  }

  return {
    deleteReinsuranceCompanyContact
  }
}
