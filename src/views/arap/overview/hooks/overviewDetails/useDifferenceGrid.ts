
import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { useRouter } from 'next/router'
import { DifferenceGrid, ExtendedDifferenceQueryFilters } from '../../interfaces/overview/DifferenceGrid'
import { OverviewDetailsParamsToSendDto } from '../../services/_common/interfaces/OverviewDetailsParamsToSend.dto'
import { overviewDifferencesAdapter } from '../../services/getOverviewDifference/frontAdapters/overviewDifferencesAdapter'
import { getOverviewDifferenceAllService } from '../../services/getOverviewDifference/getOverviewDifferenceAllService'
import { extractDifferenceDetailsTableFilters } from '../../utils/extractDifferenceDetailsTableFilters'

interface TableFiltersReturn {
  tableFilters: Filter[];
  queryFilters: ExtendedDifferenceQueryFilters;
}

export const useDifferenceGrid = () => {

  const router = useRouter()
  
  const getDifferenceGrid = async (
    paramsToSend: OverviewDetailsParamsToSendDto) : Promise<DifferenceGrid> => {
    
    const differences = await getOverviewDifferenceAllService(paramsToSend);
    const differencesAdapted = overviewDifferencesAdapter(differences, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    return differencesAdapted;

  }

  const getDifferenceTableFilters = (filter: Filter, grid: DifferenceGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== filter.type) || [];

    tableFilters = [...tableFilters, filter ];
    
    return {
      tableFilters,
      queryFilters: extractDifferenceDetailsTableFilters(tableFilters)
    }
  }

  const deleteDifferenceTableFilters = (type: string, grid: DifferenceGrid | null): TableFiltersReturn => {
    let tableFilters: Filter[] = grid!.filters || [];

    tableFilters = grid?.filters.filter(filterItem => filterItem.type !== type) || [];

    return {
      tableFilters,
      queryFilters: extractDifferenceDetailsTableFilters(tableFilters)
    }
  }

  return {
    getDifferenceGrid,
    getDifferenceTableFilters,
    deleteDifferenceTableFilters
  }
}