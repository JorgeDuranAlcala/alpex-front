import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { ACCOUNT_ROUTES } from '@/configs/api'
import { ResponseGetAccount } from '@/hooks/accounts/forms/useGetById'
import { queryBuilder } from '@/services/helper/queryBuilder'
import { IAccountsState } from '@/types/apps/accountsTypes'
import { UpdateStatusArrayDto, UpdateTypeLogoDto } from './dtos/account.dto'

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
      const { data } = await AppAlpexApiGateWay.get<ResponseGetAccount>(`${ACCOUNT_ROUTES.GET_BY_ID}/${id}`)

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
  async getAccounts(accountsData: IAccountsState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(accountsData.filters, ACCOUNT_ROUTES.GET_ALL)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${accountsData.info.take}&page=${accountsData.info.page}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * deactivate accounts by id
   * @returns
   */
  async deleteAccounts(accountsIds: number[]) {
    try {
      const { data } = await AppAlpexApiGateWay.post(ACCOUNT_ROUTES.DELETE, {
        accountsIds
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * duplicate accounts
   * @returns
   */
  async duplicateAccounts(accountsIds: number[]) {
    try {
      const { data } = await AppAlpexApiGateWay.post(ACCOUNT_ROUTES.DUPLICATE, {
        accountsIds
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * update accounts status, need an array
   * @returns
   */
  async updateAccountsStatus(updateStatus: UpdateStatusArrayDto) {
    try {
      const { data } = await AppAlpexApiGateWay.post(ACCOUNT_ROUTES.UPDATE_STATUS, updateStatus)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * brings the last account with the specified id broker
   * @param id
   * @returns
   */
  async getLastAccountByIdBroker(idBroker: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_ROUTES.GET_LAST_BY_ID_BROKER}/${idBroker}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateTypeLogo(updateTypeLogo: UpdateTypeLogoDto) {
    try {
      const { data } = await AppAlpexApiGateWay.post(ACCOUNT_ROUTES.UPDATE_TYPE_LOGO, updateTypeLogo)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new AccountServices()
