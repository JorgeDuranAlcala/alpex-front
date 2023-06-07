import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { IAccountsState } from '@/types/apps/accountsTypes'

export interface SecurityModel {
  netPremiumAt100: number
  share: number
  frontingFeeActive: boolean
  dynamicCommission: number
  frontingFee: number
  netReinsurancePremium: number
  taxes: number
  reinsuranceBrokerage: number
  active: boolean
  idCReinsuranceCompany: ReinsuranceCompanyDto
  idCRetroCedant: RetroCedantDto
  idCRetroCedantContact: RetroCedantContactDto
  idEndorsement: number | undefined
  idAccount: number
  receivedNetPremium: number
  distributedNetPremium: number
  difference: number
}
export class SecurityMapper {
  static securityToSecurityForm(security: SecurityDto, accountData: IAccountsState): SecurityModel {
    return {
      netPremiumAt100: security.netPremiumAt100,
      share: security.share,
      frontingFeeActive: security.frontingFeeActive,
      dynamicCommission: security.dynamicCommission,
      frontingFee: security.frontingFee,
      netReinsurancePremium: security.netReinsurancePremium,
      taxes: security.taxes,
      reinsuranceBrokerage: security.reinsuranceBrokerage,
      active: true,
      idCReinsuranceCompany: security.idCReinsuranceCompany,
      idCRetroCedant: security.idCRetroCedant,
      idCRetroCedantContact: security.idCRetroCedantContact,
      idEndorsement: undefined,
      idAccount: +accountData.formsData.form1.id,
      receivedNetPremium: 0,
      distributedNetPremium: 0,
      difference: 0
    }
  }
}
