import { EXCHANGE_RATE } from '@/configs/api'
import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'

export type ExchangeRateDto = {
  result: string
  timeLastUpdateUnix?: number
  timeLastUpdateUtc?: string
  timeNextUpdateUnix?: number
  timeNextUpdateUtc?: string
  baseCode?: string
  targetCode?: string
  conversionRate?: number
  errorType?: string
}
export type Pair = {
  baseCurrency: string
  targetCurrency: string
}
class ExchangeRateService {
  async getExchangeRatePair(pair: Pair, jwtToken: string): Promise<ExchangeRateDto> {
    const { baseCurrency, targetCurrency } = pair
    try {
      const { data } = await AppAlpexApiGateWay.get<ExchangeRateDto>(
        `${EXCHANGE_RATE.PAIR}/${baseCurrency}/${targetCurrency}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}
export default new ExchangeRateService()
