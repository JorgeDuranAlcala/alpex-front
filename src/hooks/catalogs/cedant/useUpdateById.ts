import BrokeService from 'src/services/catalogs/cedant.service'
import { CedantDto } from 'src/services/catalogs/dtos/cedant.dto'

export const useUpdateById = () => {
  const update = async (id: number, cedant: Omit<CedantDto, 'id'>) => {
    const updateCedant = await BrokeService.updateById(id, cedant)

    return updateCedant
  }

  return {
    update
  }
}
