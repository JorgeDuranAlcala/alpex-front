import { QueryFilters } from '@/views/arap/overview/interfaces/QueryFilters'
import { GetArapAllParamsToSend } from '../getArapAllParamsToSend'

export const overviewPaymentsAdapterQueries = (queryParams: QueryFilters): GetArapAllParamsToSend => {
  const paramsToSend: GetArapAllParamsToSend = {
    date: queryParams.date.split('T')[0]
  }

  if (queryParams.id) {
    paramsToSend.id = Number(queryParams.id)
  }

  if (queryParams.broker !== 'all') {
    paramsToSend.broker = Number(queryParams.broker)
  }

  if (queryParams.reinsurer !== 'all') {
    paramsToSend.reinsurer = Number(queryParams.reinsurer)
  }

  if (queryParams.status !== 'all') {
    paramsToSend.status = Number(queryParams.status)
  }

  if (queryParams.transaction !== 'all') {
    paramsToSend.transaction = Number(queryParams.transaction)
  }

  if (queryParams.page) {
    paramsToSend.page = queryParams.page
  }

  return paramsToSend
}
