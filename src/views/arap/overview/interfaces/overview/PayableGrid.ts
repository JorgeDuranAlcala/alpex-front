import { DetailsGrid } from "./DetailsGrid";

export interface PayableGrid extends DetailsGrid {
  payableGridList: PayableColumn[];
}


export interface PayableColumn {
  amount_paid: number;
  currency: string;
  capability_name: string;
  pmt_date: string;
  account: string;
  origin_acct: number;
  transactionId: string;
  user: string;
}
