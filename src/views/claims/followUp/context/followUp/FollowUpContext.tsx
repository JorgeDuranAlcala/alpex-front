import { Filter } from "@/views/arap/_commons/interfaces/Grid";
import { createContext } from "react";
import { QueryFilters } from "../../interfaces/QueryFilters";
import { FollowUpGrid } from "../../interfaces/followUp/FollowUpGrid";


interface FollowUpContext {
  isLoading: boolean;
  followUpGrid: FollowUpGrid | null,
  loadFollowUpGrid: (queryFilters: QueryFilters) => void;
  onChangePage: (page: number) => void;
  handleChangeFilters: (filters: Filter) => void;
  handleDeleteFilters: (type: string) => void;
}

export const FollowUpContext = createContext({} as FollowUpContext);
