import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { ACCOUNT_HISTORY_LOG_ROUTES } from '@/configs/api'

/**
 *  service responsible of the  account methods
 */
class AccountServices {
  /**
   * brings the account history by idAccount
   * @param idAccount
   * @returns
   */
  async getAllByIdAccount(idAccount: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_HISTORY_LOG_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new AccountServices()
