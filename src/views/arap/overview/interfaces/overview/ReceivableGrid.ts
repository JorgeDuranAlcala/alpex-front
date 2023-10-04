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
  deposit_acc: string;
  transactionId: string;
  user: string;
}


export interface ExtendedReceivableQueryFilters {
  amountReceived?: number;
  broker?: string;
  pmtDate?: string;
  account?: string;
  inst?: number;
  depositAcc?: string;
  transactionId?: string; //refId: INST0001
  user?: string;
}