import { Filter } from "../../_commons/interfaces/Grid"
import { useMasterFiltersStorage } from "../hooks/useMasterFiltersStorage"
import { QueryFilters } from "../interfaces/QueryFilters"

const keyFilters: { [key: string]: string } = {
  broker: 'broker',
  reinsurer: 'reinsurer',
  status: 'status',
  transactionType: 'transactionType',
}

const textFilters: { [key: string]: string } = {
  id: 'Transaction ID: ',
  amount: 'Amount: ',
  date: 'Transaction Date: ',
  broker: 'Capability Name: ',
  reinsurer: 'Capability Name: ',
  status: 'Status: ',
  transactionType: 'Transaction Type: ',
} 

export const transformOverviewPaymentsQueryFiltersToTableFilters = (queryFilters: QueryFilters): Filter[] => {

  const { getMasterFiltersSelectors } = useMasterFiltersStorage();

  const savedFilters = getMasterFiltersSelectors();

  return Object.keys(queryFilters).map(key => {

    if (keyFilters[key]) {
      return {
        type: key,
        value:savedFilters.filter(item => item.type === key)[0]?.value || 'all',
        text: textFilters[key] + savedFilters.filter(item => item.type === key)[0]?.label || 'all',
        subtype: key
      }
    } else {

      return {
        type: key,
        value: (queryFilters as {[key: string]: any })[key],
        text: textFilters[key] + (queryFilters as {[key: string]: any })[key]
      }
    }

  }).filter(item => item.value !== 'all' && item.value !== '')

  
}