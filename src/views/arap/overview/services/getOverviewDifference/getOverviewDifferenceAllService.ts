import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { OverviewDetailsParamsToSendDto } from '../_common/interfaces/OverviewDetailsParamsToSend.dto'
import { GetOverviewDifferenceAllResponseDto } from './getOverviewDifferenceAllResponse.dto'

export const getOverviewDifferenceAllService = async (params: OverviewDetailsParamsToSendDto) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetOverviewDifferenceAllResponseDto>(ARAP_API_ROUTES.OVERVIEW_DIFFERENCES_GET_ALL, {
      params
    })

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
