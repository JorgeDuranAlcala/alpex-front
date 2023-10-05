import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { payableEFieldColumn } from '../components/PayableTable/payableEFieldColumn'
import { PayableFilters } from '../interfaces/PayableFilters'

export const extractPayableTableFilters = (filters: Filter[]): PayableFilters => {
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
      
      // ...(match === 'reinsurer' ? { value: 'text' } : {}),
      ...(key ? { key } : {}),
      match,
      defaultValue
    })
  }

  // date: string;
  // capability: string;
  // accountId?: number;
  // capabilityId?: number;
  // capabilityName?: string;
  // currency?: string,
  // totalDebt?: number,
  // opc120?: number;
  // "0a30"?: number;
  // "31a60"?: number;
  // "61a90"?: number;
  // "91a120"?: number;
  // paidPercent?: number;

  const capabilityId = handleFind(payableEFieldColumn.CAPABILITY_ID, null);
  const op0_30 = handleFind(payableEFieldColumn.PERIOD_0_30, null);
  const op31_60 = handleFind(payableEFieldColumn.PERIOD_31_60, null);
  const op61_90 = handleFind(payableEFieldColumn.PERIOD_61_90, null);
  const op91_120 = handleFind(payableEFieldColumn.PERIOD_91_120, null);
  const opc120 = handleFind(payableEFieldColumn.PERIOD_120, null);
  const totalDebt = handleFind(payableEFieldColumn.TOTAL_DEBT, null);
  const paidPercent = handleFind(payableEFieldColumn.PAID_PERCENT, null);

  return {
    ...(capabilityId && { capabilityId }),
    ...(op0_30 && { ['0a30']:op0_30 }),
    ...(op31_60 && { ['31a60']:op31_60 }),
    ...(op61_90 && { ['61a90']:op61_90 }),
    ...(op91_120 && { ['91a120']:op91_120 }),
    ...(opc120 && { ['opc120']:opc120 }),
    ...(totalDebt && { totalDebt }),
    ...(paidPercent && { paidPercent }),
  }

}
