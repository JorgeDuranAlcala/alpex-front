import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { ACCOUNT_ROUTES } from '../../configs/api'

/**
 *  service responsible of the  account methods
 */
class AccountServices {
  /**
   * brings the account with the your id
   * @param id
   * @returns
   */
  async getAccountById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * get the all accounts actives
   * @returns
   */
  async getAccounts() {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_ROUTES.GET_ALL}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new AccountServices()
