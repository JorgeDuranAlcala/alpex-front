import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetPayableReinsuredIdParamsToSend } from './getPayableReinsuredIdParamsToSend'
import { GetPayableReinsuredIdResponseDto } from './getPayableReinsurerIdResponse.dto'

export const getPayableReinsuredIdService = async (params: GetPayableReinsuredIdParamsToSend) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetPayableReinsuredIdResponseDto>(ARAP_API_ROUTES.PAYABLES_GET_REINSURER_ID + '/' + params.capabilityId)

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
