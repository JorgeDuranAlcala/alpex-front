import CedantService from '@/services/catalogs/cedant.service'
import { CedantDto } from '@/services/catalogs/dtos/cedant.dto'

export const useAdd = () => {
  const save = async (data: Omit<CedantDto, 'id'>) => {
    const cedant = await CedantService.add(data)

    return cedant
  }

  return {
    save
  }
}
