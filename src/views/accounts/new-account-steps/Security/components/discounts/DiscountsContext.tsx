import { createContext } from "react";

export interface IDiscountInputs {
  discountPercent: number;
  discountAmount: number;
}

export interface IUpdateDiscountByIndex {
  index: number;
  discountPercent: number;
  discountAmount: number;
}

interface DiscountContextProps {
  discountsList: IDiscountInputs[];
  addDiscount: () => void;
  removeDiscountByIndex: (index: number) => void;
  updateDiscountByIndex: ({ index, discountPercent, discountAmount }: IUpdateDiscountByIndex) => void;
  updateAllDiscounts: (allDiscounts: IDiscountInputs[]) => void;
}


export const DiscountsContext = createContext<DiscountContextProps>({} as DiscountContextProps);
