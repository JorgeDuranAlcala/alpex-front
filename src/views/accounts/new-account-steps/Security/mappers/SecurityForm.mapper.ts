import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import { IAccountsState } from '@/types/apps/accountsTypes'
import { IDiscountInputs } from '../components/discounts/DiscountsContext'

export interface SecurityModel extends SecurityDto {
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
  idEndorsement: number
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
      id: security.id,
      premiumPerShare: Number(security.premiumPerShare),
      netPremiumAt100: Number(security.netPremiumAt100),
      share: Number(security.share),
      frontingFeeActive: security.frontingFeeActive,
      dynamicCommission: Number(security.dynamicCommission),
      frontingFee: Number(security.frontingFee) || 0,
      netReinsurancePremium: Number(security.netReinsurancePremium),
      taxes: Number(security.taxes) || 0,
      reinsuranceBrokerage: Number(security.reinsuranceBrokerage),
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
      idEndorsement: security.idEndorsement,
      idAccount: +accountData.formsData.form1.id,
      receivedNetPremium: 0,
      distributedNetPremium: 0,
      difference: 0,
      discounts: security.discounts.map(discount => ({
        percentage: Number(discount.percentage),
        amount: Number(discount.amount),
        active: discount.active
      })),
      shareAmount: Number(security.shareAmount),
      premiumPerShareAmount: Number(security.premiumPerShareAmount),
      taxesActive: security.taxesActive,
      dynamicCommissionAmount: Number(security.dynamicCommissionAmount),
      frontingFeeAmount: Number(security.frontingFeeAmount),
      grossPremiumPerShare: Number(security.grossPremiumPerShare) || 0,
      taxesAmount: Number(security.taxesAmount),
      brokerAgeAmount: Number(security.brokerAgeAmount),
      consecutive: security.consecutive,
      view: security.view,
      isGross: security.isGross,
      totalAmountOfDiscounts: Number(security.totalAmountOfDiscounts),
      recievedNetPremium: 0
    }
  }
}
