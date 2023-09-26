import { PayableFilters } from '../../../interfaces/PayableFilters'
import { GetPayablesAllParamsToSend } from '../getPayablesAllParamsToSend'

export const payablesFiltersAdapter = (queryParams: PayableFilters): GetPayablesAllParamsToSend => {
  const paramsToSend: GetPayablesAllParamsToSend = {
    ...queryParams,  
    date: queryParams.date.split('T')[0],
  }

  if (queryParams.capability !== 'all') {
    paramsToSend.capabilityId = Number(queryParams.capability)
  }



  return paramsToSend
}
