import { useContext, useState } from "react";
import { SecurityContext } from "../SecurityView";
import { DiscountsContext } from "../components/discounts/DiscountsContext";


interface CheckIsPercentageAchievedProps {
  formIndex: number,
  message?: string

}

export const usePercentageAchieved = (limitPercentage = 100) => {

  const { securities } = useContext(SecurityContext);
  const { discountsList } = useContext(DiscountsContext)
  const [achievedMessageError, setAchievedMessageError] = useState<string>('');

  const checkIsPercentageAchieved = ({ formIndex, message = 'Discount must be less than 100%' }: CheckIsPercentageAchievedProps) => {
    const totalPercentOfDiscounts = discountsList.reduce((value, current) => {
      value += current.percentage

      return value
    }, 0)

    const taxesPercent = securities[formIndex].taxes;
    const frontingFeePercent = securities[formIndex].frontingFee;
    const totalPercents = totalPercentOfDiscounts + taxesPercent + frontingFeePercent;

    return totalPercents > limitPercentage ? setAchievedMessageError(message) : setAchievedMessageError('')
  }


  return {
    achievedMessageError,
    checkIsPercentageAchieved
  }

}
