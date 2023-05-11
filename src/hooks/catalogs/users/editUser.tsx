import { useEffect, useState } from 'react'
import { UsersGetDto, UsersPutDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useEditUser = (userPut: UsersPutDto | null) => {
  const [user, setUser] = useState<UsersGetDto[]>([])

  useEffect(() => {
    if (!userPut) return
    UserService.editUser(userPut)
      .then(user => {
        setUser(user)
      })
      .catch(error => {
        throw error
      })
  }, [userPut])

  return {
    user
  }
}
