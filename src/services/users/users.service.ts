import { USERS_ROUTES } from 'src/configs/api'
import { IUsersState } from 'src/types/apps/usersTypes'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'

class UsersServices {
  async getUsers(usersData: IUsersState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(usersData.filters, USERS_ROUTES.GET)
      const { data } = await AppAlpexApiGateWay.get(`${url}`)

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default new UsersServices()
