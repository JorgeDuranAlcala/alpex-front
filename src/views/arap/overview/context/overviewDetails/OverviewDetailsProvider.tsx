import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { QueryFilters } from '@/views/arap/overview/interfaces/QueryFilters'
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'
import { DifferenceGrid } from '@/views/arap/overview/interfaces/overview/DifferenceGrid'
import { PayableGrid } from '@/views/arap/overview/interfaces/overview/PayableGrid'
import { ReceivableGrid } from '@/views/arap/overview/interfaces/overview/ReceivableGrid'

import { useOverviewDetailsQueriesAdapter } from '../../services/_common/hooks/useOverviewDetailsQueriesAdapter'
import { overviewDifferencesAdapter } from '../../services/getOverviewDifference/frontAdapters/overviewDifferencesAdapter'
import { getOverviewDifferenceAllService } from '../../services/getOverviewDifference/getOverviewDifferenceAllService'
import { overviewPayablesAdapter } from '../../services/getOverviewPayableAll/frontAdapters/overviewPayablesAdapter'
import { getOverviewPayableAllService } from '../../services/getOverviewPayableAll/getOverviewPayableAllService'
import { overviewReceivablesAdapter } from '../../services/getOverviewReceivableAll/frontAdapters/overviewReceivablesAdapter'
import { getOverviewReceivableAllService } from '../../services/getOverviewReceivableAll/getOverviewReceivableAllService'
import { GetInfoPagination, GetTotalAmount, OverviewDetailsContext } from './OverviewDetailsContext'

const SWITCH_DETAILS_ERROR = 'Error: no details type provided'

export const OverViewDetailsProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const {getParamsToSend} = useOverviewDetailsQueriesAdapter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [payableGrid, setPayableGrid] = useState<PayableGrid | null>(null)
  const [receivableGrid, setReceivableGrid] = useState<ReceivableGrid | null>(null)
  const [differenceGrid, setDifferenceGrid] = useState<DifferenceGrid | null>(null)

  const getQueryFilters = (): QueryFilters => {
    const queryFilters: QueryFilters = {
      broker: (router.query.broker as string) || 'all',
      reinsurer: (router.query.reinsurer as string) || 'all',
      status: (router.query.status as QueryFilters['status']) || 'all',
      transaction: (router.query.transaction as QueryFilters['transaction']) || 'all',
      date: (router.query.date as string) || '',
      id: (router.query.id as string) || '',
      transactionType: (router.query.transactionType as QueryFilters['transactionType']) || 'all'
    }

    return queryFilters
  }

  const loadDetailsGrid = (detailsType: DetailsType) => {
    setIsLoading(true)

    switch (detailsType) {
      case 'Payable':
        loadPayableGrid()
        break
      case 'Receivable':
        loadReceivableGrid()
        break
      case 'Difference':
        loadDifferenceGrid()
        break
      default:
        alert(SWITCH_DETAILS_ERROR)
        break
    }
  }

  const loadPayableGrid = async () => {
    const queryFilters = getQueryFilters()
    console.log('queryFilters', queryFilters)

    const paramsToSend = getParamsToSend(queryFilters);
    const payables = await getOverviewPayableAllService(paramsToSend);
    const payablesAdapted = overviewPayablesAdapter(payables, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    setPayableGrid(payablesAdapted);

    setIsLoading(false);

  }

  const loadReceivableGrid = async () => {
    const queryFilters = getQueryFilters()
    console.log('queryFilters', queryFilters)

    const paramsToSend = getParamsToSend(queryFilters);
    const receivables = await getOverviewReceivableAllService(paramsToSend);
    const receivablesAdapted = overviewReceivablesAdapter(receivables, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    setReceivableGrid(receivablesAdapted);

    setIsLoading(false);
  }

  const loadDifferenceGrid = async () => {
    const queryFilters = getQueryFilters()
    console.log('queryFilters', queryFilters)
    
    const paramsToSend = getParamsToSend(queryFilters);
    const differences = await getOverviewDifferenceAllService(paramsToSend);
    const differencesAdapted = overviewDifferencesAdapter(differences, {
      totalAmount: router.query.totalAmount ? +router.query.totalAmount : 0,
      currency: router.query.currency  ? router.query.currency as string: 'unknown'
    })

    setDifferenceGrid(differencesAdapted);

    setIsLoading(false);

  }

  const onChangePage = (page: number, detailsType: DetailsType) => {
    console.log('onChangePage', page, detailsType)

    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return

    switch (detailsType) {
      case 'Payable':
        setPayableGrid({
          ...payableGrid!,
          info: {
            ...payableGrid!.info,
            page
          }
        })
        break
      case 'Receivable':
        setReceivableGrid({
          ...receivableGrid!,
          info: {
            ...receivableGrid!.info,
            page
          }
        })
        break
      case 'Difference':
        setDifferenceGrid({
          ...differenceGrid!,
          info: {
            ...differenceGrid!.info,
            page
          }
        })
      default:
        break
    }
  }

  const handleChangeFilters = (filters: Filter, detailsType: DetailsType) => {
    console.log('handleChangeFilters', filters)

    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return

    setIsLoading(true)

    switch (detailsType) {
      case 'Payable':
        if (payableGrid!.payableGridList.length === 0) return
        const tempPayableFilters: Filter[] = payableGrid!.filters || []

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setPayableGrid({
            ...payableGrid!,
            filters: [...tempPayableFilters, filters]
          })

          setIsLoading(false)
        }, 500)
        break

      case 'Receivable':
        if (receivableGrid!.receivableGridList.length === 0) return
        const tempReceivableFilters: Filter[] = receivableGrid!.filters || []

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setReceivableGrid({
            ...receivableGrid!,
            filters: [...tempReceivableFilters, filters]
          })

          setIsLoading(false)
        }, 500)
        break

      case 'Difference':
        if (differenceGrid!.differenceGridList.length === 0) return
        const tempDifferenceFilters: Filter[] = differenceGrid!.filters || []

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setDifferenceGrid({
            ...differenceGrid!,
            filters: [...tempDifferenceFilters, filters]
          })

          setIsLoading(false)
        }, 500)
        break

      default:
        alert(SWITCH_DETAILS_ERROR)
        break
    }
  }

  const handleDeleteFilters = (type: string, detailsType: DetailsType) => {
    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return

    setIsLoading(true)

    switch (detailsType) {
      case 'Payable':
        if (payableGrid!.payableGridList.length === 0) return
        const tempPayableFilters: Filter[] = payableGrid!.filters.filter(filterItem => filterItem.type !== type)

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setPayableGrid({
            ...payableGrid!,
            filters: [...tempPayableFilters]
          })

          setIsLoading(false)
        }, 500)
        break

      case 'Receivable':
        if (receivableGrid!.receivableGridList.length === 0) return
        const tempReceivableFilters: Filter[] = receivableGrid!.filters.filter(filterItem => filterItem.type !== type)

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setReceivableGrid({
            ...receivableGrid!,
            filters: [...tempReceivableFilters]
          })

          setIsLoading(false)
        }, 500)
        break

      case 'Difference':
        if (differenceGrid!.differenceGridList.length === 0) return
        const tempDifferenceFilters: Filter[] = differenceGrid!.filters.filter(filterItem => filterItem.type !== type)

        // Todo: reemplazar este Timeout por el servicio que se implementará
        setTimeout(() => {
          setDifferenceGrid({
            ...differenceGrid!,
            filters: [...tempDifferenceFilters]
          })

          setIsLoading(false)
        }, 500)
        break

      default:
        alert(SWITCH_DETAILS_ERROR)
        break
    }
  }

  const getGridFilters = (detailsType: DetailsType) => {
    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return []

    switch (detailsType) {
      case 'Payable':
        return payableGrid!.filters
      case 'Receivable':
        return receivableGrid!.filters
      case 'Difference':
        return differenceGrid!.filters
      default:
        return []
    }
  }

  const getTotalAmount = (detailsType: DetailsType): GetTotalAmount => {
    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return { totalAmount: 0, currency: '' }

    switch (detailsType) {
      case 'Payable':
        return {
          totalAmount: payableGrid!.totalAmount,
          currency: payableGrid!.totalAmountCurrency
        }
      case 'Receivable':
        return {
          totalAmount: receivableGrid!.totalAmount,
          currency: receivableGrid!.totalAmountCurrency
        }
      case 'Difference':
        return {
          totalAmount: differenceGrid!.totalAmount,
          currency: differenceGrid!.totalAmountCurrency
        }
      default:
        return { totalAmount: 0, currency: '' }
    }
  }

  const getInfoPagination = (detailsType: DetailsType): GetInfoPagination => {
    const detailsGrid = payableGrid || receivableGrid || differenceGrid

    if (!detailsGrid) return { page: 0, pageCount: 0, pageSize: 0, rowCount: 0 }

    switch (detailsType) {
      case 'Payable':
        return {
          page: Number(payableGrid!.info.page),
          pageCount: Number(payableGrid!.info.pages),
          pageSize: Number(payableGrid!.info.take),
          rowCount: Number(payableGrid!.info.count)
        }
      case 'Receivable':
        return {
          page: Number(receivableGrid!.info.page),
          pageCount: Number(receivableGrid!.info.pages),
          pageSize: Number(receivableGrid!.info.take),
          rowCount: Number(receivableGrid!.info.count)
        }
      case 'Difference':
        return {
          page: Number(differenceGrid!.info.page),
          pageCount: Number(differenceGrid!.info.pages),
          pageSize: Number(differenceGrid!.info.take),
          rowCount: Number(differenceGrid!.info.count)
        }
      default:
        return { page: 0, pageCount: 0, pageSize: 0, rowCount: 0 }
    }
  }

  return (
    <OverviewDetailsContext.Provider
      value={{
        isLoading,
        payableGrid,
        receivableGrid,
        differenceGrid,
        loadDetailsGrid,
        onChangePage,
        handleChangeFilters,
        handleDeleteFilters,
        getGridFilters,
        getTotalAmount,
        getInfoPagination
      }}
    >
      {children}
    </OverviewDetailsContext.Provider>
  )
}
