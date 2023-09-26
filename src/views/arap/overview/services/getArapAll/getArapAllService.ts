import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetArapAllParamsToSend } from './getArapAllParamsToSend'
import { GetArapAllResponseDto } from './getArapAllResponse.dto'

export const getArapAllService = async (params: GetArapAllParamsToSend) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetArapAllResponseDto>(ARAP_API_ROUTES.ARAP_GET_ALL, {
      params
    })

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
