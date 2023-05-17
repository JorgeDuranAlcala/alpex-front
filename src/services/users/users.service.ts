import { ROLES, USERS_ROUTES } from 'src/configs/api'
import { UsersDeleteDto, UsersGetDto, UsersPostDto, UsersPutDto } from 'src/services/users/dtos/UsersDto'
import { IUsersState } from 'src/types/apps/usersTypes'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'

class UsersServices {
  async getUsers(usersData: IUsersState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(usersData.filters, USERS_ROUTES.GET)
      const { data } = await AppAlpexApiGateWay.get(`${url}&take=${usersData.info.take}&page=${usersData.info.page}`)
      console.log({ data })

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async getUserByIdRole(idRole: ROLES) {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<UsersGetDto[]>>(`${USERS_ROUTES.GET}/${idRole}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async addUser(user: Partial<UsersPostDto>): Promise<UsersGetDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<UsersGetDto[]>>(`${USERS_ROUTES.ADD}`, {
        ...user
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async editUser(user: Partial<UsersPutDto>): Promise<UsersGetDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<UsersGetDto[]>>(`${USERS_ROUTES.UPDATE}`, {
        ...user,
        headers: {
          'x-api-key': 'ZlExQKG0xPB673L3B6hClORm6oPaKcer'
        }
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteUsers(user: Partial<UsersDeleteDto>): Promise<UsersGetDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<UsersGetDto[]>>(USERS_ROUTES.DELETE, {
        ...user,
        headers: {
          'x-api-key': 'ZlExQKG0xPB673L3B6hClORm6oPaKcer'
        }
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new UsersServices()
