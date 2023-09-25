import { ReactElement } from "react"
import { receivableEFieldColumn } from "../receivableEFieldColumn"

import FilterMenuInputText from "./FilterMenuInputText"

export interface IComponents {
  [key: string]: ReactElement
}

interface IFilterMenu {
  field: string,
  handleClose?: () => void,
}


export const ReceivableSwitcherFilterMenus = ({ field, handleClose }: IFilterMenu) => {

  const FilterMenuComponents: IComponents = {
    [receivableEFieldColumn.CAPABILITY_NAME]: (
      <FilterMenuInputText
        titleType="Linked Biz."
        placeholder="Search by Linked Biz."
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PERIOD_0_30]: (
      <FilterMenuInputText
        titleType="0-30"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PERIOD_31_60]: (
      <FilterMenuInputText
        titleType="31-60"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PERIOD_61_90]: (
      <FilterMenuInputText
        titleType="61-90"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PERIOD_91_120]: (
      <FilterMenuInputText
        titleType="91-120"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PERIOD_120]: (
      <FilterMenuInputText
        titleType="120+"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.TOTAL_DEBT]: (
      <FilterMenuInputText
        titleType="TOTAL DEBT"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [receivableEFieldColumn.PAID_PERCENT]: (
      <FilterMenuInputText
        titleType="% PAID"
        placeholder="Search paid percentage"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),

  }

  return FilterMenuComponents[field]
}
