import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { EFieldColumn } from '../components/OverviewDetailsTable/columns/efieldColumn'
import { ExtendedReceivableQueryFilters } from '../interfaces/overview/ReceivableGrid'

export const extractReceivableDetailsTableFilters = (filters: Filter[]): ExtendedReceivableQueryFilters => {
  const findIn = {
    items: filters.map(filter => {
      return {
        ...filter,
        text: filter.text.split(':')[1].trim(), // replace the auxtFilterText
      }
    }),
    key: 'type',
    value: 'value'
  }

  const handleFind = (match: string, defaultValue: any, key?: string) => {
    return findOrDefault({
      ...findIn,
      ...(match === EFieldColumn.BROKER ? { value: 'text' } : {}),
      ...(key ? { key } : {}),
      match,
      defaultValue
    })
  }

  const amountReceived = handleFind(EFieldColumn.AMOUNT_RECEIVED, null);
  const broker = handleFind(EFieldColumn.BROKER, null);
  const pmtDate = handleFind(EFieldColumn.PMT_DATE, null);
  const account = handleFind(EFieldColumn.ACCOUNT, null);
  const inst = handleFind(EFieldColumn.INST, null);
  const depositAcc = handleFind(EFieldColumn.DEPOSIT_ACC, null);
  const transactionId = handleFind(EFieldColumn.TRANSACTION_ID, null)
  const user = handleFind(EFieldColumn.USER, null)

  return {
    ...(amountReceived && { amountReceived }),
    ...(broker && { broker }),
    ...(pmtDate && { pmtDate }),
    ...(account && { account }),
    ...(inst && { inst }),
    ...(depositAcc && { depositAcc }),
    ...(transactionId && { transactionId }),
    ...(user && { user }),
  }

}
