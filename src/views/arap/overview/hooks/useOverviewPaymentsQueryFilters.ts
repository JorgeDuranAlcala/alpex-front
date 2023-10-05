import { Filter } from "../../_commons/interfaces/Grid"
import { QueryFilters } from "../interfaces/QueryFilters"
import { useMasterFiltersStorage } from "./useMasterFiltersStorage"

const keyFilters: { [key: string]: string } = {
  broker: 'broker',
  reinsurer: 'reinsurer',
  status: 'status',
  transactionType: 'transactionType',
}

const textFilters: { [key: string]: string } = {
  id: 'ID: ',
  transaction: 'Transaction ID: ',
  amount: 'Amount: ',
  date: 'Transaction Date: ',
  broker: 'Capability Name: ',
  reinsurer: 'Capability Name: ',
  status: 'Status: ',
  transactionType: 'Transaction Type: ',
} 

export const useOverviewPaymentsQueryFilters = () => {

  const { getMasterFiltersSelectors } = useMasterFiltersStorage();
  
  const transformToTableFilters = (queryFilters: QueryFilters): Filter[] => {
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
  
        if (key === 'date') {
          const savedDate = savedFilters.filter(item => item.type === key)[0]?.value
          
          return {
            type: key,
            value: savedDate || queryFilters[key],
            text: textFilters[key] + (savedDate || queryFilters[key])
          }
        }

        return {
          type: key,
          value: (queryFilters as {[key: string]: any })[key],
          text: textFilters[key] + (queryFilters as {[key: string]: any })[key]
        }
      }
  
    }).filter(item => item.value !== 'all' && item.value !== '')
  }

  return {
    transformToTableFilters
  }
  
}