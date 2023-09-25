import { Filter, PagesInfo } from "@/views/arap/_commons/interfaces/Grid";

export interface DetailsGrid {
  totalAmount: number;
  totalAmountCurrency: string;
  isLoading: boolean;
  filters: Filter[];
  info: PagesInfo;
}
