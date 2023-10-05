import { PayableFilters } from '../../../interfaces/PayableFilters'
import { GetPayablesAllParamsToSend } from '../getPayablesAllParamsToSend'

export const payablesFiltersAdapter = (queryParams: PayableFilters): GetPayablesAllParamsToSend => {
  const paramsToSend: GetPayablesAllParamsToSend = {  
    date: queryParams.date.split('T')[0],
  }

  if (queryParams.capability !== 'all') {
    paramsToSend.capabilityId = Number(queryParams.capability)
  }

  if (queryParams.capabilityId) {
    paramsToSend.capabilityId = queryParams.capabilityId
  }

  if (queryParams['0a30']) {
    paramsToSend.op0_30 = Number(queryParams['0a30'])
  }

  if (queryParams['31a60']) {
    paramsToSend.op31_60 = Number(queryParams['31a60'])
  }

  if (queryParams['61a90']) {
    paramsToSend.op61_90 = Number(queryParams['61a90'])
  }

  if (queryParams['91a120']) {
    paramsToSend.op91_120 = Number(queryParams['91a120'])
  }

  if (queryParams['opc120']) {
    paramsToSend.op120 = Number(queryParams['opc120'])
  }

  if (queryParams.totalDebt) {
    paramsToSend.totalDebt = Number(queryParams.totalDebt)
  }

  if (queryParams.paidPercent) {
    paramsToSend.paidPercent = Number(queryParams.paidPercent)
  }

  return paramsToSend
}
