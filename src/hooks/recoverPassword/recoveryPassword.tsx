import { RecoveryPassPostDto } from '@/services/recoveryPassword/dtos/RecoveryPassDto'
import recoveryPasswordService from '@/services/recoveryPassword/recoveryPassword.service'

export const useNotificationPassword = () => {
  const recoveryPassword = async (recoveryPass: Partial<RecoveryPassPostDto>) => {
    const recoverPass = await recoveryPasswordService.recoverPassword(recoveryPass)

    return recoverPass
  }

  return {
    recoveryPassword
  }
}
