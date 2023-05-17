import { UsersDeleteDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useDeleteUser = () => {
  const deleteUser = async (userDelete: Partial<UsersDeleteDto>) => {
    const deleteUsers = await UserService.deleteUsers(userDelete)

    return deleteUsers
  }

  return {
    deleteUser
  }
}
