import { Filter, PagesInfo } from "../../../_commons/interfaces/Grid";
import { ARAPStatus, ARAPTransaction } from "../QueryFilters";


export interface PaymentsGrid {
  paymentsGridList: PaymentColumn[];
  isLoading: boolean;
  filters: Filter[];
  info: PagesInfo;
}

export interface PaymentColumn {
  transactionId: string;
  capabilityName: string;
  status: ARAPStatus;
  transaction: ARAPTransaction;
  amount: number;
  currency: string;
  transactionDate: string;

  // format?: (value: number) => string;
}

