import { createContext } from "react";
import { QueryFilters } from "../../interfaces/QueryFilters";
import { PaymentsGrid } from "../../interfaces/payments/PaymentsGrid";


interface PaymentsContext {
  isLoading: boolean;
  paymentsGrid: PaymentsGrid | null,
  loadPaymentsGrid: (queryFilters: QueryFilters) => void;
  onChangePage: (page: number) => void;
}

export const PaymentsContext = createContext({} as PaymentsContext);
