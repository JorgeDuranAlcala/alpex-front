export interface GetPayablesAllParamsToSend {
  date: string;
  accountId?: number;
  capabilityId?: number;
  capabilityName?: string;
  currency?: string,
  totalDebt?: number,
  opc120?: number;
  "0a30"?: number;
  "31a60"?: number;
  "61a90"?: number;
  "91a120"?: number;
  paidPercent?: number;
}
