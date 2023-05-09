import { RETRO_CEDANT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CurrencyDto } from './dtos/CurrencyDto'

class RetroCedantService {
  async getAll(): Promise<CurrencyDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CurrencyDto[]>>(RETRO_CEDANT_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CurrencyDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addRetroCedant(retroCedant: Partial<CurrencyDto>): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CurrencyDto>>(RETRO_CEDANT_ROUTES.ADD, {
        ...retroCedant
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<CurrencyDto>): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CurrencyDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`, {
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
