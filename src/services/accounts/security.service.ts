import { ACCOUNT_SECURITY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { AppAlpexApiGateWayNoToken } from '../app.alpex.api-getway-no-jwt'
import { SecurityDto } from './dtos/security.dto'

class SecurityService {
  async addSecurity(securitiesIn: Partial<SecurityDto>[], jwtToken: string): Promise<SecurityDto[] | string> {
    try {
      const { data } = await AppAlpexApiGateWayNoToken.post<Promise<SecurityDto[]>>(
        ACCOUNT_SECURITY_ROUTES.ADD,
        securitiesIn,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )

      return data
    } catch (error) {
      return 'error'
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
      const { data } = await AppAlpexApiGateWay.put<Promise<SecurityDto[]>>(ACCOUNT_SECURITY_ROUTES.UPDATE, update)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new SecurityService()
