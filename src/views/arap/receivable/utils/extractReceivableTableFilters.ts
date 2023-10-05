import { Filter } from '../../_commons/interfaces/Grid'
import { findOrDefault } from '../../_commons/utils/findOrDefault'
import { receivableEFieldColumn } from '../components/ReceivableTable/receivableEFieldColumn'
import { ReceivableFilters } from '../interfaces/ReceivableFilters'

export const extractReceivableTableFilters = (filters: Filter[]): ReceivableFilters => {
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

  const capabilityId = handleFind(receivableEFieldColumn.CAPABILITY_ID, null);
  const op0_30 = handleFind(receivableEFieldColumn.PERIOD_0_30, null);
  const op31_60 = handleFind(receivableEFieldColumn.PERIOD_31_60, null);
  const op61_90 = handleFind(receivableEFieldColumn.PERIOD_61_90, null);
  const op91_120 = handleFind(receivableEFieldColumn.PERIOD_91_120, null);
  const opc120 = handleFind(receivableEFieldColumn.PERIOD_120, null);
  const totalDebt = handleFind(receivableEFieldColumn.TOTAL_DEBT, null);
  const paidPercent = handleFind(receivableEFieldColumn.PAID_PERCENT, null);

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
