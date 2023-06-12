import { ReinsuranceCompanyBinderDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import ReinsuranceCompanyBinderService from 'src/services/catalogs/reinsuranceCompanyBinder.service'

export const useUpdateById = () => {
  const update = async (id: number, reinsuranceCompanyBinder: Omit<ReinsuranceCompanyBinderDto, 'id'>) => {
    const updateReinsuranceCompanyBinder = await ReinsuranceCompanyBinderService.updateById(
      id,
      reinsuranceCompanyBinder
    )

    return updateReinsuranceCompanyBinder
  }

  return {
    update
  }
}
