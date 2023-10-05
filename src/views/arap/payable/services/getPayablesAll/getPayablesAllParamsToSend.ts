export interface GetPayablesAllParamsToSend {
  
  // accountId?: number;
  // currency?: string,

  date: string;
  capabilityId?: number;
  op0_30?: number;
  op31_60?: number;
  op61_90?: number;
  op91_120?: number;
  op120?: number;
  totalDebt?: number,
  paidPercent?: number;
  page?: number;
}
