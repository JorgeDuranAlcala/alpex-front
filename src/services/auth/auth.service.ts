import { AUTH_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
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

  async authMe() {
    try {
      const resp = await AppAlpexApiGateWay.get(`${AUTH_ROUTES.AUTH_ME}`)

      return resp
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async refreshJWT() {
    try {
      const resp = await AppAlpexApiGateWay.get(`${AUTH_ROUTES.REFRESH_JWT}`)

      return resp
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default AuthServices
