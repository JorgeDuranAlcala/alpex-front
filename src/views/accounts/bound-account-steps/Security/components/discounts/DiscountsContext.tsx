import { createContext } from 'react'

export interface IDiscountInputs {
  id?: number
  idSecurity?: number
  percentage: number
  amount: number
  isChangeAmount: boolean
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IUpdateDiscountByIndex {
  index: number
  percentage: number
  amount?: number
}

interface DiscountContextProps {
  discountsList: IDiscountInputs[]
  addDiscount: () => void
  removeDiscountByIndex: (index: number) => void
  updateDiscountByIndex: ({ index, percentage, amount }: IUpdateDiscountByIndex) => void
  updateAllDiscounts: (allDiscounts: IDiscountInputs[]) => void
}

export const DiscountsContext = createContext<DiscountContextProps>({} as DiscountContextProps)
