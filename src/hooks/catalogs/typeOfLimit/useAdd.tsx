import { TypeOfLimitDto } from 'src/services/catalogs/dtos/typeOfLimitDto'
import TypeOfLimitService from 'src/services/catalogs/typeOfLimit.service'

export const useAddTypeOfLimit = () => {
  const addTypeOfLimit = async (typeOfLimitDtoAdd: Omit<TypeOfLimitDto, 'id'>) => {
    try {
      const resp = await TypeOfLimitService.addTypeOfLimit(typeOfLimitDtoAdd)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { addTypeOfLimit }
}
