import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'

export interface SecurityDto {
  id: number
  netPremiumAt100: number
  share: number
  premiumPerShareAmount: number
  frontingFeeActive: boolean
  dynamicCommission: number
  dynamicCommissionAmount: number
  frontingFee: number
  frontingFeeAmount: number
  netReinsurancePremium: number
  taxes: number
  taxesAmount: number
  reinsuranceBrokerage: number
  brokerAgeAmount: number
  receivedNetPremium: number
  distributedNetPremium: number
  difference: number
  active: boolean
  idCReinsuranceCompany: ReinsuranceCompanyDto
  idCRetroCedant: RetroCedantDto
  idCRetroCedantContact: RetroCedantContactDto
  idEndorsement: number
  idAccount: number
  isGross: boolean
  recievedNetPremium: number
}

export interface FormInformation {
  frontingFee: number
  netPremium: number
  grossPremium: number
}

export interface FormSectionProps {
  index: number
  security: SecurityDto
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
  premiumPerShareAmount: string
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
export type SecurityContextDto = {
  securities: SecurityDto[]
  allErrors: boolean[]
  activeErros: boolean
  information: FormInformation
  companiesSelect: number[]
  setSecurities: React.Dispatch<React.SetStateAction<SecurityDto[]>>
  setAllErrors: React.Dispatch<React.SetStateAction<boolean[]>>
  calculateSecurities: (securities: SecurityDto[]) => void
}
export type SecurityProps = {
  onStepChange: (step: number) => void
}
