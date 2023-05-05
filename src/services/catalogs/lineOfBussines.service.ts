import { LINE_OF_BUSSINES_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { LineOfBussinesDto } from './dtos/LineOfBussinesDto'

class LineOfBussinesService {
  async getAll(): Promise<LineOfBussinesDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<LineOfBussinesDto[]>>(LINE_OF_BUSSINES_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<LineOfBussinesDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<LineOfBussinesDto>>(
        `${LINE_OF_BUSSINES_ROUTES.GET_BY_ID}/${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addLineOfBussines(lineOfBussines: Partial<LineOfBussinesDto>): Promise<LineOfBussinesDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<LineOfBussinesDto>>(LINE_OF_BUSSINES_ROUTES.ADD, {
        ...lineOfBussines
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<LineOfBussinesDto>): Promise<LineOfBussinesDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<LineOfBussinesDto>>(
        `${LINE_OF_BUSSINES_ROUTES.GET_BY_ID}/${id}`,
        { ...update }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new LineOfBussinesService()
