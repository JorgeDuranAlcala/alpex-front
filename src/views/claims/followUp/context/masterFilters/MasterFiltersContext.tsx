import { createContext } from "react";
import { BalanceOfPayments } from '../../interfaces/BalanceOfPayments';
import { QueryFilters } from "../../interfaces/QueryFilters";


interface MasterFiltersContextProps {
  isLoading: boolean;
  balanceOfPayments: BalanceOfPayments | null;
  queryParams: string;
  updateFilters: (queryFilters: QueryFilters) => void;
}

export const MasterFiltersContext = createContext({} as MasterFiltersContextProps);
