import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { EFieldColumn } from '../components/OverviewDetailsTable/columns/efieldColumn'
import { ExtendedPayableQueryFilters } from '../interfaces/overview/PayableGrid'

export const extractPayableDetailsTableFilters = (filters: Filter[]): ExtendedPayableQueryFilters => {
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
      ...(match === 'reinsurer' ? { value: 'text' } : {}),
      ...(key ? { key } : {}),
      match,
      defaultValue
    })
  }

  // amountPaid?: number;
  // capabilityName?: string; //reinsurer
  // pmtDate?: string;
  // account?: string;
  // originAcct?: number;
  // transactionId?: string; //refId: INST0001
  // user?: string;

  const amountPaid = handleFind(EFieldColumn.AMOUNT_PAID, null);
  const capabilityName = handleFind('reinsurer', null);
  const pmtDate = handleFind(EFieldColumn.PMT_DATE, null);
  const account = handleFind(EFieldColumn.ACCOUNT, null);
  const originAcct = handleFind(EFieldColumn.ORIGIN_ACCT, null);
  const transactionId = handleFind(EFieldColumn.TRANSACTION_ID, null)
  const user = handleFind(EFieldColumn.USER, null)

  return {
    ...(amountPaid && { amountPaid }),
    ...(capabilityName && { capabilityName }),
    ...(pmtDate && { pmtDate }),
    ...(account && { account }),
    ...(originAcct && { originAcct }),
    ...(transactionId && { transactionId }),
    ...(user && { user }),
  }

}
