import { ARAPStatus } from '@/views/arap/overview/interfaces/QueryFilters'
import { PaymentsGrid } from '@/views/arap/overview/interfaces/payments/PaymentsGrid'
import { GetArapAllResponseDto } from '../getArapAllResponse.dto'
import { getCapabilityName } from './utils/getCapabilityName'
import { getCurrency } from './utils/getCurrency'
import { getStatus } from './utils/getStatus'
import { getTransactionType } from './utils/getTransactionType'

export const overviewPaymentsAdapter = (data: GetArapAllResponseDto): PaymentsGrid => {
  let tempCurrency = 'unknown'

  const info: PaymentsGrid['info'] = {
    ...data.info,
    currency: tempCurrency
  }

  return {
    paymentsGridList: data.results.map(result => {
      tempCurrency = getCurrency({ transactionId: result.ref, result })

      return {
        id: result.id,
        transactionId: result.ref,
        capabilityName: getCapabilityName({ transactionId: result.ref, result }),
        status: getStatus({ transactionId: result.ref, result }) as ARAPStatus,
        transaction: getTransactionType({ transactionId: result.ref, result }),
        amount: Number(result.amount),
        currency: tempCurrency,
        transactionDate: new Date(result.createdAt).toISOString()

        // transactionDate: result.createdAt.toISOString().split('T')[0]
      }
    }),
    isLoading: false,
    filters: [],
    info: {
      ...info,
      currency: tempCurrency
    }
  }
}
