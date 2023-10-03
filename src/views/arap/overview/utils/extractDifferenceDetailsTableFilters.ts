import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { EFieldColumn } from '../components/OverviewDetailsTable/columns/efieldColumn'
import { ExtendedDifferenceQueryFilters } from '../interfaces/overview/DifferenceGrid'

export const extractDifferenceDetailsTableFilters = (filters: Filter[]): ExtendedDifferenceQueryFilters => {
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

  // amountReceived?: number;
  // broker?: string;
  // pmtDate?: string;
  // account?: string;
  // originAcct?: number;
  // depositAcc?: number;
  // transactionId?: string; //refId: INST0001
  // user?: string;

  const amountReceived = handleFind(EFieldColumn.AMOUNT_RECEIVED, null);
  const broker = handleFind(EFieldColumn.BROKER, null);
  const pmtDate = handleFind(EFieldColumn.PMT_DATE, null);
  const account = handleFind(EFieldColumn.ACCOUNT, null);
  const originAcct = handleFind(EFieldColumn.ORIGIN_ACCT, null);
  const depositAcc = handleFind(EFieldColumn.DEPOSIT_ACC, null);
  const transactionId = handleFind(EFieldColumn.TRANSACTION_ID, null)
  const user = handleFind(EFieldColumn.USER, null)

  return {
    ...(amountReceived && { amountReceived }),
    ...(broker && { broker }),
    ...(pmtDate && { pmtDate }),
    ...(account && { account }),
    ...(originAcct && { originAcct }),
    ...(depositAcc && { depositAcc }),
    ...(transactionId && { transactionId }),
    ...(user && { user }),
  }

}
