import { ACCOUNT_SUBLIMIT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { SublimitDto } from './dtos/sublimit.dto'

class SublimitService {
  async addSublimits(sublimitsIn: Partial<SublimitDto>[]): Promise<SublimitDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<SublimitDto[]>>(ACCOUNT_SUBLIMIT_ROUTES.ADD, sublimitsIn)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getAllByIdAccount(idAccount: number): Promise<SublimitDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SublimitDto[]>>(
        `${ACCOUNT_SUBLIMIT_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async update(update: Partial<SublimitDto>[]): Promise<SublimitDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SublimitDto[]>>(ACCOUNT_SUBLIMIT_ROUTES.UPDATE, update)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new SublimitService()
