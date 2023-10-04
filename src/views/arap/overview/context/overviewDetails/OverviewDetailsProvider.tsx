import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'

import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { QueryFilters } from '@/views/arap/overview/interfaces/QueryFilters'
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'
import { DifferenceGrid } from '@/views/arap/overview/interfaces/overview/DifferenceGrid'
import { PayableGrid } from '@/views/arap/overview/interfaces/overview/PayableGrid'
import { ReceivableGrid } from '@/views/arap/overview/interfaces/overview/ReceivableGrid'

import { useDifferenceGrid } from '../../hooks/overviewDetails/useDifferenceGrid'
import { usePayableGrid } from '../../hooks/overviewDetails/usePayableGrid'
import { useReceivableGrid } from '../../hooks/overviewDetails/useReceivableGrid'
import { ExtendedQueryFilters } from '../../interfaces/overview/ExtendedQueryFilters'
import { useOverviewDetailsQueriesAdapter } from '../../services/_common/hooks/useOverviewDetailsQueriesAdapter'
import { GetInfoPagination, GetTotalAmount, OverviewDetailsContext } from './OverviewDetailsContext'

const SWITCH_DETAILS_ERROR = 'Error: no details type provided'

export const OverViewDetailsProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  
  const {getParamsToSend} = useOverviewDetailsQueriesAdapter()
  const { getReceivableGrid, getReceivableTableFilters, deleteReceivableTableFilters } = useReceivableGrid()
  const { getPayableGrid, getPayableTableFilters, deletePayableTableFilters } = usePayableGrid()
  const { getDifferenceGrid, getDifferenceTableFilters, deleteDifferenceTableFilters } = useDifferenceGrid()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [payableGrid, setPayableGrid] = useState<PayableGrid | null>(null)
  const [receivableGrid, setReceivableGrid] = useState<ReceivableGrid | null>(null)
  const [differenceGrid, setDifferenceGrid] = useState<DifferenceGrid | null>(null)

  const pageRef = useRef(1);
  const filtersRef = useRef<Filter[]>([]);
  const extendedQueryFiltersRef = useRef<ExtendedQueryFilters | null>(null); 


  const getQueryFilters = (): QueryFilters => {
   return {
      broker: (router.query.broker as string) || 'all',
      reinsurer: (router.query.reinsurer as string) || 'all',
      status: (router.query.status as QueryFilters['status']) || 'all',
      transaction: (router.query.transaction as QueryFilters['transaction']) || 'all',
      date: (router.query.date as string) || '',
      id: (router.query.id as string) || '',
      transactionType: (router.query.transactionType as QueryFilters['transactionType']) || 'all',
      page: pageRef.current,
    }
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
    const paramsToSend = getParamsToSend(queryFilters);
    const payablesAdapted = await getPayableGrid({
      ...paramsToSend, 
      ...extendedQueryFiltersRef.current
    });

    setPayableGrid({
      ...payablesAdapted,
      filters: [...filtersRef.current, ...payablesAdapted.filters]
    });

    setIsLoading(false);

  }

  const loadReceivableGrid = async () => {
    const queryFilters = getQueryFilters()
    const paramsToSend = getParamsToSend(queryFilters);
    const receivablesAdapted = await getReceivableGrid({
      ...paramsToSend,
      ...extendedQueryFiltersRef.current
    })

    setReceivableGrid({
      ...receivablesAdapted,
      filters: [...filtersRef.current, ...receivablesAdapted.filters]
    });

    setIsLoading(false);
  }

  const loadDifferenceGrid = async () => {
    const queryFilters = getQueryFilters()
    const paramsToSend = getParamsToSend(queryFilters);
    const differencesAdapted = await getDifferenceGrid({
      ...paramsToSend, 
      ...extendedQueryFiltersRef.current
    }); 

    setDifferenceGrid({
      ...differencesAdapted,
      filters: [...filtersRef.current, ...differencesAdapted.filters]
    });

    setIsLoading(false);

  }

  const onChangePage = (page: number, detailsType: DetailsType) => {
    console.log('onChangePage', page, detailsType)

    const detailsGrid = payableGrid || receivableGrid || differenceGrid
    if (!detailsGrid) return

    pageRef.current = page;

    loadDetailsGrid(detailsType)
  }

  const handleChangeFilters = (filters: Filter, detailsType: DetailsType) => {
    console.log('handleChangeFilters', filters)

    // const detailsGrid = payableGrid || receivableGrid || differenceGrid
    // if (!detailsGrid) return

    setIsLoading(true)

    switch (detailsType) {
      case 'Payable':
        // if (payableGrid!.payableGridList.length === 0) return
        const payableFilters = getPayableTableFilters(filters, payableGrid);
        extendedQueryFiltersRef.current = payableFilters.queryFilters;
        filtersRef.current = payableFilters.tableFilters;
        loadDetailsGrid(detailsType);
        break

      case 'Receivable':
        // if (receivableGrid!.receivableGridList.length === 0) return
        const receivableFilters = getReceivableTableFilters(filters, receivableGrid);
        extendedQueryFiltersRef.current = receivableFilters.queryFilters;
        filtersRef.current = receivableFilters.tableFilters;
        loadDetailsGrid(detailsType);
        break

      case 'Difference':
        // if (differenceGrid!.differenceGridList.length === 0) return
        const differenceFilters = getDifferenceTableFilters(filters, differenceGrid);
        extendedQueryFiltersRef.current = differenceFilters.queryFilters;
        filtersRef.current = differenceFilters.tableFilters;
        loadDetailsGrid(detailsType);
        break

      default:
        alert(SWITCH_DETAILS_ERROR)
        break
    }
  }

  const handleDeleteFilters = (type: string, detailsType: DetailsType) => {
    // const detailsGrid = payableGrid || receivableGrid || differenceGrid
    // if (!detailsGrid) return

    setIsLoading(true)

    switch (detailsType) {
      case 'Payable':
        // if (payableGrid!.payableGridList.length === 0) return
        const payableFilters = deletePayableTableFilters(type, payableGrid);
        extendedQueryFiltersRef.current = payableFilters.queryFilters;
        filtersRef.current = payableFilters.tableFilters;
        loadDetailsGrid(detailsType);
        break

      case 'Receivable':
        // if (receivableGrid!.receivableGridList.length === 0) return
        const receivableFilters = deleteReceivableTableFilters(type, receivableGrid);
        extendedQueryFiltersRef.current = receivableFilters.queryFilters;
        filtersRef.current = receivableFilters.tableFilters;
        loadDetailsGrid(detailsType);
        break

      case 'Difference':
        // if (differenceGrid!.differenceGridList.length === 0) return
       const differenceFilters =deleteDifferenceTableFilters(type, differenceGrid);
        extendedQueryFiltersRef.current = differenceFilters.queryFilters;
        filtersRef.current = differenceFilters.tableFilters;
        loadDetailsGrid(detailsType);
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
