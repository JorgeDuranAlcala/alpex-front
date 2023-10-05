import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { EFieldColumn } from '../components/PaymentsTable/columns/efieldColumn'
import { QueryFilters } from '../interfaces/QueryFilters'

export const extractOverviewPaymentTableFilters = (filters: Filter[]): QueryFilters => {
  const findIn = {
    items: filters,
    key: 'type',
    value: 'value'
  }

  const handleFind = (match: string, defaultValue: any, key?: string) => {
    return findOrDefault({
      ...findIn,
      ...(key ? { key } : {}),
      match,
      defaultValue
    })
  }

  const transaction = handleFind(EFieldColumn.TRANSACTION, null)
  const date = handleFind(EFieldColumn.TRANSACTION_DATE, null)
  const id = handleFind('id', null)
  const amount = handleFind('amount', null)
  const capabilityName = handleFind('capabilityName', null)

  const queryFilters: QueryFilters = {
    broker: handleFind('broker', 'all'),
    reinsurer: handleFind('reinsurer', 'all'),
    status: handleFind(EFieldColumn.STATUS, 'all'),
    transactionType: handleFind(EFieldColumn.TRANSACTION_TYPE, 'all'),
    ...(transaction && { transaction }),
    ...(date && { date }),
    ...(id && { id }),
    ...(amount && { amount }),
    ...(capabilityName && { capabilityName })
  }

  return queryFilters
}
