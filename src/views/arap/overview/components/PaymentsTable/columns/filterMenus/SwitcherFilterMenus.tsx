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


export const SwitcherFilterMenus = ({ field, handleClose }: IFilterMenu) => {

  const FilterMenuComponents: IComponents = {
    [EFieldColumn.TRANSACTION_ID]: (
      <FilterMenuTransactionId handleClose={handleClose} />
    ),
    [EFieldColumn.CAPABILITY_NAME]: (
      <FilterMenuCapabilityName handleClose={handleClose} />
    ),
    [EFieldColumn.STATUS]: (
      <div onClick={handleClose}>
        <FilterMenuStatus />
      </div>
    ),
    [EFieldColumn.TRANSACTION]: (
      <div onClick={handleClose}>
        <FilterMenuTransaction />
      </div>
    ),
    [EFieldColumn.AMOUNT]: (
      <FilterMenuAmount handleClose={handleClose} />
    ),
    [EFieldColumn.TRANSACTION_DATE]: (
      <div onClick={handleClose}>
        <FilterMenuTransactionDate />
      </div>
    ),

  }

  return FilterMenuComponents[field]
}
