import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { OverviewDetailsParamsToSendDto } from '../_common/interfaces/OverviewDetailsParamsToSend.dto'
import { GetOverviewReceivableAllResponseDto } from './getOverviewReceivableAllResponse.dto'

export const getOverviewReceivableAllService = async (params: OverviewDetailsParamsToSendDto) => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetOverviewReceivableAllResponseDto>(
      ARAP_API_ROUTES.OVERVIEW_RECEIVABLES_GET_ALL, 
      {
        params
      }
    )

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
