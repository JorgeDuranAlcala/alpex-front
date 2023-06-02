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
  netPremium: number
  grossPremium: number
  idAccount: number
  idCountry: number
  idBroker: number
  idBrokerContact: number | null
  idCedant: number
  idCedantContact: number | null
  idLineOfBussines: number
  idTypeOfLimit: number | null
  idRiskActivity: number
  idLeadUnderwriter: number
  idUnderwriter: number
  idTechnicalAssistant: number
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
