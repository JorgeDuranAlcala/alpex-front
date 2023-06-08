import RetroCedantService from '@/services/catalogs/retroCedant.service'
import { RetroCedantsDeleteDto } from 'src/services/catalogs/dtos/RetroCedantDto'

export const useDeleteRetroCedant = () => {
  const deleteRetroCedant = async (retroCedantsDelete: Partial<RetroCedantsDeleteDto>) => {
    const deleteRetroCedants = await RetroCedantService.deleteRetroCedants(retroCedantsDelete)

    return deleteRetroCedants
  }

  return {
    deleteRetroCedant
  }
}
