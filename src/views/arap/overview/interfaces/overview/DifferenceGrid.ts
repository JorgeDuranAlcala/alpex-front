import { DetailsGrid } from "./DetailsGrid";


export interface DifferenceGrid extends DetailsGrid {
  differenceGridList: DifferenceColumn[];
}

export interface DifferenceColumn {
  amount_received: number;
  currency: string;
  capability_name: string;
  pmt_date: string;
  account: string;
  origin_acct: number;
  deposit_acct: number;
  transactionId: string;
  user: string;
}


export interface ExtendedDifferenceQueryFilters {
  amountReceived?: number;
  broker?: string;
  pmtDate?: string;
  account?: string;
  originAcct?: number;
  depositAcc?: number;
  transactionId?: string; //refId: INST0001
  user?: string;
}