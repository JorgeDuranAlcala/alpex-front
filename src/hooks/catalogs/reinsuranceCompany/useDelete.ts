import ReinsuranceCompanyService from '@/services/catalogs/reinsuranceCompany.service'
import { ReinsuranceCompanysDeleteDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'

export const useDeleteReinsuranceCompany = () => {
  const deleteReinsuranceCompany = async (reinsuranceCompanyDelete: Partial<ReinsuranceCompanysDeleteDto>) => {
    const deleteReinsuranceCompanys = await ReinsuranceCompanyService.deleteReinsuranceCompany(reinsuranceCompanyDelete)

    return deleteReinsuranceCompanys
  }

  return {
    deleteReinsuranceCompany
  }
}
