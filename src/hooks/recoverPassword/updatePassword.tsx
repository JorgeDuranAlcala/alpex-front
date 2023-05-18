import { PasswordPutDto } from '@/services/recoveryPassword/dtos/RecoveryPassDto'
import recoveryPasswordService from '@/services/recoveryPassword/recoveryPassword.service'

export const useUpdatePassword = () => {
  const updatePass = async (updatePasswords: Partial<PasswordPutDto>, token: string | string[] | undefined) => {
    const updatePassword = await recoveryPasswordService.updatePassword(updatePasswords, token)
    console.log(updatePassword)

    return updatePassword
  }

  return {
    updatePass
  }
}
