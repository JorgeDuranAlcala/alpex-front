import { OperationMapper } from '@/mappers/Operations.mapper'
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

      const result = new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()

      this.security.premiumPerShareAmount = result

      return result
    } else {
      // * is Net Premium
      const result = new OperationMapper(this.security.netPremiumAt100)
        .mul(this.security.share)
        .div(100)
        .sub(this.security.taxesAmount || 0)
        .sub(this.security.totalAmountOfDiscounts || 0)
        .toNumber()

      this.security.premiumPerShareAmount = result

      return result
    }
  }

  getGrossPremierPerShare(): number {
    // * is Gross Premium or  is Net Premium
    this.security.grossPremiumPerShare = this.security.isGross
      ? new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      : new OperationMapper(this.information.grossPremium).mul(this.security.share).div(100).toNumber()

    return this.security.grossPremiumPerShare
  }

  getsharePercent(premiumPerShareAmount: number): number {
    return new OperationMapper(premiumPerShareAmount).div(this.baseAmount).mul(100).toNumber()
  }

  getBrokerAge(): number {
    this.security.brokerAgeAmount = new OperationMapper(this.security.reinsuranceBrokerage)
      .mul(this.security.premiumPerShareAmount)
      .div(100)
      .toNumber()

    return this.security.brokerAgeAmount
  }

  getBrokerAgePercent(reinsuranceBrokerage: number): number {
    const result = new OperationMapper(reinsuranceBrokerage)
      .div(this.security.premiumPerShareAmount)
      .mul(100)
      .toNumber()

    return result
  }

  getDynamicComissionAmount(): number {
    this.security.dynamicCommissionAmount = new OperationMapper(this.security.dynamicCommission)
      .mul(this.security.premiumPerShareAmount)
      .div(100)
      .toNumber()

    return this.security.dynamicCommissionAmount
  }
  getDynamicComissionPercent(dynamicCommission: number): number {
    const percent = new OperationMapper(dynamicCommission).mul(100).div(this.security.premiumPerShareAmount).toNumber()

    return percent
  }
  getFrontingFeeAmount(valuePercent: number): number {
    // return (this.security.frontingFee * this.security.premiumPerShareAmount) / 100
    if (this.security.isGross) {
      // * is Gross Premium
      this.security.frontingFeeAmount = new OperationMapper(this.security.premiumPerShareAmount)
        .mul(valuePercent)
        .div(100)
        .toNumber()
    } else {
      // * is Net Premium
      this.security.frontingFeeAmount = new OperationMapper(this.security.premiumPerShareAmount)
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
      return new OperationMapper(valueAmount).mul(100).div(this.security.premiumPerShareAmount).toNumber()
    } else {
      // * is Net Premium
      return new OperationMapper(valueAmount).div(this.security.premiumPerShareAmount).mul(100).toNumber()
    }
  }
  getShareAmount(): number {
    this.security.shareAmount = new OperationMapper(this.information.limit).mul(this.security.share).div(100).toNumber()

    return this.security.shareAmount
  }

  getNetReinsurancePremium(): number {
    if (this.security.isGross) {
      // * is Gross Premium
      let sumOthers = new OperationMapper(this.security.dynamicCommissionAmount)
        .add(this.security.frontingFeeAmount ? this.security.frontingFeeAmount : 0)
        .add(this.security.brokerAgeAmount)
        .add(this.security.taxesAmount ? this.security.taxesAmount : 0)
        .add(this.security.totalAmountOfDiscounts ? this.security.totalAmountOfDiscounts : 0)

      /**
       * * IMPORTANT: @omar.lopez
       * EN Taxes existe una regla de negocio para el calculo de los impuestos
       * si en el formulario 1 esta activo y en el formulario 2 no se encuentra activo se utiliza el porcentaje del taxes
       * del formulario 1 y se aplica como si estuviera activo en el form2 esto para reaseguradoras que  utilizan el gross
       */
      if (this.security.taxesActive) {
        sumOthers = sumOthers.add(this.security.taxes)
      } else if (this.information.taxesP) {
        sumOthers = sumOthers.add(this.getTaxesAmount(this.information.taxesP))
      }

      this.security.netReinsurancePremium = new OperationMapper(this.security.premiumPerShareAmount)
        .sub(sumOthers.toNumber())
        .toNumber()
    } else {
      // * is Net Premium

      this.security.netReinsurancePremium = new OperationMapper(this.security.premiumPerShareAmount)
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

      let result = new OperationMapper(this.security.grossPremiumPerShare).sub(this.security.brokerAgeAmount).toNumber()

      result = new OperationMapper(taxes).div(result).mul(100).toNumber()

      return result
    } else {
      // * is Net Premium
      const base = new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()

      return new OperationMapper(taxes).div(base).mul(100).toNumber()
    }
  }

  getTaxesAmount(value?: number): number {
    let result = 0
    if (this.security.isGross) {
      // * is Gross Premium

      if (this.security.taxes || value) {
        result = new OperationMapper(this.security.grossPremiumPerShare).sub(this.security.brokerAgeAmount).toNumber()
        result = new OperationMapper(result)
          .mul(value ?? this.security.taxes)
          .div(100)
          .toNumber()
      }
    } else {
      // * is Net Premium

      if (this.security.taxes || value) {
        const base = new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
        result = new OperationMapper(base)
          .mul(value || this.security.taxes)
          .div(100)
          .toNumber()
      }
    }

    return result
  }

  getDiscountPercent(valueAmount: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = new OperationMapper(valueAmount).div(this.security.premiumPerShareAmount).mul(100).toNumber()

      return base
    } else {
      // * is Net Premium

      const base = new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      const result = new OperationMapper(valueAmount).div(base).mul(100).toNumber()

      return result
    }
  }
  getDiscountAmount(valuePercent: number): number {
    if (this.security.isGross) {
      // * is Gross Premium
      const base = new OperationMapper(this.security.premiumPerShareAmount).mul(valuePercent).div(100).toNumber()

      return base
    } else {
      // * is Net Premium

      const base = new OperationMapper(this.security.netPremiumAt100).mul(this.security.share).div(100).toNumber()
      const result = new OperationMapper(base).mul(valuePercent).div(100).toNumber()

      return result
    }
  }

  static getData(
    securities: SecurityDto[],
    resultSecuritiesOriginal: ResultSecurities = defaultValue,
    information: FormInformation = {} as FormInformation
  ): ResultSecurities {
    // let sharePercent = 0
    let premiumPerShareAmountNet = 0
    let premiumPerShareAmountGros = 0
    let distributedNetPremium = 0
    let taxesGros = 0
    let discountAmountGros = 0
    let brokerageReinsuranceGross = 0

    for (const security of securities) {
      const securityOperation = new CalculateSecurity().setInformation(information).setSecurity({
        ...security
      })

      // sharePercent += security.isGross ? 0 : security.share
      premiumPerShareAmountNet += security.isGross ? 0 : security.premiumPerShareAmount
      premiumPerShareAmountGros += security.isGross ? security.premiumPerShareAmount : 0

      /**
       * * IMPORTANT: @omar.lopez
       * EN Taxes existe una regla de negocio para el calculo de los impuestos
       * si en el formulario 1 esta activo y en el formulario 2 no se encuentra activo se utiliza el porcentaje del taxes
       * del formulario 1 y se aplica como si estuviera activo en el form2 esto para reaseguradoras que  utilizan el gross
       */
      if (security.isGross)
        if (security.taxesActive) {
          taxesGros += new OperationMapper(security.taxesAmount).toNumber()
        } else if (information.taxesP) {
          taxesGros += new OperationMapper(securityOperation.getTaxesAmount(information.taxesP)).toNumber()
        }

      brokerageReinsuranceGross += security.isGross ? new OperationMapper(security.brokerAgeAmount).toNumber() : 0
      distributedNetPremium += new OperationMapper(security.netReinsurancePremium)
        .add(security.dynamicCommissionAmount)
        .add(security.frontingFeeAmount ?? 0)
        .toNumber()
      discountAmountGros += security.isGross ? new OperationMapper(security.totalAmountOfDiscounts).toNumber() : 0
    }

    if (resultSecuritiesOriginal.distribuitedNetPremium > 0) {
      distributedNetPremium = resultSecuritiesOriginal.distribuitedNetPremium
    }

    const recievedNetPremium = new OperationMapper(premiumPerShareAmountNet)
      .add(
        new OperationMapper(premiumPerShareAmountGros)
          .sub(taxesGros)
          .sub(brokerageReinsuranceGross)
          .sub(discountAmountGros)
          .toNumber()
      )
      .toNumber()
    const diference = Math.abs(recievedNetPremium - distributedNetPremium)

    return {
      recievedNetPremium,
      distribuitedNetPremium: distributedNetPremium,
      diference
    }
  }
}
