import { Filter, PagesInfo } from "@/views/arap/_commons/interfaces/Grid";
import { ReactNode } from "react";


export interface ReceivableGrid {
  receivableGridList: ReceivableColumn[];
  isLoading: boolean;
  filters: Filter[];
  info: PagesInfo;
}

export interface ReceivableColumn {
  account_id: number;
  capability_id: number;
  capability_name: string;
  currency: string;
  "120": number | null;
  "0_30": number | null;
  "31_60": number | null;
  "61_90": number | null;
  "91_120": number | null;
  total_debt: number;
  paid_percent: number;
}

export interface ReceivableCollapsibleData {
  collapsibleRow: ReactNode;
  collapsibleRowData: ReceivableColumn[];
}
