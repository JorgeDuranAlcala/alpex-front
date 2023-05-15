import { RetroCedantDto } from 'src/services/catalogs/dtos/RetroCedantDto'
import RetroCedantService from 'src/services/catalogs/retroCedant.service'

export const useUpdateRetroCedant = () => {
  const updateRetroCedant = async (id: number, update: Partial<RetroCedantDto>) => {
    try {
      const resp = await RetroCedantService.updateById(id, update)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { updateRetroCedant }
}
