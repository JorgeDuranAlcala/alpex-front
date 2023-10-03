
export interface OverviewDetailsParamsToSendDto {
  broker?: string;
  reinsurer?: string;
  status?: string | number;
  transactionType?: string;
  date: string;
  id?: number;
  transaction?: string;
  page?: number;
  amount?: number;
  capabilityName?: string;
}