import { Filter, PagesInfo } from "../../_commons/interfaces/Grid";


export interface FollowUpGrid {
  followUpGridList: FollowUpColumn[];
  info: PagesInfo;
  isLoading: boolean;
  filters: Filter[];
}

export interface FollowUpColumn {
  claimNumber: string;
  executive: string;
  date: string;
  id: string;
}

