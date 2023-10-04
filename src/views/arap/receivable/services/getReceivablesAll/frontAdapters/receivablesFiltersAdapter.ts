import { ReceivableFilters } from '../../../interfaces/ReceivableFilters'
import { GetReceivablesAllParamsToSend } from '../getReceivablesAllParamsToSend'

export const receivablesFiltersAdapter = (queryParams: ReceivableFilters): GetReceivablesAllParamsToSend => {
  const paramsToSend: GetReceivablesAllParamsToSend = {
    ...queryParams,  
    date: queryParams.date.split('T')[0],
  }

  if (queryParams.capability !== 'all') {
    paramsToSend.capabilityId = Number(queryParams.capability)
  }



  return paramsToSend
}
