import { PaymentInstallment } from '../_commons/interfaces/PaymentInstallment'

export const payment_installments_mock: PaymentInstallment[] = [
  {
    premiumPaymentWarranty: 20,
    paymentPercent: 33.33,
    balanceDue: 299.97,
    settlementDueDate: new Date()
  },
  {
    premiumPaymentWarranty: 70,
    paymentPercent: 33.33,
    balanceDue: 299.97,
    settlementDueDate: new Date()
  },
  {
    premiumPaymentWarranty: 60,
    paymentPercent: 33.34,
    balanceDue: 300.06,
    settlementDueDate: new Date()
  }
]
