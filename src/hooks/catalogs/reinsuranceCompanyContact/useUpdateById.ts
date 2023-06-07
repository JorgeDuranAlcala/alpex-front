import { ReinsuranceCompanyContactDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyContact.dto'
import ReinsuranceCompanyContactService from 'src/services/catalogs/reinsuranceCompanyContact.service'

export const useUpdateById = () => {
  const update = async (id: number, reinsuranceCompanyContact: Omit<ReinsuranceCompanyContactDto, 'id'>) => {
    const updateReinsuranceCompanyContact = await ReinsuranceCompanyContactService.updateById(
      id,
      reinsuranceCompanyContact
    )

    return updateReinsuranceCompanyContact
  }

  return {
    update
  }
}
