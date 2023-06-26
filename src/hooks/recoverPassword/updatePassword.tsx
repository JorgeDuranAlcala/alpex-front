import { IRespondePassword, PasswordPutDto } from '@/services/recoveryPassword/dtos/RecoveryPassDto'
import recoveryPasswordService from '@/services/recoveryPassword/recoveryPassword.service'
import { useEffect, useState } from 'react'

export const useUpdatePassword = () => {
  const [response, setResponse] = useState<IRespondePassword>()
  const [updatePassword, setUpdatePassword] = useState<PasswordPutDto>()
  const [token, setToken] = useState<string | string[] | undefined>()

  const updatePass = async (updatePasswords: Partial<PasswordPutDto>, token: string | string[] | undefined) => {
    try {
      const updatePassword = await recoveryPasswordService.updatePassword(updatePasswords, token)
      console.log(updatePassword)
      setResponse(updatePassword)

      return updatePassword
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (updatePassword && token) {
      updatePass(updatePassword, token)
    }
  }, [updatePassword, token])

  return {
    response,
    setToken,
    setUpdatePassword
  }
}
