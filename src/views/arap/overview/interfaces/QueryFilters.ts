
export type ARAPStatus = 'pending' | 'unpaid' | 'paid';
export type ARAPTransaction = 'claim' | 'reinsurer pay' | 'broker pay';
export type ARAPCapabilityName = 'broker' | 'reinsurer';

export interface QueryFilters {
  broker: string,
  reinsurer: string;
  status: 'all' | ARAPStatus;
  transaction: 'all' | ARAPTransaction;
  date: Date;
  id: string;
}
