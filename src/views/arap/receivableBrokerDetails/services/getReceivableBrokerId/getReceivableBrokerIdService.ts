import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetReceivableBrokerIdParamsToSend } from './getReceivableBrokerIdParamsToSend'
import { GetReceivableBrokerIdResponseDto } from './getReceivableBrokerIdResponse.dto'

export const getReceivableBrokerIdService = async (params: GetReceivableBrokerIdParamsToSend) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetReceivableBrokerIdResponseDto>(ARAP_API_ROUTES.RECEIVABLES_GET_BROKER_ID + '/' + params.capabilityId)

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
