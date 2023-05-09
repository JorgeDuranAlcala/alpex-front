import { ROLES } from '@/configs/api'
import { useEffect, useState } from 'react'
import { UsersGetDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useGetByIdRole = (role: ROLES) => {
  const [users, setUsers] = useState<UsersGetDto[]>([])

  useEffect(() => {
    UserService.getUserByIdRole(role)
      .then(users => {
        setUsers(users)
      })
      .catch(error => {
        throw error
      })
  }, [role])

  return {
    users
  }
}
