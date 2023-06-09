import { ReinsuranceCompanyBinderDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import ReinsuranceCompanyBinderService from 'src/services/catalogs/reinsuranceCompanyBinder.service'

export const useAddReinsuranceCompanyBinder = () => {
  const saveReinsuranceCompanyBinder = async (data: Omit<ReinsuranceCompanyBinderDto, 'id'>) => {
    const binder = await ReinsuranceCompanyBinderService.add(data)

    return binder
  }

  return {
    saveReinsuranceCompanyBinder
  }
}
