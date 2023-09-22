import { createContext } from "react";
import { Filter } from "../../_commons/interfaces/Grid";
import { PayableGrid } from "../../payable/interfaces/PayableGrid";
import { PayableFilters } from "../interfaces/PayableFilters";


interface PayableContextProps {
  isLoading: boolean;
  payableGrid: PayableGrid | null;
  loadPayableGrid: (filters: PayableFilters) => void;
  onChangePage: (page: number) => void;
  handleChangeFilters: (filters: Filter) => void;
  handleDeleteFilters: (type: string) => void;
}

export const PayableContext = createContext({} as PayableContextProps);
