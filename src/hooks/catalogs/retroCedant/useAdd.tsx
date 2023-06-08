import { RetroCedantDto } from 'src/services/catalogs/dtos/RetroCedantDto'
import RetroCedantService from 'src/services/catalogs/retroCedant.service'

export const useAddRetroCedant = () => {
  const saveRetroCedant = async (typeOfLimitDtoAdd: Omit<RetroCedantDto, 'id'>) => {
    try {
      const resp = await RetroCedantService.addRetroCedant(typeOfLimitDtoAdd)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { saveRetroCedant }
}
