import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto'
import { RetroCedantContactDto } from '@/services/catalogs/dtos/retroCedantContact.dto'
import Decimal from 'decimal.js'
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
      premiumPerShare: new Decimal(+security.premiumPerShare).toNumber() || 0,
      netPremiumAt100: new Decimal(+security.netPremiumAt100).toNumber() || 0,
      share: new Decimal(+security.share).toNumber() || 0,
      frontingFeeActive: security.frontingFeeActive,
      dynamicCommission: new Decimal(+security.dynamicCommission).toNumber() || 0,
      frontingFee: new Decimal(+security.frontingFee).toNumber() || 0,
      netReinsurancePremium: new Decimal(+security.netReinsurancePremium).toNumber(),
      taxes: new Decimal(+security.taxes).toNumber() || 0,
      reinsuranceBrokerage: new Decimal(+security.reinsuranceBrokerage).toNumber() || 0,
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
          percentage: new Decimal(+discount.percentage).toNumber() || 0,
          amount: new Decimal(+discount.amount).toNumber() || 0,
          isChangeAmount: discount?.amount ? true : false,
          active: discount.active
        })),
      shareAmount: new Decimal(+security.shareAmount).toNumber() || 0,
      premiumPerShareAmount: new Decimal(+security.premiumPerShareAmount).toNumber() || 0,
      taxesActive: security.taxesActive,
      dynamicCommissionAmount: new Decimal(+security.dynamicCommissionAmount).toNumber() || 0,
      frontingFeeAmount: new Decimal(+security.frontingFeeAmount).toNumber() || 0,
      grossPremiumPerShare: new Decimal(+security.grossPremiumPerShare).toNumber() || 0,
      taxesAmount: new Decimal(+security.taxesAmount).toNumber() || 0,
      brokerAgeAmount: new Decimal(+security.brokerAgeAmount).toNumber() || 0,
      consecutive: security.consecutive,
      view: security.view,
      isGross: security.isGross,
      totalAmountOfDiscounts: new Decimal(+security.totalAmountOfDiscounts).toNumber() || 0,
      recievedNetPremium: 0,
      isChangeBrokerAgeAmount: security.brokerAgeAmount ? true : false,
      isChangeFrontingFeeAmount: security.frontingFeeAmount ? true : false,
      isChangeTaxesAmount: security.taxesAmount ? true : false,
      isChangeDynamicCommissionAmount: security.dynamicCommissionAmount ? true : false
    }
  }
}
