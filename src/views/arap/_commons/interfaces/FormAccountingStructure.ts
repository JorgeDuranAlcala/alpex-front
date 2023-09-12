
export interface FormAccountingStructure {
  insured: string;
  date: Date;
  net_reinsurance_premium: number;
  taxes_percent: number;
  taxes_amount: number;
  reinsurance_brokerage_percent: number;
  reinsurance_brokerage_amount: number;
  fronting_fee_percent: number;
  fronting_fee_amount: number;
  discounts_percent: number;
  discounts_amount: number;
  dynamic_commission_percent: number;
  dynamic_commission_amount: number;
}
