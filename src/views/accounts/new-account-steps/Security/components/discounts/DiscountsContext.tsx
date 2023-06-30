import { createContext } from "react";

export interface IDiscountInputs {
  percentage: number;
  amount: number;
}

export interface IUpdateDiscountByIndex {
  index: number;
  percentage: number;
  amount: number;
}

interface DiscountContextProps {
  discountsList: IDiscountInputs[];
  addDiscount: () => void;
  removeDiscountByIndex: (index: number) => void;
  updateDiscountByIndex: ({ index, percentage, amount }: IUpdateDiscountByIndex) => void;
  updateAllDiscounts: (allDiscounts: IDiscountInputs[]) => void;
}


export const DiscountsContext = createContext<DiscountContextProps>({} as DiscountContextProps);
