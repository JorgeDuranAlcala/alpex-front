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
  origin_acct: string;
  deposit_acct: string;
  transactionId: string;
  user: string;
}


export interface ExtendedDifferenceQueryFilters {
  amountReceived?: number;
  broker?: string;
  pmtDate?: string;
  account?: string;
  originAcct?: string;
  depositAcc?: string;
  transactionId?: string; //refId: INST0001
  user?: string;
}