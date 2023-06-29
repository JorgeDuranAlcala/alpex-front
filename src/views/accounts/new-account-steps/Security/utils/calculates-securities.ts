import { FormInformation, SecurityDto } from '@/services/accounts/dtos/security.dto';

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
    } else
      this.baseAmount = this.security.isGross
        ? parseFloat(String(this.information.grossPremium))
        : parseFloat(String(this.information.netPremium))
    this.security.netPremiumAt100 = this.baseAmount

    return this
  }
  getPremierPerShare(): number {

    // console.log(this.security.totalAmountOfDiscounts);

    // debugger;

    // return (this.baseAmount * this.security.share) / 100;
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;

    } else {
      // * is Net Premium
      let result = (this.security.netPremiumAt100 * this.security.share) / 100;
      result = result - this.getTaxesAmount();
      result = result - (this.security.totalAmountOfDiscounts || 0);

      return result;
    }

  }
  getGrossPremierPerShare(): number {
    return (this.information.grossPremium * this.security.share) / 100;
  }
  getsharePercent(premiumPerShareAmount: number): number {
    return (premiumPerShareAmount / this.baseAmount) * 100
  }

  getBrokerAge(): number {
    return (this.security.reinsuranceBrokerage * this.security.premiumPerShareAmount) / 100
  }
  getBrokerAgePercent(reinsuranceBrokerage: number): number {
    return (reinsuranceBrokerage / this.security.premiumPerShareAmount) * 100
  }
  getDynamicComissionAmount(): number {
    return (this.security.dynamicCommission * this.security.premiumPerShareAmount) / 100
  }
  getDynamicComissionPercent(dynamicCommission: number): number {
    return (dynamicCommission * 100) / this.security.premiumPerShareAmount
  }
  getFrontingFeeAmount(valuePercent: number): number {
    // return (this.security.frontingFee * this.security.premiumPerShareAmount) / 100
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium
      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (base * valuePercent) / 100;
    }
  }
  getFrontingFeePercent(valueAmount: number): number {
    // return (frontingFee / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (valueAmount / base) * 100;

    }
  }
  getShareAmount(): number {
    return (this.information.limit * this.security.share) / 100;
  }

  getNetReinsurancePremium(): number {
    return (
      this.security.premiumPerShareAmount -
      this.security.dynamicCommissionAmount -
      this.security.frontingFeeAmount

      // this.security.brokerAgeAmount -
      // this.security.taxesAmount -
    )
  }
  getTaxesPercent(taxes: number): number {
    console.log('taxesPercent', { taxes })

    // return (taxes / this.security.premiumPerShareAmount) * 100
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (taxes / base) * 100;

    }
  }
  getTaxesAmount(value?: number): number {

    // return (this.security.taxes * this.security.premiumPerShareAmount) / 100
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium
      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (base * (value || this.security.taxes)) / 100;

    }
  }

  getDiscountPercent(valueAmount: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium

      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (valueAmount / base) * 100;

    }
  }
  getDiscountAmount(valuePercent: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      return 0;
    } else {
      // * is Net Premium
      const base = (this.security.netPremiumAt100 * this.security.share) / 100;

      return (base * valuePercent) / 100;

    }
  }

  static getData(securities: SecurityDto[], information: FormInformation) {
    let sharePercent = 0
    let shareAmount = 0
    let premiumPerShareAmount = 0
    let distributedNetPremium = 0

    for (const security of securities) {
      sharePercent += security.isGross ? 0 : security.share
      premiumPerShareAmount += security.isGross ? security.premiumPerShareAmount : 0
      shareAmount += security.isGross ? 0 : security.premiumPerShareAmount
      distributedNetPremium +=
        security.frontingFeeAmount +
        security.taxesAmount +
        security.dynamicCommissionAmount +
        security.brokerAgeAmount +
        security.netReinsurancePremium

    }

    return {
      recievedNetPremium: (information.netPremium * sharePercent) / 100 + premiumPerShareAmount,
      distribuitedNetPremium: distributedNetPremium,
      diference: (information.netPremium * sharePercent) / 100 - shareAmount
    }
  }
}
