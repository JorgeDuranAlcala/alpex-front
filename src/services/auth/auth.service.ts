import { AUTH_ROUTES } from 'src/configs/api'
import { AppDynamicReApiGateWay } from '../app.alpex.api-getway'
import { AuthDto } from './dtos/AuthDto'

class AuthServices {
  async login(authData: AuthDto) {
    try {
      const resp = await AppDynamicReApiGateWay.post(`${AUTH_ROUTES.LOGIN}`, {
        ...authData
      })

      return resp
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default AuthServices
