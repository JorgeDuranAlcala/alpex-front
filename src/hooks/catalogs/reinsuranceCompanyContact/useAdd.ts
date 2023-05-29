import { ReinsuranceCompanyContactDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyContact.dto'
import ReinsuranceCompanyContactService from 'src/services/catalogs/reinsuranceCompanyContact.service'

export const useAddReinsuranceCompanyContact = () => {
  const saveReinsuranceCompanyContact = async (data: Omit<ReinsuranceCompanyContactDto, 'id'>) => {
    const contact = await ReinsuranceCompanyContactService.add(data)

    return contact
  }

  return {
    saveReinsuranceCompanyContact
  }
}
