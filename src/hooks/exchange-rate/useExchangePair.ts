import ExchangeRateService, { ExchangeRateDto, Pair } from '@/services/exchange-rate/ExchangeRate.service'
import { useEffect, useState } from 'react'

export const useExchangePair = () => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateDto>({} as ExchangeRateDto)

  const [pair, setPair] = useState<Pair>({
    baseCurrency: 'USD',
    targetCurrency: ''
  })

  const getPair = async () => {
    try {
      const information = await ExchangeRateService.getExchangeRatePair(pair)

      setExchangeRate(information)
    } catch (error) {
      console.log('[addInformation] Error', error)

      throw new Error('error')
    }
  }
  useEffect(() => {
    if (pair.targetCurrency) getPair()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair])

  return {
    exchangeRate,
    pair,
    setPair
  }
}
