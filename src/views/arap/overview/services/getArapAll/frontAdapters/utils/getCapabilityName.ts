import { transactionIdRefs } from '../constants/transactionIdRefs'
import { GetDependingOnTransactionId } from '../interfaces/GetDependingOnTransactionId'

export const getCapabilityName = ({ transactionId, result }: GetDependingOnTransactionId): string => {
  if (transactionId.includes(transactionIdRefs.INST)) {
    if (result.installments && result.installments.length > 0) {
      return result.installments[0].idAccount.informations[0].idBroker.name
    }
  }

  if (transactionId.includes(transactionIdRefs.REC)) {
    if (result.securities && result.securities.length > 0) {
      return result.securities[0].idCReinsuranceCompany.name
    }
  }

  if (transactionId.includes(transactionIdRefs.DYN)) {
    // pendiente por definir...
  }

  return 'unknown'
}
