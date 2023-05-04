import { USERS_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'
import { UsersGetDto } from './dtos/UsersDto'

class UsersServices {
  async getUsers(usersData: UsersGetDto) {
    try {
      const url = queryBuilder(usersData, USERS_ROUTES.GET)
      const { data } = await AppAlpexApiGateWay.get(`${url}`)

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default new UsersServices()
