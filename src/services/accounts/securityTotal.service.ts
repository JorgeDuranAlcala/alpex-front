import { ACCOUNT_SECURITY_TOTAL_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { SecurityTotalDto } from './dtos/securityTotal.dto'

class SecurityTotalService {
  async addSecurityTotal(securityTotalIn: Partial<SecurityTotalDto>[]): Promise<SecurityTotalDto[]> {
    try {
      const response = await AppAlpexApiGateWay.post<Promise<SecurityTotalDto[]>>(ACCOUNT_SECURITY_TOTAL_ROUTES.ADD, {
        securitiesTotal: securityTotalIn
      })

      //TODO VALIDAR CON LOS ESTATUS RECIBIDOS POR EL BACK
      console.log({ responseAddSecurityTotal: response })

      return response.data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getByIdAccount(idAccount: number): Promise<SecurityTotalDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SecurityTotalDto[]>>(
        `${ACCOUNT_SECURITY_TOTAL_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(update: Partial<SecurityTotalDto>[]): Promise<SecurityTotalDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SecurityTotalDto[]>>(
        `${ACCOUNT_SECURITY_TOTAL_ROUTES.UPDATE}`,
        {
          securitiesTotal: update
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
