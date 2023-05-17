import { useEffect, useState } from 'react'
import { UsersDeleteDto, UsersGetDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useDeleteUser = (userDelete: UsersDeleteDto) => {
  const [user, setUser] = useState<UsersGetDto[]>([])

  useEffect(() => {
    if (!userDelete) return
    UserService.deleteUsers(userDelete)
      .then(user => {
        setUser(user)
      })
      .catch(error => {
        throw error
      })
  }, [userDelete])

  return {
    user
  }
}
