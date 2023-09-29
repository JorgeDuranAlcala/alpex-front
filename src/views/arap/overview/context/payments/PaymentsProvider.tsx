import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { getArapAllService } from '@/views/arap/overview/services/getArapAll'
import { overviewPaymentsAdapter } from '@/views/arap/overview/services/getArapAll/frontAdapters/overviewPaymentsAdapter'
import { overviewPaymentsAdapterQueries } from '@/views/arap/overview/services/getArapAll/frontAdapters/overviewPaymentsAdapterQueries'
import { ReactNode, useRef, useState } from 'react'
import { useMasterFiltersStorage } from '../../hooks/useMasterFiltersStorage'
import { useOverviewPaymentsQueryFilters } from '../../hooks/useOverviewPaymentsQueryFilters'
import { QueryFilters } from '../../interfaces/QueryFilters'
import { PaymentsGrid } from '../../interfaces/payments/PaymentsGrid'
import { extractOverviewPaymentTableFilters } from '../../utils/extractOverviewPaymentTableFilters'
import { PaymentsContext } from './PaymentsContext'

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  
  const {saveMasterFiltersSelectors, removeMasterFiltersSelector} = useMasterFiltersStorage();
  const { transformToTableFilters } = useOverviewPaymentsQueryFilters();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentsGrid, setPaymentsGrid] = useState<PaymentsGrid | null>(null)
  const tempQueryFiltersRef = useRef<QueryFilters | null>(null)
  const tempFiltersRef = useRef<Filter[]>([])


  const loadPaymentsGrid = async (queryFilters: QueryFilters) => {
    setIsLoading(true)

    tempQueryFiltersRef.current = queryFilters

    const filters = overviewPaymentsAdapterQueries(queryFilters)
    const payments = await getArapAllService(filters)
    const paymentsAdapted = overviewPaymentsAdapter(payments)
    const parsedFilters = transformToTableFilters(queryFilters);
    
    setPaymentsGrid({
      paymentsGridList: paymentsAdapted.paymentsGridList,
      info: paymentsAdapted.info,
      isLoading: paymentsAdapted.isLoading,
      filters: [...paymentsAdapted.filters, ...parsedFilters,]
    })

    setIsLoading(false)
  }

  const onChangePage = (page: number) => {
    console.log('onChangePage', page)

    if (!tempQueryFiltersRef.current) return
    if (!paymentsGrid) return

    loadPaymentsGrid({
      ...tempQueryFiltersRef.current,
      page
    })
  }

  const handleChangeFilters = (filters: Filter) => {

    saveMasterFiltersSelectors({
      label: filters.text,
      value: filters.value,
      type: filters.type
    });

    if (!tempQueryFiltersRef.current) return

    let tempFilters: Filter[] = paymentsGrid?.filters || [];
    
    tempFilters = paymentsGrid?.filters.filter(filterItem => filterItem.type !== filters.type) || []
    tempFilters = [...tempFilters, filters];
    

    tempFiltersRef.current = [...tempFilters]

    loadPaymentsGrid({
      ...tempQueryFiltersRef.current,
      ...extractOverviewPaymentTableFilters(tempFilters)
    })
  }

  const handleDeleteFilters = (type: string) => {

    console.log(type)
    removeMasterFiltersSelector(type);
    
    const tempFilters: Filter[] = paymentsGrid?.filters.filter(filterItem => filterItem.type !== type) || []

    tempFiltersRef.current = [...tempFilters]

    const tempQueryFilters = tempQueryFiltersRef.current;
    const updateQueryFilters = tempQueryFilters ? { ...tempQueryFilters, [type]: '' } : undefined;

    console.log(tempFilters)
    console.log(tempQueryFilters)
    console.log(updateQueryFilters)

    loadPaymentsGrid({
      ...updateQueryFilters,
      ...extractOverviewPaymentTableFilters(tempFilters)
    })
  }

  return (
    <PaymentsContext.Provider
      value={{
        isLoading,
        paymentsGrid,
        loadPaymentsGrid,
        onChangePage,
        handleChangeFilters,
        handleDeleteFilters
      }}
    >
      {children}
    </PaymentsContext.Provider>
  )
}
