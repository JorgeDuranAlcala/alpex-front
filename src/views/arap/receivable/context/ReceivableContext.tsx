import { createContext } from "react";
import { Filter } from "../../_commons/interfaces/Grid";
import { ReceivableGrid } from "../../receivable/interfaces/ReceivableGrid";
import { ReceivableFilters } from "../interfaces/ReceivableFilters";


interface ReceivableContextProps {
  isLoading: boolean;
  receivableGrid: ReceivableGrid | null;
  loadReceivableGrid: (filters: ReceivableFilters) => void;
  onChangePage: (page: number) => void;
  handleChangeFilters: (filters: Filter) => void;
  handleDeleteFilters: (type: string) => void;
}

export const ReceivableContext = createContext({} as ReceivableContextProps);
