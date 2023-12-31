export interface InformationDto {
  id: number
  insured: string
  effectiveDate: Date | null
  expirationDate: Date | null
  receptionDate: Date | null
  createdAt?: Date | null
  limit: number
  attachmentPoint: number
  reinsuranceBrokerage: number
  taxes: number
  taxesTotal: number
  reinsuranceBrokerageTotal: number
  sir: number
  totalValues: number
  riskClass: number
  frontingFeeTotal: number
  frontingFee: number
  step?: number
  currency: string
  exchangeRate: number
  netPremium: number | string
  grossPremium: number
  idAccount: number
  idCountry: number
  idBroker: number
  idBrokerContact: number | null
  brokerContactEmail: string
  brokerContactPhone: string
  brokerContactCountry: string
  idCedant: number
  idCedantContact: number | null
  cedantContactEmail: string
  cedantContactPhone: string
  cedantContactCountry: string
  idLineOfBussines: number
  idTypeOfLimit: number | null
  idCurrency?: number | null
  idEconomicSector: number | null
  idRiskActivity: number
  idLeadUnderwriter: number | null | string
  idUnderwriter: number | null | string
  idTechnicalAssistant: number | null | string
  updatedAt?: number | null | string | any
  idAccountType: number
  premiumWithTaxes: number
  premiumWithOutDiscounts: number
  typeLogo: number | null
  idEndorsement?: number | null
}

export interface InformationDetailsDto {
  id: number
  insured: string
  effectiveDate: Date | null
  expirationDate: Date | null
  receptionDate: Date | null
  createdAt?: Date | null
  limit: number
  attachmentPoint: number
  reinsuranceBrokerage: number
  taxes: number
  taxesTotal: number
  reinsuranceBrokerageTotal: number
  sir: number
  totalValues: number
  riskClass: number
  frontingFeeTotal: number
  frontingFee: number
  step?: number
  currency: string
  exchangeRate: number
  netPremium: number | string
  grossPremium: number
  brokerContactEmail: string
  brokerContactPhone: string
  brokerContactCountry: string
  cedantContactEmail: string
  cedantContactPhone: string
  cedantContactCountry: string
  updatedAt?: number | null | string | any
  premiumWithTaxes: number
  premiumWithOutDiscounts: number
  idAccount: number
  idCurrency: Currency
  idCountry: Country
  idBroker: CommonCatalog
  idBrokerContact: CommonContact
  idCedant: CommonCatalog
  idCedantContact: CommonContact
  idLineOfBussines: LineOfBussines
  idTypeOfLimit: CommonCatalog
  idEconomicSector: EconomicSector
  idRiskActivity: RiskActivity
  idLeadUnderwriter: CommonUser
  idUnderwriter: CommonUser
  idTechnicalAssistant: CommonUser
  idAccountType: number
}

interface LineOfBussines {
  id: number
  lineOfBussines: string
}

interface CommonCatalog {
  id: number
  alias: string
  name: string
}

interface CommonContact {
  id: number
  name: string
  email: string
  phone: string
}

interface EconomicSector {
  id: number
  sector: string
}

interface CommonUser {
  id: number
  name: string
  areaCode: string
  phone: string
  surname: string
  username: string
  secondSurname: string
  email: string
  password: string
}

interface Country {
  id: number
  currency: string
  name: string
}

interface Currency {
  id: number
  code: string
  name: string
  country: string
}

interface RiskActivity {
  id: number
  class: number
  industryCode: number
  occupancy: string
  riskActivity: string
}

export interface InformationResponse {
  id: number
  insured: string
  effectiveDate: Date | null
  expirationDate: Date | null
  receptionDate: Date | null
  createdAt?: Date | null
  limit: number
  attachmentPoint: number
  reinsuranceBrokerage: number
  taxes: number
  taxesTotal: number
  reinsuranceBrokerageTotal: number
  sir: number
  totalValues: number
  riskClass: number
  frontingFeeTotal: number
  frontingFee: number
  step?: number
  currency: string
  exchangeRate: number
  netPremium: number | string
  grossPremium: number
  idAccount: number
  idCountry: number
  idBroker: IDataBroker
  idBrokerContact: number | null
  brokerContactEmail: string
  brokerContactPhone: string
  brokerContactCountry: string
  idCedant: number
  idCedantContact: number | null
  cedantContactEmail: string
  cedantContactPhone: string
  cedantContactCountry: string
  idLineOfBussines: number
  idTypeOfLimit: number | null
  idRiskActivity: number
  idLeadUnderwriter: number | null | string
  idUnderwriter: number | null | string
  idTechnicalAssistant: number | null | string
  idAccountType: number
  typeLogo: number | null
}

export interface AccountHistory {
  id: number
  effectiveDate: any
}

interface IDataBroker {
  active: boolean
  alias: string
  id: number
  name: string
}
export interface DoctoDto {
  type: string
  name: string
  base64: string
}

export interface UploadDoctoDto {
  idAccount: number
  idCDocto: number
  docto: DoctoDto
  idDocto?: number
  name?: string
}

export interface DeleteDoctoDto {
  idAccount: number
  idDocto: number
  fileName: string
}

export interface AccountDocumentFilters {
  idAccount: number
  idCDocto: number
}

export interface DocumentDto {
  id: number
  url: string
  name: string
  idCDocto: number
  idAccount: number
}
