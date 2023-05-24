import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'

export interface SecurityDto {
  id: number | null
  netPremiumat100: number | null
  share: number | null
  frontingFeeActive: boolean | null
  dynamicCommission: number | null
  frontingFee: number | null
  netReinsurancepremium: number | null
  taxes: number | null
  reinsuranceBrokerage: number | null
  receivedNetPremium: number | null
  distributedNetPremium: number | null
  difference: number | null
  active: boolean | null
  idCReinsuranceCompany: ReinsuranceCompanyDto | number
  idCRetroCedant: number | RetroCedantDto | null
  idCRetroCedantContact: number | RetroCedantContactDto | null
  idEndorsement: number | null
  idAccount: number | null
  isGross: boolean
}
