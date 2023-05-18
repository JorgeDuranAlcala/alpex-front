import CedantService from '@/services/catalogs/cedant.service'
import { CedantDto } from '@/services/catalogs/dtos/cedant.dto'

export const useAddCedant = () => {
  const saveCedant = async (data: Omit<CedantDto, 'id'>) => {
    const cedant = await CedantService.add(data)

    return cedant
  }

  return {
    saveCedant
  }
}
