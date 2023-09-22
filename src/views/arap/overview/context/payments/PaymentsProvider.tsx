import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { getArapAllService } from '@/views/arap/services/getArapAll'
import { overviewPaymentsAdapter } from '@/views/arap/services/getArapAll/frontAdapters/overviewPaymentsAdapter'
import { overviewPaymentsAdapterQueries } from '@/views/arap/services/getArapAll/frontAdapters/overviewPaymentsAdapterQueries'
import { ReactNode, useRef, useState } from 'react'
import { QueryFilters } from '../../interfaces/QueryFilters'
import { PaymentsGrid } from '../../interfaces/payments/PaymentsGrid'
import { PaymentsContext } from './PaymentsContext'

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paymentsGrid, setPaymentsGrid] = useState<PaymentsGrid | null>(null)
  const tempQueryFilters = useRef<QueryFilters | null>(null)

  const loadPaymentsGrid = async (queryFilters: QueryFilters) => {
    setIsLoading(true)
    console.log('loadPayments by queryFilters', queryFilters)
    tempQueryFilters.current = queryFilters

    const filters = overviewPaymentsAdapterQueries(queryFilters)
    const payments = await getArapAllService(filters)
    const paymentsAdapted = overviewPaymentsAdapter(payments)

    setPaymentsGrid({
      paymentsGridList: paymentsAdapted.paymentsGridList,
      info: paymentsAdapted.info,
      isLoading: paymentsAdapted.isLoading,
      filters: paymentsAdapted.filters
    })

    setIsLoading(false)
  }

  const onChangePage = (page: number) => {
    console.log('onChangePage', page)

    if (!tempQueryFilters.current) return
    if (!paymentsGrid) return

    loadPaymentsGrid({
      ...tempQueryFilters.current,
      page
    })
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters)

    if (!paymentsGrid) return
    if (paymentsGrid.paymentsGridList.length === 0) return

    setIsLoading(true)

    const tempFilters: Filter[] = paymentsGrid.filters || []

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setPaymentsGrid({
        ...paymentsGrid,
        filters: [...tempFilters, filters]
      })

      setIsLoading(false)
    }, 500)
  }

  const handleDeleteFilters = (type: string) => {
    if (!paymentsGrid) return
    if (paymentsGrid.paymentsGridList.length === 0) return

    setIsLoading(true)

    const tempFilters: Filter[] = paymentsGrid.filters.filter(filterItem => filterItem.type !== type)

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setPaymentsGrid({
        ...paymentsGrid,
        filters: [...tempFilters]
      })
      setIsLoading(false)
    }, 500)
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
