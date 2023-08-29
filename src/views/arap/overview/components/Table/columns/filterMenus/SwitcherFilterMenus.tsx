import { ReactElement } from "react"
import { EFieldColumn } from "../efieldColumn"

import FilterMenuAmount from "./FilterMenuAmount"
import FilterMenuCapabilityName from "./FilterMenuCapabilityName"
import FilterMenuStatus from "./FilterMenuStatus"
import FilterMenuTransaction from "./FilterMenuTransaction"
import FilterMenuTransactionDate from "./FilterMenuTransactionDate"
import FilterMenuTransactionId from "./FilterMenuTransactionId"

export interface IComponents {
  [key: string]: ReactElement
}

interface IFilterMenu {
  field: string,
  handleClose?: () => void,
}


export const SwitcherFilterMenus = ({ field, }: IFilterMenu) => {

  const FilterMenuComponents: IComponents = {
    [EFieldColumn.TRANSACTION_ID]: (
      <FilterMenuTransactionId />
    ),
    [EFieldColumn.CAPABILITY_NAME]: (
      <FilterMenuCapabilityName />
    ),
    [EFieldColumn.STATUS]: (
      <FilterMenuStatus />
    ),
    [EFieldColumn.TRANSACTION]: (
      <FilterMenuTransaction />
    ),
    [EFieldColumn.AMOUNT]: (
      <FilterMenuAmount />
    ),
    [EFieldColumn.TRANSACTION_DATE]: (
      <FilterMenuTransactionDate />
    ),

  }

  return FilterMenuComponents[field]
}
