import { ACCOUNT_STATUS_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { AccountStatusDto } from 'src/services/catalogs/dtos/accountStatus.dto'

class BrokerContactService {
  async getAll(): Promise<AccountStatusDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<AccountStatusDto[]>>(ACCOUNT_STATUS_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<AccountStatusDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<AccountStatusDto>>(
        `${ACCOUNT_STATUS_ROUTERS.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new BrokerContactService()
