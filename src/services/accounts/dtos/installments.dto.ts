export interface InstallmentDto {
  id: number
  balanceDue: number
  paymentPercentage: number
  settlementDueDate: Date
  premiumPaymentWarranty: number
  idAccount: number
}

export interface InstallmentHeaderDto {
  insured: number
  idAccount: number
  broker: string
  lineOfBusiness: string
  balance: number
  totalDebt: number
}

export interface CountInstallmentsDto {
  totalInstallments: number
  totalBalanceDue: number
}
export interface filterInstallmentsDto {
  results: JSON
}

export interface installmentsHeaderDto {
  insured: string
  idAccount: number
  status: string
  broker: string
  lineOfBusiness: string
  dueDate: string
  balanceDue: number
  installmentOrder: string
  balance: number
  totalDebt: number
}
