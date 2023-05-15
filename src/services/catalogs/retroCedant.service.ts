import { RETRO_CEDANT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { RetroCedantDto } from './dtos/RetroCedantDto'

class RetroCedantService {
  async getAll(): Promise<RetroCedantDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantDto[]>>(RETRO_CEDANT_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addRetroCedant(retroCedant: Partial<RetroCedantDto>): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<RetroCedantDto>>(RETRO_CEDANT_ROUTES.ADD, {
        ...retroCedant
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<RetroCedantDto>): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<RetroCedantDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new RetroCedantService()
