import { ACCOUNT_SECURITY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { SecurityDto } from './dtos/security.dto'

class SecurityService {
  async addSecurity(
    securitiesIn: Partial<{ idAccount: number; securities: Partial<SecurityDto>[] }>
  ): Promise<SecurityDto[]> {
    try {
      const response = await AppAlpexApiGateWay.post<Promise<SecurityDto[]>>(ACCOUNT_SECURITY_ROUTES.ADD, {
        ...securitiesIn
      })
      console.log({ responseAddSecurity: response })

      return response.data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getByAllIdAccount(idAccount: number): Promise<SecurityDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SecurityDto[]>>(
        `${ACCOUNT_SECURITY_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async update(update: Partial<SecurityDto>[]): Promise<SecurityDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SecurityDto[]>>(ACCOUNT_SECURITY_ROUTES.UPDATE, {
        securities: update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new SecurityService()
