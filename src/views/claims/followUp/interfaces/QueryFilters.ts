
export type ARAPStatus = 'pending' | 'unpaid' | 'paid';
export type ARAPTransaction = 'claim' | 'reinsurer pay' | 'broker pay';
export type ARAPCapabilityName = 'broker' | 'reinsurer';

export interface QueryFilters {
  claimNumber: string,
  executive: string;
  date: Date;
  id: string;
}
