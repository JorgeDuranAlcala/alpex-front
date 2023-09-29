import { createContext } from "react";
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments';
import { QueryFilters } from "../../interfaces/QueryFilters";


interface MasterFiltersContextProps {
  isLoading: boolean;
  balanceOfPayments: BalanceOfPayments | null;
  gridFilters: QueryFilters;
  updateFilters: (queryFilters: QueryFilters) => void;
  
  queryParams: string;
}

export const MasterFiltersContext = createContext({} as MasterFiltersContextProps);
