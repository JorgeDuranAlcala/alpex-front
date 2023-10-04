import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetPayablesAllParamsToSend } from './getPayablesAllParamsToSend'
import { GetPayablesAllResponseDto } from './getPayablesAllResponse.dto'

export const getPayablesAllService = async (params: GetPayablesAllParamsToSend) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetPayablesAllResponseDto>(ARAP_API_ROUTES.PAYABLES_GET_ALL, {
      params
    })

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
