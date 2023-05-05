import { TYPE_OF_LIMIT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { TypeOfLimitDto } from './dtos/typeOfLimitDto'

class TypeOfLimitService {
  async getAll(): Promise<TypeOfLimitDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<TypeOfLimitDto[]>>(TYPE_OF_LIMIT_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<TypeOfLimitDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<TypeOfLimitDto>>(`${TYPE_OF_LIMIT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addTypeOfLimit(typeOfLimit: Partial<TypeOfLimitDto>): Promise<TypeOfLimitDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<TypeOfLimitDto>>(TYPE_OF_LIMIT_ROUTES.ADD, {
        ...typeOfLimit
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<TypeOfLimitDto>): Promise<TypeOfLimitDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<TypeOfLimitDto>>(
        `${TYPE_OF_LIMIT_ROUTES.GET_BY_ID}/${id}`,
        { ...update }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new TypeOfLimitService()
