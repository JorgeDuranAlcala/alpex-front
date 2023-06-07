import CedantService from '@/services/catalogs/cedant.service'
import { CedantsDeleteDto } from 'src/services/catalogs/dtos/cedant.dto'

export const useDeleteCedant = () => {
  const deleteCedant = async (cedantsDelete: Partial<CedantsDeleteDto>) => {
    const deleteCedants = await CedantService.deleteCedants(cedantsDelete)

    return deleteCedants
  }

  return {
    deleteCedant
  }
}
