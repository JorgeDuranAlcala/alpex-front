import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments'
import { QueryFilters } from '../../interfaces/QueryFilters'
import { PaymentsContext } from '../payments/PaymentsContext'
import { MasterFiltersContext } from './MasterFiltersContext'

export const MasterFiltersProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, loadPaymentsGrid, paymentsGrid } = useContext(PaymentsContext)

  const [balanceOfPayments, setBalanceOfPayments] = useState<BalanceOfPayments | null>(null)
  const queryParams = useRef<string>('')

  const updateFilters = (queryFilters: QueryFilters) => {
    console.log(queryFilters)

    loadPaymentsGrid(queryFilters)
  }

  useEffect(() => {
    if (paymentsGrid?.info) {
      setBalanceOfPayments({
        receivableAmount: Number(paymentsGrid.info.receivable.totalAmountBroker),
        payableAmount: Number(paymentsGrid.info.payable.totalAmountReinsurer),
        differenceAmount: Number(paymentsGrid.info.difference),
        currency: paymentsGrid.info.currency
      })
    }
  }, [paymentsGrid?.info])

  return (
    <MasterFiltersContext.Provider
      value={{
        isLoading,
        balanceOfPayments,
        queryParams: queryParams.current,
        updateFilters
      }}
    >
      {children}
    </MasterFiltersContext.Provider>
  )
}
