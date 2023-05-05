import { LineOfBussinesDto } from 'src/services/catalogs/dtos/LineOfBussinesDto'
import LineOfBussinesService from 'src/services/catalogs/lineOfBussines.service'

export const useAddLineOfBussines = () => {
  const addLineOfBussines = async (lineOfBussinesAdd: Omit<LineOfBussinesDto, 'id'>) => {
    try {
      const resp = await LineOfBussinesService.addLineOfBussines(lineOfBussinesAdd)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { addLineOfBussines }
}
