import { PaymentsHistory } from "../overview/interfaces/payments/paymentsHistory";


export const paymentsHistory: PaymentsHistory = {
  policyCreated: '2023-08-25T16:17:53.062Z',
  installments: [
    {
      name: "Installment 1",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 100,
      currency: "USD",
      isChecked: true,
    },
    {
      name: "Installment 2",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 200,
      currency: "USD",
      isChecked: false,
    },
    {
      name: "Installment 3",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 300,
      currency: "USD",
      isChecked: true,
    },
  ],
  reinsurerPayments: [
    {
      name: "Reinsurer Payment 1",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 500,
      currency: "USD",
      isChecked: true,
    },
    {
      name: "Reinsurer Payment 2",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 700,
      currency: "USD",
      isChecked: false,
    },
    {
      name: "Reinsurer Payment 3",
      paymentDate: '2023-08-25T16:17:53.062Z',
      amount: 900,
      currency: "USD",
      isChecked: true,
    },
  ],
  endorsements: [
    {
      name: "Endorsement 1",
      type: "Type 1",
      changedDate: '2023-08-25T16:17:53.062Z',
      isChecked: true,
    },
    {
      name: "Endorsement 2",
      type: "Type 2",
      changedDate: '2023-08-25T16:17:53.062Z',
      isChecked: false,
    },
  ],
  claims: [
    {
      name: "Claim 1",
      claimDate: '2023-08-25T16:17:53.062Z',
      amount: 1500,
      currency: "USD",
      isChecked: true,
    },
    {
      name: "Claim 2",
      claimDate: '2023-08-25T16:17:53.062Z',
      amount: 2000,
      currency: "USD",
      isChecked: false,
    },
  ]
};
