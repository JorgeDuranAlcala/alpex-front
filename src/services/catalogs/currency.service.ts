import { CURRENCY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CurrencyDto } from './dtos/CurrencyDto'

class CurrencyService {
  async getAll(): Promise<CurrencyDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CurrencyDto[]>>(CURRENCY_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CurrencyDto>>(`${CURRENCY_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addCurrency(currency: Partial<CurrencyDto>): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CurrencyDto>>(CURRENCY_ROUTES.ADD, {
        ...currency
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<CurrencyDto>): Promise<CurrencyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CurrencyDto>>(`${CURRENCY_ROUTES.GET_BY_ID}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async deleteById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<CurrencyDto>>(`${CURRENCY_ROUTES.DELETE}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CurrencyService()
