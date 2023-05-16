import { ACCOUNT_STEP_FORM_DELETE_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { StepFormDeleteDto, StepFormDeleteResponse } from './dtos/stepFormDelete.dto'

class StepFormDeleteService {
  async stepFormDelete(formsDeleteIn: Partial<StepFormDeleteDto>): Promise<StepFormDeleteResponse> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<StepFormDeleteResponse>>(
        ACCOUNT_STEP_FORM_DELETE_ROUTES.DEL,
        {
          ...formsDeleteIn
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new StepFormDeleteService()
