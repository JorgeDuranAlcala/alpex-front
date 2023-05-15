import { AUTH_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { AppAlpexApiGateWayNoToken } from '../app.alpex.api-getway-no-jwt'
import { AuthDto } from './dtos/AuthDto'

class AuthServices {
  async login(authData: AuthDto) {
    try {
      const resp = await AppAlpexApiGateWay.post(`${AUTH_ROUTES.LOGIN}`, {
        ...authData
      })

      return resp
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async authMe(token: string | null) {
    try {
      const resp = await AppAlpexApiGateWayNoToken.get(`${AUTH_ROUTES.AUTH_ME}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return resp
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default AuthServices
