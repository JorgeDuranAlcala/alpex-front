import { ReinsuranceCompanyDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'
import ReinsuranceCompanyService from 'src/services/catalogs/reinsuranceCompany.service'

export const useUpdateReinsuranceCompany = () => {
  const updateReinsuranceCompany = async (id: number, update: Partial<ReinsuranceCompanyDto>) => {
    try {
      const resp = await ReinsuranceCompanyService.updateById(id, update)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { updateReinsuranceCompany }
}
