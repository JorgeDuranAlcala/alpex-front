import { ReactElement } from "react"
import { EFieldColumn } from "../efieldColumn"

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
    [EFieldColumn.CLAIM_NUMBER]: (
      <FilterMenuTransactionId handleClose={handleClose} />
    ),
    [EFieldColumn.DATE]: (
      <div onClick={handleClose}>
        <FilterMenuTransactionDate />
      </div>
    ),
    [EFieldColumn.EXECUTIVE]: (
      <FilterMenuTransactionId handleClose={handleClose} />
    ),

  }

  return FilterMenuComponents[field]
}
