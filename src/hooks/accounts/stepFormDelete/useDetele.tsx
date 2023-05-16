import { StepFormDeleteDto } from 'src/services/accounts/dtos/stepFormDelete.dto'
import StepFormDeleteService from 'src/services/accounts/stepFormDelete.service'

export const useStepFormDelete = () => {
  const stepFormDelete = async (data: StepFormDeleteDto) => {
    const res = await StepFormDeleteService.stepFormDelete(data)

    return res
  }

  return {
    stepFormDelete
  }
}
