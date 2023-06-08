import { useEffect, useState } from 'react'
import { UsersGetDto, UsersPutDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useEditUser = () => {
  const [user, setUser] = useState<UsersGetDto[]>([])
  const [userPut, setUserPut] = useState<UsersPutDto | null>()

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
    user,
    setUserPut
  }
}
