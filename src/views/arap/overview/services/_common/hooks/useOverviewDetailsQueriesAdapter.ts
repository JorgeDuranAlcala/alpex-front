import { QueryFilters } from '@/views/arap/overview/interfaces/QueryFilters';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';
import { OverviewDetailsParamsToSendDto } from '../interfaces/OverviewDetailsParamsToSend.dto';


export const useOverviewDetailsQueriesAdapter = () => {

  const { getMasterFiltersSelectors } = useMasterFiltersStorage();
  const masterFilters = getMasterFiltersSelectors();
  
  const getLabelFromStorage = (id: number, type:string): string | null => {
    return masterFilters.find(item => item.type === type && item.value === id)?.label ?? null
  }

  const getParamsToSend = (queryParams: QueryFilters): OverviewDetailsParamsToSendDto => {
    
    const paramsToSend: OverviewDetailsParamsToSendDto = {
      date: queryParams.date.split('T')[0]
    }
  
    if (queryParams.id) {
      paramsToSend.id = Number(queryParams.id)
    }
  
    if (queryParams.broker !== 'all') {
      const label = getLabelFromStorage(+queryParams.broker, 'broker');
      if (label) {
        paramsToSend.broker = label
      }
    }
  
    if (queryParams.reinsurer !== 'all') {
      const label = getLabelFromStorage(+queryParams.reinsurer, 'reinsurer');
      if (label) {
        paramsToSend.reinsurer = label
      }
    }
  
    if (queryParams.status !== 'all') {
      paramsToSend.status = Number(queryParams.status)
    }
  
    if (queryParams.transaction !== 'all') {
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

  return {
    getParamsToSend
  }
}
