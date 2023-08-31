import { Filter } from "@/views/arap/_commons/interfaces/Grid";
import { createContext } from "react";
import { QueryFilters } from "../../interfaces/QueryFilters";
import { PaymentsGrid } from "../../interfaces/payments/PaymentsGrid";


interface PaymentsContext {
  isLoading: boolean;
  paymentsGrid: PaymentsGrid | null,
  loadPaymentsGrid: (queryFilters: QueryFilters) => void;
  onChangePage: (page: number) => void;
  handleChangeFilters: (filters: Filter) => void;
  handleDeleteFilters: (type: string) => void;
}

export const PaymentsContext = createContext({} as PaymentsContext);
