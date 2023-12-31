import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { SecurityDiscountDto } from './securityDiscount.dto'

export interface SecurityDto {
  id: number
  netPremiumAt100: number
  share: number
  shareAmount: number
  premiumPerShare: number
  premiumPerShareAmount: number
  frontingFeeActive: boolean
  taxesActive: boolean
  dynamicCommission: number
  dynamicCommissionAmount: number
  isChangeDynamicCommissionAmount: boolean
  frontingFee: number
  frontingFeeAmount: number
  isChangeFrontingFeeAmount: boolean
  grossPremiumPerShare: number
  netReinsurancePremium: number
  taxes: number
  taxesAmount: number
  isChangeTaxesAmount: boolean
  reinsuranceBrokerage: number
  brokerAgeAmount: number
  isChangeBrokerAgeAmount: boolean
  receivedNetPremium: number
  distributedNetPremium: number
  difference: number
  active: boolean
  consecutive: number | null
  view: number
  activeView?: number
  discounts: SecurityDiscountDto[] | []
  idCReinsuranceCompany: ReinsuranceCompanyDto
  idCReinsuranceCompanyBinder: ReinsuranceCompanyBinderDto | null
  idCRetroCedant: RetroCedantDto | null
  idCRetroCedantContact: RetroCedantContactDto | null
  idEndorsement: number
  idAccount: number
  isGross: boolean
  recievedNetPremium: number
  totalAmountOfDiscounts: number
}

export interface FormInformation {
  frontingFee: number
  netPremium: number
  grossPremium: number
  limit: number
  frontingFeeP?: number
  taxesP?: number
}

// export interface FormInformationPlacementStructure {
//   currency: string,
//   typeOfLimit: string,
//   exchangeRate: number,
//   attachmentPoint: number,
//   frontingFee: number,
//   grossPremium: number,
//   limit: number,
//   netPremium: number,
//   reinsuranceBrokerage: number,
//   sir: number,
//   taxes: number,
//   total: number,
//   reinsuranceBrokerageP: number,
//   taxesP: number,
//   frontingFeeP: number
// }

export interface FormSectionProps {
  index: number
  security: SecurityDto

  onDeleteItemList: (index: number) => void
}

// [key: number]: string | boolean | undefined
export interface FormInfo extends BrokerFormInfo {
  id: number
  netPremium: number
  sharePercent: number
  dynamicComissionPercent: number
  frontingFee: number
  reinsuranceCompany: number
  premiumPerShare: number
  dynamicComission: number
  frontingFeePercent: number
  netInsurancePremium: number
  retroCedant: number
  retroCedantContact: number
  contactEmail: string
  contactPhone: string
  contactCountry: number
  hasFrontingFee: boolean
  isGross: boolean
}

interface BrokerFormInfo {
  BrokerAge: number
  Taxes: number
  BrokerAgePercent: number
  TaxesPercent: number
}

export type FormSecurity = {
  formData: SecurityDto[]
  recievedNetPremium: number
  distribuitedNetPremium: number
  diference: number
  id?: number
}

export type errorsSecurity = {
  netPremiumAt100: string
  share: string
  shareAmount: string
  premiumPerShareAmount: string
  grossPremiumPerShareAmount: string
  reinsuranceBrokerage: string
  brokerAgeAmount: string
  dynamicCommission: string
  dynamicCommissionAmount: string
  frontingFee: string
  frontingFeeAmount: string
  taxes: string
  taxesAmount: string
  netReinsurancePremium: string
  idCReinsuranceCompany: string
  idCRetroCedant: string
  idCRetroCedantContact: string
}

//setSecurities: React.Dispatch<React.SetStateAction<SecurityDto[]>>
export type SecurityContextDto = {
  allErrors: boolean[]
  securities: SecurityDto[]
  activeErros: boolean
  information: FormInformation
  companiesSelect: number[]
  setAllErrors: React.Dispatch<React.SetStateAction<boolean[]>>
  setCurrentView: React.Dispatch<React.SetStateAction<number>>
  calculateSecurities: (securities: SecurityDto[], view?: number) => void
}
export type SecurityProps = {
  onStepChange: (step: number) => void
  disableSectionCtrl?: boolean
}
