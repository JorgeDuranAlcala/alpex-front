import { FormInformation, SecurityDto } from '@/services/accounts/dtos/security.dto'
import Decimal from 'decimal.js'

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

      const result = new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()

      this.security.premiumPerShareAmount = result

      return result
    } else {
      // * is Net Premium
      const result = new Decimal(this.security.netPremiumAt100)
        .mul(this.security.share)
        .div(100)
        .sub(this.getTaxesAmount())
        .sub(this.security.totalAmountOfDiscounts || 0)
        .toNumber()

      this.security.premiumPerShareAmount = result

      return result
    }
  }

  getGrossPremierPerShare(): number {
    // * is Gross Premium or  is Net Premium
    this.security.grossPremiumPerShare = this.security.isGross
      ? new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      : new Decimal(this.information.grossPremium).mul(this.security.share).div(100).toNumber()

    return this.security.grossPremiumPerShare
  }

  getsharePercent(premiumPerShareAmount: number): number {
    return new Decimal(premiumPerShareAmount).div(this.baseAmount).mul(100).toNumber()
  }

  getBrokerAge(): number {
    this.security.brokerAgeAmount = new Decimal(this.security.reinsuranceBrokerage)
      .mul(this.security.premiumPerShareAmount)
      .div(100)
      .toNumber()

    return this.security.brokerAgeAmount
  }

  getBrokerAgePercent(reinsuranceBrokerage: number): number {
    const result = new Decimal(reinsuranceBrokerage).div(this.security.premiumPerShareAmount).mul(100).toNumber()

    return result
  }

  getDynamicComissionAmount(): number {
    this.security.dynamicCommissionAmount = new Decimal(this.security.dynamicCommission)
      .mul(this.security.premiumPerShareAmount)
      .div(100)
      .toNumber()

    return this.security.dynamicCommissionAmount
  }
  getDynamicComissionPercent(dynamicCommission: number): number {
    const percent = new Decimal(dynamicCommission).mul(100).div(this.security.premiumPerShareAmount).toNumber()

    return percent
  }
  getFrontingFeeAmount(valuePercent: number): number {
    // return (this.security.frontingFee * this.security.premiumPerShareAmount) / 100
    if (this.security.isGross) {
      // * is Gross Premium
      this.security.frontingFeeAmount = new Decimal(this.security.premiumPerShareAmount)
        .mul(valuePercent)
        .div(100)
        .toNumber()
    } else {
      // * is Net Premium
      this.security.frontingFeeAmount = new Decimal(this.security.premiumPerShareAmount)
        .mul(valuePercent)
        .div(100)
        .toNumber()
    }

    return this.security.frontingFeeAmount
  }
  getFrontingFeePercent(valueAmount: number): number {
    // return (frontingFee / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium
      return new Decimal(valueAmount).div(this.security.premiumPerShareAmount).mul(100).toNumber()
    } else {
      // * is Net Premium

      return new Decimal(valueAmount).div(this.security.premiumPerShareAmount).mul(100).toNumber()
    }
  }
  getShareAmount(): number {
    this.security.shareAmount = new Decimal(this.information.limit).mul(this.security.share).div(100).toNumber()

    return this.security.shareAmount
  }

  getNetReinsurancePremium(): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const sumOthers = new Decimal(this.security.dynamicCommissionAmount)
        .add(this.security.frontingFeeAmount ? this.security.frontingFeeAmount : 0)
        .add(this.security.brokerAgeAmount)
        .add(this.security.taxesAmount ? this.security.taxesAmount : 0)
        .add(this.security.totalAmountOfDiscounts ? this.security.totalAmountOfDiscounts : 0)
        .toNumber()

      this.security.netReinsurancePremium = new Decimal(this.security.premiumPerShareAmount).sub(sumOthers).toNumber()
    } else {
      // * is Net Premium

      this.security.netReinsurancePremium = new Decimal(this.security.premiumPerShareAmount)
        .sub(this.security.dynamicCommissionAmount)
        .sub(this.security.frontingFeeActive ? this.security.frontingFeeAmount : 0)
        .toNumber()
    }

    return this.security.netReinsurancePremium
  }

  getTaxesPercent(taxes: number): number {
    // return (taxes / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium

      let result = new Decimal(this.security.grossPremiumPerShare).sub(this.security.brokerAgeAmount).toNumber()

      result = new Decimal(taxes).div(result).mul(100).toNumber()

      return result
    } else {
      // * is Net Premium
      const base = new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()

      return new Decimal(taxes).div(base).mul(100).toNumber()
    }
  }

  getTaxesAmount(value?: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      let result = new Decimal(this.security.grossPremiumPerShare).sub(this.security.brokerAgeAmount).toNumber()

      if (this.security.taxes || value) {
        result = new Decimal(result)
          .mul(value ?? this.security.taxes)
          .div(100)
          .toNumber()
      } else {
        result = 0
      }
      this.security.taxesAmount = result
    } else {
      // * is Net Premium
      const base = new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()

      if (this.security.taxes || value) {
        this.security.taxesAmount = new Decimal(base)
          .mul(value || this.security.taxes)
          .div(100)
          .toNumber()
      } else {
        this.security.taxesAmount = 0
      }
    }

    return this.security.taxesAmount
  }

  getDiscountPercent(valueAmount: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = new Decimal(valueAmount).div(this.security.premiumPerShareAmount).mul(100).toNumber()

      return base
    } else {
      // * is Net Premium

      const base = new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      const result = new Decimal(valueAmount).div(base).mul(100).toNumber()

      return result
    }
  }
  getDiscountAmount(valuePercent: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = new Decimal(this.security.premiumPerShareAmount).mul(valuePercent).div(100).toNumber()

      return base
    } else {
      // * is Net Premium

      const base = new Decimal(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      const result = new Decimal(base).mul(valuePercent).div(100).toNumber()

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
