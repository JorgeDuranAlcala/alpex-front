
import { Filter } from "@/views/arap/_commons/interfaces/Grid";
import { createContext } from "react";
import { DetailsType } from '../../interfaces/overview/DetailsType';
import { DifferenceGrid } from "../../interfaces/overview/DifferenceGrid";
import { PayableGrid } from "../../interfaces/overview/PayableGrid";
import { ReceivableGrid } from "../../interfaces/overview/ReceivableGrid";

export interface GetTotalAmount {
  totalAmount: number;
  currency: string;
}

export interface GetInfoPagination {

  page: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;

}

interface OverviewDetailsContextProps {
  isLoading: boolean;
  payableGrid: PayableGrid | null,
  receivableGrid: ReceivableGrid | null,
  differenceGrid: DifferenceGrid | null

  loadDetailsGrid: (detailsType: DetailsType) => void;
  onChangePage: (page: number, detailsType: DetailsType) => void;
  getTotalAmount: (detailsType: DetailsType) => GetTotalAmount;
  getInfoPagination: (detailsType: DetailsType) => GetInfoPagination;
  getGridFilters: (detailsType: DetailsType) => Filter[];
  handleChangeFilters: (filters: Filter, detailsType: DetailsType) => void;
  handleDeleteFilters: (type: string, detailsType: DetailsType) => void;
}

export const OverviewDetailsContext = createContext({} as OverviewDetailsContextProps);
