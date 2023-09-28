import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { ARAP_CATALOG_API_ROUTES } from '@/views/arap/_commons/services/_config'
import { GetPaymentStatusResponseDto } from './getPaymentStatusResponse.dto'

export const getPaymentStatusService = async () => {
  try {
    const { data } = await AppAlpexApiGateWay.get<GetPaymentStatusResponseDto[]>(ARAP_CATALOG_API_ROUTES.PAYMENT_STATUS)

    return data
  } catch (error) {
    const message = String(error)
    throw new Error(message)
  }
}
