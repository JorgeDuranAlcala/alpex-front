import { ACCOUNT_TYPE_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { AccountTypeDto } from 'src/services/catalogs/dtos/accountType.dto'

class BrokerContactService {
  async getAll(): Promise<AccountTypeDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<AccountTypeDto[]>>(ACCOUNT_TYPE_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new BrokerContactService()
