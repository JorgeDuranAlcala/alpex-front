export interface GetArapAllResponseDto {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
  difference: string
  next: string
  page: number
  pages: number
  payable: Payable
  prev: null
  receivable: Receivable
  take: number
}

export interface Payable {
  totalAmountReinsurer: string
}

export interface Receivable {
  totalAmountBroker: string
}

export interface Result {
  amount: string
  createdAt: Date
  id: number
  installments?: Installment[]
  outstanding: string
  ref: string
  securities?: Security[]
  updatedAt: Date
}

export interface Installment {
  active: boolean
  balanceDue: string
  createdAt: Date
  id: number
  idAccount: IDAccount
  idPaymentStatus: IDPaymentStatus
  paymentPercentage: number
  premiumPaymentWarranty: number
  settlementDueDate: Date
  updatedAt: Date
}

export interface IDAccount {
  active: boolean
  createdAt: Date
  id: number
  informations: Information[]
  ref: string
  typeLogo: null
  updatedAt: Date
}

export interface Information {
  active: boolean
  attachmentPoint: string
  createdAt: Date
  currency: string
  effectiveDate: Date
  exchangeRate: number
  expirationDate: Date
  frontingFee: string
  frontingFeeTotal: string
  grossPremium: string
  id: number
  idBroker: ID
  insured: string
  limit: string
  netPremium: string
  premiumWithOutDiscounts: string
  premiumWithTaxes: string
  receptionDate: Date
  reinsuranceBrokerage: string
  reinsuranceBrokerageTotal: string
  riskClass: number
  sir: string
  step: number
  taxes: string
  taxesTotal: string
  totalValues: string
  updatedAt: Date
}

export interface ID {
  active: boolean
  alias?: string
  createdAt: Date
  id: number
  name: string
  special?: boolean
  updatedAt: Date
}

export interface IDPaymentStatus {
  id: number
  status: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface Security {
  active: boolean
  brokerAgeAmount: string
  consecutive: null
  contributionPremium: null
  createdAt: Date
  difference: string
  distributedNetPremium: string
  dueDate: null
  dynamicCommission: string
  dynamicCommissionAmount: string
  frontingFee: string
  frontingFeeActive: boolean
  frontingFeeAmount: string
  grossPremiumPerShare: string
  id: number
  idCReinsuranceCompany: ID
  idPaymentStatus: IDPaymentStatus
  isGross: boolean
  netPremiumAt100: string
  netReinsurancePremium: string
  premiumPerShareAmount: string
  receivedNetPremium: string
  reinsuranceBrokerage: string
  share: string
  shareAmount: string
  taxes: string
  taxesActive: boolean
  taxesAmount: string
  totalAmountOfDiscounts: string
  updatedAt: Date
  view: number
}
