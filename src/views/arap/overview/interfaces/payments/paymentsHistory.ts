
export interface PaymentsHistory {
  policyCreated: string;
  installments: Installment[];
  reinsurerPayments: ReinsurerPayment[];
  endorsements: Endorsement[];
  claims: Claim[];

}

interface Installment {
  name: string;
  paymentDate: string;
  amount: number;
  currency: string;
  isChecked: boolean;
}

interface ReinsurerPayment {
  name: string;
  paymentDate: string;
  amount: number;
  currency: string;
  isChecked: boolean;
}

interface Endorsement {
  name: string;
  type: string;
  changedDate: string;
  isChecked: boolean;
}

interface Claim {
  name: string;
  claimDate: string;
  amount: number;
  currency: string;
  isChecked: boolean;
}
