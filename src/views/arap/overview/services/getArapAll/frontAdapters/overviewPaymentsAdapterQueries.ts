import { QueryFilters } from '@/views/arap/overview/interfaces/QueryFilters'
import { GetArapAllParamsToSend } from '../getArapAllParamsToSend'

export const overviewPaymentsAdapterQueries = (queryParams: QueryFilters): GetArapAllParamsToSend => {

  console.log(queryParams)
  const paramsToSend: GetArapAllParamsToSend = {
    date: queryParams.date.split('T')[0],
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

  if (queryParams.transaction) {
    paramsToSend.transaction = queryParams.transaction
  }

  if (queryParams.transactionType !== 'all') {
    paramsToSend.transactionType = queryParams.transactionType
  }

  if (queryParams.page) {
    paramsToSend.page = queryParams.page
  }

  if (queryParams.amount) {
    paramsToSend.amount = Number(queryParams.amount)
  }

  if (queryParams.capabilityName) {
    paramsToSend.capabilityName = queryParams.capabilityName
  }

  return paramsToSend
}
