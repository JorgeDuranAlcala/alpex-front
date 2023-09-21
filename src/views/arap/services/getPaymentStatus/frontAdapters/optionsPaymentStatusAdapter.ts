import { GetPaymentStatusResponseDto } from '../getPaymentStatusResponse.dto'

export const optionsPaymentStatusAdapter = (data: GetPaymentStatusResponseDto[]) => {
  return data.map(item => ({
    value: item.id,
    text: item.status
  }))
}
