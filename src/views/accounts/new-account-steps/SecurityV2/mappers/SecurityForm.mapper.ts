import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { IAccountsState } from '@/types/apps/accountsTypes'
import { IDiscountInputs } from '../context/discounts/DiscountsContext'

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
  idCRetroCedant: RetroCedantDto | null
  idCRetroCedantContact: RetroCedantContactDto | null
  idEndorsement: number | undefined
  idAccount: number
  receivedNetPremium: number
  distributedNetPremium: number
  difference: number
  discounts: IDiscountInputs[]
  idCReinsuranceCompanyBinder: ReinsuranceCompanyBinderDto | null

  shareAmount: number

  premiumPerShareAmount: number
  taxesActive: boolean | null
  dynamicCommissionAmount: number
  frontingFeeAmount: number
  grossPremiumPerShare: number
  taxesAmount: number
  brokerAgeAmount: number
  consecutive: number | null
  view: number
  isGross: boolean
  totalAmountOfDiscounts: number
}
export class SecurityMapper {
  static securityToSecurityForm(security: SecurityDto, accountData: IAccountsState): SecurityModel {
    return {
      netPremiumAt100: security.netPremiumAt100,
      share: security.share,
      frontingFeeActive: security.frontingFeeActive,
      dynamicCommission: security.dynamicCommission,
      frontingFee: Number(security.frontingFee) || 0,
      netReinsurancePremium: security.netReinsurancePremium,
      taxes: Number(security.taxes) || 0,
      reinsuranceBrokerage: security.reinsuranceBrokerage,
      active: true,
      idCReinsuranceCompany: security.idCReinsuranceCompany,
      idCRetroCedant:
        security.idCRetroCedant && security.idCRetroCedant.hasOwnProperty('id') ? security.idCRetroCedant : null,
      idCRetroCedantContact:
        security.idCRetroCedantContact && security.idCRetroCedantContact.hasOwnProperty('id')
          ? security.idCRetroCedantContact
          : null,
      idCReinsuranceCompanyBinder:
        security.idCReinsuranceCompanyBinder && security.idCReinsuranceCompanyBinder.hasOwnProperty('id')
          ? security.idCReinsuranceCompanyBinder
          : null,
      idEndorsement: undefined,
      idAccount: +accountData.formsData.form1.id,
      receivedNetPremium: 0,
      distributedNetPremium: 0,
      difference: 0,
      discounts: security.discounts.map(discount => ({
        percentage: discount.percentage,
        amount: discount.amount,
        active: discount.active
      })),
      shareAmount: security.shareAmount,
      premiumPerShareAmount: security.premiumPerShareAmount,
      taxesActive: security.taxesActive,
      dynamicCommissionAmount: security.dynamicCommissionAmount,
      frontingFeeAmount: security.frontingFeeAmount,
      grossPremiumPerShare: security.grossPremiumPerShare || 0,
      taxesAmount: security.taxesAmount,
      brokerAgeAmount: security.brokerAgeAmount,
      consecutive: security.consecutive,
      view: security.view,
      isGross: security.isGross,
      totalAmountOfDiscounts: security.totalAmountOfDiscounts
    }
  }
}
