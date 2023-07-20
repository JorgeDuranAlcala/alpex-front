import { useEffect, useState } from 'react'
import { IError, IResponse, UsersPostDto } from 'src/services/users/dtos/UsersDto'
import UserService from 'src/services/users/users.service'

export const useAddUser = () => {
  const [error, setError] = useState<IError>()

  const [user, setUser] = useState<IResponse>()
  const [userPost, setUserPost] = useState<UsersPostDto | null>()

  useEffect(() => {
    if (!userPost) return
    UserService.addUser(userPost)
      .then(user => {
        setUser(user)
      })
      .catch(error => {
        if (error?.response?.data?.statusCode === 417) {
          console.log({ error })
          setError(error.response.data)

          // throw error
        }
      })
  }, [userPost])

  return {
    user,
    setUserPost,
    error
  }
}
