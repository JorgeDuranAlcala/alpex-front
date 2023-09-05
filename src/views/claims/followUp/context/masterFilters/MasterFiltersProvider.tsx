import { ReactNode, useContext, useRef, useState } from "react";
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments';
import { QueryFilters } from '../../interfaces/QueryFilters';
import { FollowUpContext } from "../followUp/FollowUpContext";
import { MasterFiltersContext } from "./MasterFiltersContext";



export const MasterFiltersProvider = ({ children }: { children: ReactNode }) => {

  const { loadFollowUpGrid } = useContext(FollowUpContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balanceOfPayments, setBalanceOfPayments] = useState<BalanceOfPayments | null>(null);
  const queryParams = useRef<string>('')

  // console.log("Se ejecuta la data:");

  const updateFilters = (queryFilters: QueryFilters) => {
    console.log("Se ejecuta la data:");

    setIsLoading(true);

    console.log(queryFilters);

    loadFollowUpGrid(queryFilters);

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
