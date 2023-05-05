import { TypeOfLimitDto } from 'src/services/catalogs/dtos/typeOfLimitDto'
import TypeOfLimitService from 'src/services/catalogs/typeOfLimit.service'

export const useUpdateTypeOfLimit = () => {
  const updateTypeOfLimit = async (id: number, update: Partial<TypeOfLimitDto>) => {
    try {
      const resp = await TypeOfLimitService.updateById(id, update)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { updateTypeOfLimit }
}
