import { ACCOUNT_SECURITY_TOTAL_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { AppAlpexApiGateWayNoToken } from '../app.alpex.api-getway-no-jwt'
import { SecurityTotalDto } from './dtos/securityTotal.dto'

class SecurityTotalService {
  async addSecurityTotal(
    securityTotalIn: Partial<SecurityTotalDto>,
    jwtToken: string
  ): Promise<SecurityTotalDto | string> {
    try {
      const { data } = await AppAlpexApiGateWayNoToken.post<Promise<SecurityTotalDto>>(
        ACCOUNT_SECURITY_TOTAL_ROUTES.ADD,
        {
          ...securityTotalIn
        },
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

  async getByIdAccount(idAccount: number): Promise<SecurityTotalDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SecurityTotalDto>>(
        `${ACCOUNT_SECURITY_TOTAL_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<SecurityTotalDto>): Promise<SecurityTotalDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SecurityTotalDto>>(
        `${ACCOUNT_SECURITY_TOTAL_ROUTES.UPDATE}/${id}`,
        {
          ...update
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new SecurityTotalService()
