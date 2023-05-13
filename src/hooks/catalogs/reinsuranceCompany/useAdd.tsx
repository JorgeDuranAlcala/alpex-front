import { ReinsuranceCompanyDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'
import ReinsuranceCompanyService from 'src/services/catalogs/reinsuranceCompany.service'

export const useAddReinsuranceCompany = () => {
  const addReinsuranceCompany = async (reinsuranceCompany: Omit<ReinsuranceCompanyDto, 'id'>) => {
    try {
      const resp = await ReinsuranceCompanyService.addReinsuranceCompany(reinsuranceCompany)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { addReinsuranceCompany }
}
