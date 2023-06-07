import { FormInfo, SecurityDto } from '@/services/accounts/dtos/security.dto'

export class SecurityForm {
  static securityToSecurityForm(security: SecurityDto): FormInfo {
    return {
      id: security.id,
      brokerAgePercent: security.reinsuranceBrokerage,
      taxesPercent: security.taxes,
      isGross: security.isGross || false,
      netPremium: security.netPremiumAt100,
      frontingFeePercent: security.frontingFee,
      dynamicComissionPercent: security.dynamicCommission,
      sharePercent: security.share,
      netInsurancePremium: security.netReinsurancePremium,
      reinsuranceCompany: security.idCReinsuranceCompany.id,
      retroCedant: security.idCRetroCedant.id,
      retroCedantContact: security.idCRetroCedantContact.id,
      hasFrontingFee: security.frontingFeeActive || false,
      brokerAge: 0,
      contactCountry: security.idCRetroCedantContact.id,
      contactEmail: security.idCRetroCedantContact?.email,
      contactPhone: security.idCRetroCedantContact?.phone,
      dynamicComission: 0,
      frontingFee: 0,
      premiumPerShare: 0,
      taxes: 0
    }
  }
}
