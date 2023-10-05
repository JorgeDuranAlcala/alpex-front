import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments'
import { QueryFilters } from '../../interfaces/QueryFilters'
import { extractOverviewPaymentTableFilters } from '../../utils/extractOverviewPaymentTableFilters'
import { PaymentsContext } from '../payments/PaymentsContext'
import { MasterFiltersContext } from './MasterFiltersContext'

export const MasterFiltersProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, loadPaymentsGrid, paymentsGrid } = useContext(PaymentsContext)

  const [balanceOfPayments, setBalanceOfPayments] = useState<BalanceOfPayments | null>(null)
  const queryParams = useRef<string>('')

  const updateFilters = (queryFilters: QueryFilters) => {
    queryParams.current = new URLSearchParams(queryFilters as any).toString();
    loadPaymentsGrid(queryFilters);
  }

  useEffect(() => {
    if (paymentsGrid?.info && paymentsGrid?.paymentsGridList.length > 0) {
      setBalanceOfPayments({
        receivableAmount: Number(paymentsGrid.info.receivable.totalAmountBroker),
        payableAmount: Number(paymentsGrid.info.payable.totalAmountReinsurer),
        differenceAmount: Number(paymentsGrid.info.difference),
        currency: paymentsGrid.info.currency
      })
    } else {
      setBalanceOfPayments(null);
    }
  }, [paymentsGrid?.info])


  return (
    <MasterFiltersContext.Provider
      value={{
        isLoading,
        balanceOfPayments,
        gridFilters: extractOverviewPaymentTableFilters(paymentsGrid?.filters || []),
        updateFilters,
        
        queryParams: queryParams.current,
      }}
    >
      {children}
    </MasterFiltersContext.Provider>
  )
}
