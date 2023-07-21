import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
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
  taxesActive: boolean
  dynamicCommissionAmount: number
  frontingFeeAmount: number
  grossPremiumPerShare: number
  taxesAmount: number
  brokerAgeAmount: number
  consecutive: number | null
  view: number
  isGross: boolean
  totalAmountOfDiscounts: number
  isChangeBrokerAgeAmount: boolean
  isChangeFrontingFeeAmount: boolean
  isChangeTaxesAmount: boolean
  isChangeDynamicCommissionAmount: boolean
}
export class SecurityMapper {
  static securityToSecurityForm(security: SecurityDto, idAccount: number): SecurityModel {
    return {
      id: security.id,
      premiumPerShare: Number(security.premiumPerShare) || 0,
      netPremiumAt100: Number(security.netPremiumAt100) || 0,
      share: Number(security.share) || 0,
      frontingFeeActive: security.frontingFeeActive,
      dynamicCommission: Number(security.dynamicCommission) || 0,
      frontingFee: Number(security.frontingFee) || 0,
      netReinsurancePremium: Number(security.netReinsurancePremium),
      taxes: Number(security.taxes) || 0,
      reinsuranceBrokerage: Number(security.reinsuranceBrokerage) || 0,
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
      idAccount: idAccount,
      receivedNetPremium: 0,
      distributedNetPremium: 0,
      difference: 0,
      discounts:
        security.discounts &&
        security.discounts.map(discount => ({
          percentage: Number(discount.percentage) || 0,
          amount: Number(discount.amount) || 0,
          isChangeAmount: false,
          active: discount.active
        })),
      shareAmount: Number(security.shareAmount) || 0,
      premiumPerShareAmount: Number(security.premiumPerShareAmount) || 0,
      taxesActive: security.taxesActive,
      dynamicCommissionAmount: Number(security.dynamicCommissionAmount) || 0,
      frontingFeeAmount: Number(security.frontingFeeAmount) || 0,
      grossPremiumPerShare: Number(security.grossPremiumPerShare) || 0,
      taxesAmount: Number(security.taxesAmount) || 0,
      brokerAgeAmount: Number(security.brokerAgeAmount) || 0,
      consecutive: security.consecutive,
      view: security.view,
      isGross: security.isGross,
      totalAmountOfDiscounts: Number(security.totalAmountOfDiscounts) || 0,
      recievedNetPremium: 0,
      isChangeBrokerAgeAmount: false,
      isChangeFrontingFeeAmount: false,
      isChangeTaxesAmount: false,
      isChangeDynamicCommissionAmount: false
    }
  }
}
