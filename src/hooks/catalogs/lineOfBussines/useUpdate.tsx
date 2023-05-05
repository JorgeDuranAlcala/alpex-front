import { LineOfBussinesDto } from 'src/services/catalogs/dtos/LineOfBussinesDto'
import LineOfBussinesService from 'src/services/catalogs/lineOfBussines.service'

export const useUpdateLineOfBussines = () => {
  const updateLineOfBussines = async (id: number, update: Partial<LineOfBussinesDto>) => {
    try {
      const resp = await LineOfBussinesService.updateById(id, update)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { updateLineOfBussines }
}
