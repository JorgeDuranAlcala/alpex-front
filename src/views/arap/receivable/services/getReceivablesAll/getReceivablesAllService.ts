import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetReceivablesAllParamsToSend } from './getReceivablesAllParamsToSend'
import { GetReceivablesAllResponseDto } from './getReceivablesAllResponse.dto'

export const getReceivablesAllService = async (params: GetReceivablesAllParamsToSend) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetReceivablesAllResponseDto>(ARAP_API_ROUTES.RECEIVABLES_GET_ALL, {
      params
    })

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
