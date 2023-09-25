import { ARAPTransaction } from '@/views/arap/overview/interfaces/QueryFilters'
import { transactionIdRefs } from '../constants/transactionIdRefs'
import { GetDependingOnTransactionId } from '../interfaces/GetDependingOnTransactionId'

export const getTransactionType = ({ transactionId }: GetDependingOnTransactionId): ARAPTransaction => {
  if (transactionId.includes(transactionIdRefs.INST)) {
    return 'broker pay'
  }

  if (transactionId.includes(transactionIdRefs.REC)) {
    return 'reinsurer pay'
  }

  if (transactionId.includes(transactionIdRefs.DYN)) {
    // pendiente por definir...
  }

  return 'unknown' as ARAPTransaction
}
