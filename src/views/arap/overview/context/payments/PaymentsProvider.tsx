import { payments_mock } from "@/views/arap/mocks/payments_mock";
import { ReactNode, useState } from "react";
import { QueryFilters } from '../../interfaces/QueryFilters';
import { PaymentsGrid } from '../../interfaces/payments/PaymentsGrid';
import { PaymentsContext } from "./PaymentsContext";


export const PaymentsProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentsGrid, setPaymentsGrid] = useState<PaymentsGrid | null>(null);

  const loadPaymentsGrid = (queryFilters: QueryFilters) => {

    setIsLoading(true);
    console.log('loadPayments by queryFilters', queryFilters);

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {

      const infoPages = {
        count: payments_mock.length,
        page: 1,
        take: 10,
        pages: Math.ceil(payments_mock.length / 10),
        next: null,
        prev: null,
      }

      setPaymentsGrid({
        paymentsGridList: payments_mock,
        info: infoPages,
        isLoading: false,
        filters: [],
      });

      setIsLoading(false);
    }, 500)
  }

  const onChangePage = (page: number) => {

    console.log('onChangePage', page);

    if (!paymentsGrid) return;

    setPaymentsGrid({
      ...paymentsGrid,
      info: {
        ...paymentsGrid.info,
        page
      },

    })
  }

  return (
    <PaymentsContext.Provider value={{
      isLoading,
      paymentsGrid,
      loadPaymentsGrid,
      onChangePage
    }}>
      {children}
    </PaymentsContext.Provider>
  )
}
