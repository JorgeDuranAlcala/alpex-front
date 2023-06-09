import { ReinsuranceCompanyBindersDeleteDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import BrokeBinderService from '@/services/catalogs/reinsuranceCompanyBinder.service'

export const useDeleteReinsuranceCompanyBinder = () => {
  const deleteReinsuranceCompanyBinder = async (
    reinsuranceCompanyBindersDelete: Partial<ReinsuranceCompanyBindersDeleteDto>
  ) => {
    const deleteReinsuranceCompanyBinders = await BrokeBinderService.deleteReinsuranceCompanyBinders(
      reinsuranceCompanyBindersDelete
    )

    return deleteReinsuranceCompanyBinders
  }

  return {
    deleteReinsuranceCompanyBinder
  }
}
