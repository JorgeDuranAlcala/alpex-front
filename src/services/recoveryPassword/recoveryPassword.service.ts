import { RECOVER_PASSWORD_ROUTES } from '@/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { AppAlpexApiGateWayNoJWT } from '../app.alpex.api-getway-no-jwt'
import { IRespondePassword, PasswordPutDto, RecoveryPassPostDto } from './dtos/RecoveryPassDto'

class RecoveryPasswordServices {
  async recoverPassword(email: Partial<RecoveryPassPostDto>): Promise<RecoveryPassPostDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<RecoveryPassPostDto>>(
        `${RECOVER_PASSWORD_ROUTES.NOTIFICATION}`,
        {
          ...email
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async updatePassword(
    passwords: Partial<PasswordPutDto>,
    token: string | string[] | undefined
  ): Promise<IRespondePassword> {
    try {
      const { data } = await AppAlpexApiGateWayNoJWT.put<Promise<IRespondePassword>>(
        RECOVER_PASSWORD_ROUTES.UPDATE,
        {
          ...passwords
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new RecoveryPasswordServices()
