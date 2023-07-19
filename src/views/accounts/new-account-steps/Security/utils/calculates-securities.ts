import { FormInformation, SecurityDto } from '@/services/accounts/dtos/security.dto'

export type ResultSecurities = {
  recievedNetPremium: number
  distribuitedNetPremium: number
  diference: number
}
export const defaultValue = {
  recievedNetPremium: 0,
  distribuitedNetPremium: 0,
  diference: 0
}
export class CalculateSecurity {
  private baseAmount = 0
  private security: SecurityDto = {} as SecurityDto
  private information: FormInformation = {} as FormInformation

  setInformation(information: FormInformation) {
    this.information = information

    return this
  }
  setSecurity(security: SecurityDto) {
    this.security = security

    if (this.security.netPremiumAt100) {
      this.security.netPremiumAt100 = this.security.netPremiumAt100
      this.baseAmount = this.security.netPremiumAt100
    } else if (this.security.netPremiumAt100 === undefined) {
      this.baseAmount = this.security.isGross
        ? parseFloat(String(this.information.grossPremium))
        : parseFloat(String(this.information.netPremium))
    }
    this.security.netPremiumAt100 = this.baseAmount

    return this
  }
  getPremierPerShare(): number {
    if (this.security.isGross) {
      // * is Gross Premium

      const result = (this.security.netPremiumAt100 * this.security.share) / 100
      this.security.premiumPerShareAmount = result

      return result
    } else {
      // * is Net Premium
      let result = (this.security.netPremiumAt100 * this.security.share) / 100
      result = result - this.getTaxesAmount()
      result = result - (this.security.totalAmountOfDiscounts || 0)
      this.security.premiumPerShareAmount = result

      return result
    }
  }

  getGrossPremierPerShare(): number {
    // * is Gross Premium or  is Net Premium
    this.security.grossPremiumPerShare = this.security.isGross
      ? (this.security.netPremiumAt100 * this.security.share) / 100
      : (this.information.grossPremium * this.security.share) / 100

    return this.security.grossPremiumPerShare
  }

  getsharePercent(premiumPerShareAmount: number): number {
    return (premiumPerShareAmount / this.baseAmount) * 100
  }

  getBrokerAge(): number {
    this.security.brokerAgeAmount = Number(
      ((this.security.reinsuranceBrokerage * this.security.premiumPerShareAmount) / 100).toPrecision(13)
    )

    return this.security.brokerAgeAmount
  }

  getBrokerAgePercent(reinsuranceBrokerage: number): number {
    const result = Number(((reinsuranceBrokerage / this.security.premiumPerShareAmount) * 100).toPrecision(13))

    return result
  }

  getDynamicComissionAmount(): number {
    this.security.dynamicCommissionAmount = Number(
      ((this.security.dynamicCommission * this.security.premiumPerShareAmount) / 100).toPrecision(13)
    )

    return this.security.dynamicCommissionAmount
  }
  getDynamicComissionPercent(dynamicCommission: number): number {
    const percent = (dynamicCommission * 100) / this.security.premiumPerShareAmount

    return Number(percent.toPrecision(13))
  }
  getFrontingFeeAmount(valuePercent: number): number {
    // return (this.security.frontingFee * this.security.premiumPerShareAmount) / 100
    if (this.security.isGross) {
      // * is Gross Premium
      this.security.frontingFeeAmount = (this.security.premiumPerShareAmount * valuePercent) / 100
    } else {
      // * is Net Premium
      this.security.frontingFeeAmount = (this.security.premiumPerShareAmount * valuePercent) / 100
    }

    return this.security.frontingFeeAmount
  }
  getFrontingFeePercent(valueAmount: number): number {
    // return (frontingFee / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium
      const base = (valueAmount / this.security.premiumPerShareAmount) * 100

      return base
    } else {
      // * is Net Premium

      return (valueAmount / this.security.premiumPerShareAmount) * 100
    }
  }
  getShareAmount(): number {
    this.security.shareAmount = (this.information.limit * this.security.share) / 100

    return this.security.shareAmount
  }

  getNetReinsurancePremium(): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const sumOthers =
        this.security.dynamicCommissionAmount +
        (this.security.frontingFeeAmount ? this.security.frontingFeeAmount : 0) +
        this.security.brokerAgeAmount +
        (this.security.taxesAmount ? this.security.taxesAmount : 0) +
        (this.security.totalAmountOfDiscounts ? this.security.totalAmountOfDiscounts : 0)

      this.security.netReinsurancePremium = Number((this.security.premiumPerShareAmount - sumOthers).toPrecision(6))
    } else {
      // * is Net Premium

      this.security.netReinsurancePremium =
        this.security.premiumPerShareAmount -
        this.security.dynamicCommissionAmount -
        (this.security.frontingFeeActive ? this.security.frontingFeeAmount : 0)
    }

    return this.security.netReinsurancePremium
  }

  getTaxesPercent(taxes: number): number {
    // return (taxes / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium
      let result = this.security.grossPremiumPerShare - this.security.reinsuranceBrokerage

      result = (result / taxes) * 100

      return result
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100

      return (taxes / base) * 100
    }
  }

  getTaxesAmount(value?: number): number {
    if (this.security.isGross) {
      // * is Gross Premium

      let result = this.security.grossPremiumPerShare - this.security.brokerAgeAmount

      if (this.security.taxes || value) {
        result = (result * (value ?? this.security.taxes)) / 100
      } else {
        result = 0
      }
      this.security.taxesAmount = result
    } else {
      // * is Net Premium
      const base = (this.security.netPremiumAt100 * this.security.share) / 100
      if (this.security.taxes || value) {
        this.security.taxesAmount = (base * (value || this.security.taxes)) / 100
      } else {
        this.security.taxesAmount = 0
      }
    }

    return this.security.taxesAmount
  }

  getDiscountPercent(valueAmount: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = (this.security.premiumPerShareAmount / valueAmount) * 100

      return base
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100
      const result = (valueAmount / base) * 100

      return result
    }
  }
  getDiscountAmount(valuePercent: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = (this.security.premiumPerShareAmount * valuePercent) / 100

      return base
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100
      const result = (base * valuePercent) / 100

      return result
    }
  }

  static getData(
    securities: SecurityDto[],
    resultSecuritiesOriginal: ResultSecurities = defaultValue
  ): ResultSecurities {
    // let sharePercent = 0
    let premiumPerShareAmountNet = 0
    let premiumPerShareAmountGros = 0
    let distributedNetPremium = 0
    let taxesGros = 0
    let discountAmountGros = 0
    let brokerageReinsuranceGross = 0

    for (const security of securities) {
      // sharePercent += security.isGross ? 0 : security.share
      premiumPerShareAmountNet += security.isGross ? 0 : security.premiumPerShareAmount
      premiumPerShareAmountGros += security.isGross ? security.premiumPerShareAmount : 0
      taxesGros += security.isGross ? security.taxesAmount : 0
      brokerageReinsuranceGross += security.isGross ? security.brokerAgeAmount : 0
      distributedNetPremium +=
        security.netReinsurancePremium + security.dynamicCommissionAmount + security.frontingFeeAmount ?? 0
      discountAmountGros += security.isGross ? security.totalAmountOfDiscounts : 0
    }

    if (resultSecuritiesOriginal.distribuitedNetPremium > 0) {
      distributedNetPremium = resultSecuritiesOriginal.distribuitedNetPremium
    }

    const recievedNetPremium =
      premiumPerShareAmountNet +
      (premiumPerShareAmountGros - taxesGros - brokerageReinsuranceGross - discountAmountGros)
    const diference = Math.abs(recievedNetPremium - distributedNetPremium)

    return {
      recievedNetPremium,
      distribuitedNetPremium: distributedNetPremium,
      diference
    }
  }
}
