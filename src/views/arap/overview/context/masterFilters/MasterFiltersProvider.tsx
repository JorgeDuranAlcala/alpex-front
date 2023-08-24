import { ReactNode, useContext, useRef, useState } from "react";
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments';
import { QueryFilters } from '../../interfaces/QueryFilters';
import { PaymentsContext } from "../payments/PaymentsContext";
import { MasterFiltersContext } from "./MasterFiltersContext";



export const MasterFiltersProvider = ({ children }: { children: ReactNode }) => {

  const { loadPaymentsGrid } = useContext(PaymentsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balanceOfPayments, setBalanceOfPayments] = useState<BalanceOfPayments | null>(null);
  const queryParams = useRef<string>('')

  const updateFilters = (queryFilters: QueryFilters) => {
    setIsLoading(true);

    console.log(queryFilters);

    loadPaymentsGrid(queryFilters);

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setIsLoading(false);
      setBalanceOfPayments({
        receivableAmount: 15000000,
        payableAmount: 1000000,
        differenceAmount: 100000,
        currency: 'USD',
      });

      queryParams.current = new URLSearchParams(queryFilters as any).toString();

    }, 1000);
  }

  return (
    <MasterFiltersContext.Provider value={{
      isLoading,
      balanceOfPayments,
      queryParams: queryParams.current,
      updateFilters,
    }}>
      {children}
    </MasterFiltersContext.Provider>
  )

}
