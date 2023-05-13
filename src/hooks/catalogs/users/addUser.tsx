import { useEffect, useState } from 'react'
import { UsersGetDto, UsersPostDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useAddUser = (userPost: UsersPostDto | null) => {
  const [user, setUser] = useState<UsersGetDto[]>([])

  useEffect(() => {
    if (!userPost) return
    UserService.addUser(userPost)
      .then(user => {
        setUser(user)
      })
      .catch(error => {
        throw error
      })
  }, [userPost])

  return {
    user
  }
}