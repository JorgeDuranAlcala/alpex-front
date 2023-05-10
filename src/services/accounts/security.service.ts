import { ACCOUNT_SECURITY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { SecurityDto } from './dtos/security.dto'

class SecurityService {
  async addSecurity(securityIn: Partial<SecurityDto[]>): Promise<SecurityDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<SecurityDto[]>>(ACCOUNT_SECURITY_ROUTES.ADD, {
        ...securityIn
      })

      return data
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

  async updateById(update: Partial<SecurityDto[]>): Promise<SecurityDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SecurityDto[]>>(ACCOUNT_SECURITY_ROUTES.UPDATE, {
        ...update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new SecurityService()
