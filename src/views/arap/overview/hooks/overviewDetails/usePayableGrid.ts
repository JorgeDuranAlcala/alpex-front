
import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { useRouter } from 'next/router'
import { ExtendedPayableQueryFilters, PayableGrid } from '../../interfaces/overview/PayableGrid'
import { OverviewDetailsParamsToSendDto } from '../../services/_common/interfaces/OverviewDetailsParamsToSend.dto'
import { overviewPayablesAdapter } from '../../services/getOverviewPayableAll/frontAdapters/overviewPayablesAdapter'
import { getOverviewPayableAllService } from '../../services/getOverviewPayableAll/getOverviewPayableAllService'
import { extractPayableDetailsTableFilters } from '../../utils/extractPayableDetailsTableFilters'

interface TableFiltersReturn {
  tableFilters: Filter[];
  queryFilters: ExtendedPayableQueryFilters;
}

export const usePayableGrid = () => {

  const router = useRouter()
  
  const getPayableGrid = async (
    paramsToSend: OverviewDetailsParamsToSendDto) : Promise<PayableGrid> => {
    
    const payables = await getOverviewPayableAllService(paramsToSend);
    const payablesAdapted = overviewPayablesAdapter(payables, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    return payablesAdapted;

  }

  const getPayableTableFilters = (filter: Filter, grid: PayableGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== filter.type) || [];

    tableFilters = [...tableFilters, filter ];
    
    return {
      tableFilters,
      queryFilters: extractPayableDetailsTableFilters(tableFilters)
    }
  }

  const deletePayableTableFilters = (type: string, grid: PayableGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== type) || [];

    return {
      tableFilters,
      queryFilters: extractPayableDetailsTableFilters(tableFilters)
    }
  }

  return {
    getPayableGrid,
    getPayableTableFilters,
    deletePayableTableFilters
  }
}