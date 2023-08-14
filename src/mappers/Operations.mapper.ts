import { Decimal } from 'decimal.js'

export class OperationMapper {
  private baseNumber
  constructor(baseNumber: number) {
    this.baseNumber = baseNumber
  }
  add(addNumber: number) {
    this.baseNumber = new Decimal(this.baseNumber).add(addNumber).toNumber()

    return this
  }
  div(addNumber: number) {
    this.baseNumber = new Decimal(this.baseNumber).div(addNumber).toNumber()

    return this
  }
  mul(addNumber: number) {
    this.baseNumber = new Decimal(this.baseNumber).mul(addNumber).toNumber()

    return this
  }
  sub(addNumber: number) {
    this.baseNumber = new Decimal(this.baseNumber).sub(addNumber).toNumber()

    return this
  }
  toNumber() {
    return this.baseNumber
  }
}
