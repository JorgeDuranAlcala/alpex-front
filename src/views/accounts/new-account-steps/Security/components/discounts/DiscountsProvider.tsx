import { ReactNode, useState } from 'react'
import { DiscountsContext, IDiscountInputs, IUpdateDiscountByIndex } from './DiscountsContext'

export const DiscountsProvider = ({ children }: { children: ReactNode }) => {
  const [discountsList, setDiscountsList] = useState<IDiscountInputs[]>([])

  const addDiscount = () => {
    let tempPercentTotalDiscount = 0
    for (const discount of discountsList) {
      tempPercentTotalDiscount += discount.discountPercent
    }
    if (tempPercentTotalDiscount < 100)
      setDiscountsList(prev => [
        ...prev,
        {
          discountPercent: 0,
          discountAmount: 0
        }
      ])
  }

  const removeDiscountByIndex = (index: number) => {
    const newDiscounts = [...discountsList.slice(0, index).concat(discountsList.slice(index + 1))]

    // console.log({ index, discountsList, newDiscounts })
    // debugger;

    setDiscountsList(newDiscounts)
  }

  const updateDiscountByIndex = ({ index, discountPercent, discountAmount }: IUpdateDiscountByIndex) => {
    setDiscountsList(prev => {
      const newDiscounts = [...prev]
      newDiscounts[index] = {
        discountPercent,
        discountAmount
      }

      return newDiscounts
    })
  }

  const updateAllDiscounts = (allDiscounts: IDiscountInputs[]) => {
    setDiscountsList(allDiscounts)
  }

  return (
    <DiscountsContext.Provider
      value={{
        discountsList,
        addDiscount,
        updateDiscountByIndex,
        removeDiscountByIndex,
        updateAllDiscounts
      }}
    >
      {children}
    </DiscountsContext.Provider>
  )
}
