import { DetailsGrid } from "./DetailsGrid";

export interface ReceivableGrid extends DetailsGrid {
  receivableGridList: ReceivableColumn[];
}

export interface ReceivableColumn {
  amount_received: number;
  currency: string;
  broker: string;
  pmt_date: string;
  account: string;
  inst: string;
  deposit_acc: number;
  transactionId: string;
  user: string;
}
