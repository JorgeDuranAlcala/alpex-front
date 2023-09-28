import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { getArapAllService } from '@/views/arap/overview/services/getArapAll'
import { overviewPaymentsAdapter } from '@/views/arap/overview/services/getArapAll/frontAdapters/overviewPaymentsAdapter'
import { overviewPaymentsAdapterQueries } from '@/views/arap/overview/services/getArapAll/frontAdapters/overviewPaymentsAdapterQueries'
import { ReactNode, useRef, useState } from 'react'
import { QueryFilters } from '../../interfaces/QueryFilters'
import { PaymentsGrid } from '../../interfaces/payments/PaymentsGrid'
import { extractOverviewPaymentTableFilters } from '../../utils/extractOverviewPaymentTableFilters'
import { PaymentsContext } from './PaymentsContext'

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentsGrid, setPaymentsGrid] = useState<PaymentsGrid | null>(null)
  const tempQueryFiltersRef = useRef<QueryFilters | null>(null)
  const tempFiltersRef = useRef<Filter[]>([])

  const loadPaymentsGrid = async (queryFilters: QueryFilters) => {
    setIsLoading(true)
    console.log('loadPayments by queryFilters', queryFilters)
    tempQueryFiltersRef.current = queryFilters

    const filters = overviewPaymentsAdapterQueries(queryFilters)
    const payments = await getArapAllService(filters)
    const paymentsAdapted = overviewPaymentsAdapter(payments)

    setPaymentsGrid({
      paymentsGridList: paymentsAdapted.paymentsGridList,
      info: paymentsAdapted.info,
      isLoading: paymentsAdapted.isLoading,
      filters: [...paymentsAdapted.filters, ...tempFiltersRef.current]
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
    console.log('handleChangeFilters', filters)

    if (!paymentsGrid) return
    if (paymentsGrid.paymentsGridList.length === 0) return
    if (!tempQueryFiltersRef.current) return

    // const tempFilters: Filter[] = paymentsGrid.filters || []

    const tempFilters: Filter[] = paymentsGrid.filters.filter(filterItem => filterItem.type !== filters.type)

    if (tempFilters.length === 0) {
      tempFilters.push(filters)
    }

    tempFiltersRef.current = [...tempFilters]

    // console.log(extractOverviewPaymentTableFilters(tempFilters))

    loadPaymentsGrid({
      ...tempQueryFiltersRef.current,
      ...extractOverviewPaymentTableFilters(tempFilters)
    })
  }

  const handleDeleteFilters = (type: string) => {
    if (!paymentsGrid) return

    // if (paymentsGrid.paymentsGridList.length === 0) return

    const tempFilters: Filter[] = paymentsGrid.filters.filter(filterItem => filterItem.type !== type)

    tempFiltersRef.current = [...tempFilters]

    // console.log(extractOverviewPaymentTableFilters(tempFilters))

    loadPaymentsGrid({
      ...tempQueryFiltersRef.current,
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
