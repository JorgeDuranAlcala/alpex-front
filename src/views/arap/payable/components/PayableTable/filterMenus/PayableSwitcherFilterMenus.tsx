import { ReactElement } from "react"
import { payableEFieldColumn } from "../payableEFieldColumn"

import FilterMenuInputText from "./FilterMenuInputText"
import FilterMenuReinsurer from "./FilterMenuReinsurer"

export interface IComponents {
  [key: string]: ReactElement
}

interface IFilterMenu {
  field: string,
  handleClose?: () => void,
}


export const PayableSwitcherFilterMenus = ({ field, handleClose }: IFilterMenu) => {

  const FilterMenuComponents: IComponents = {
    [payableEFieldColumn.CAPABILITY_NAME]: (
      <FilterMenuReinsurer 
        auxFilterText="Linked Biz." 
        handleClose={handleClose} 
      />
    ),
    [payableEFieldColumn.PERIOD_0_30]: (
      <FilterMenuInputText
        titleType="0-30"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.PERIOD_31_60]: (
      <FilterMenuInputText
        titleType="31-60"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.PERIOD_61_90]: (
      <FilterMenuInputText
        titleType="61-90"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.PERIOD_91_120]: (
      <FilterMenuInputText
        titleType="91-120"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.PERIOD_120]: (
      <FilterMenuInputText
        titleType="120+"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.TOTAL_DEBT]: (
      <FilterMenuInputText
        titleType="TOTAL DEBT"
        placeholder="Search amount"
        inputType="number"
        columnType={field}
        handleClose={handleClose}
      />
    ),
    [payableEFieldColumn.PAID_PERCENT]: (
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
