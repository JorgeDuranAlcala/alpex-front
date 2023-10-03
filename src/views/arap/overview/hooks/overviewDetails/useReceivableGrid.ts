
import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { useRouter } from 'next/router'
import { ExtendedReceivableQueryFilters, ReceivableGrid } from '../../interfaces/overview/ReceivableGrid'
import { OverviewDetailsParamsToSendDto } from '../../services/_common/interfaces/OverviewDetailsParamsToSend.dto'
import { overviewReceivablesAdapter } from '../../services/getOverviewReceivableAll/frontAdapters/overviewReceivablesAdapter'
import { getOverviewReceivableAllService } from '../../services/getOverviewReceivableAll/getOverviewReceivableAllService'
import { extractReceivableDetailsTableFilters } from '../../utils/extractReceivableDetailsTableFilters'

interface TableFiltersReturn {
  tableFilters: Filter[];
  queryFilters: ExtendedReceivableQueryFilters;
}


export const useReceivableGrid = () => {

  const router = useRouter();
  
  const getReceivableGrid = async (
    paramsToSend: OverviewDetailsParamsToSendDto) : Promise<ReceivableGrid> => {
    
    const receivables = await getOverviewReceivableAllService(paramsToSend);
    const receivablesAdapted = overviewReceivablesAdapter(receivables, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    return receivablesAdapted;

  }

  const getReceivableTableFilters = (filter: Filter, grid: ReceivableGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== filter.type) || [];

    tableFilters = [...tableFilters, filter ];
    
    return {
      tableFilters,
      queryFilters: extractReceivableDetailsTableFilters(tableFilters)
      
    }

  }

  const deleteReceivableTableFilters = (type: string, grid: ReceivableGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== type) || [];

    return {
      tableFilters,
      queryFilters: extractReceivableDetailsTableFilters(tableFilters)
    }
  }

  return {
    getReceivableGrid,
    getReceivableTableFilters,
    deleteReceivableTableFilters
  }
}