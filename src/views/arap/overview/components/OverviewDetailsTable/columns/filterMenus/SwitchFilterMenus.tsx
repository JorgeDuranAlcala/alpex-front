import { ReactElement } from "react"
import { EFieldColumn } from "../efieldColumn"

import FilterMenuBroker from "./FilterMenuBroker"
import FilterMenuCapabilityName from "./FilterMenuCapabilityName"
import FilterMenuDate from "./FilterMenuDate"
import FilterMenuInputText from "./FilterMenuInputText"

import { DetailsType } from '../../../../interfaces/overview/DetailsType'

export interface IComponents {
  [key: string]: ReactElement
}

interface IFilterMenu {
  detailsType: DetailsType;
  field: string;
  handleClose?: () => void;
}


export const SwitcherFilterMenus = ({ detailsType, field, handleClose }: IFilterMenu) => {

  const FilterMenuComponents: IComponents = {

    [EFieldColumn.AMOUNT_RECEIVED]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.AMOUNT_PAID]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.TRANSACTION_ID]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.DEPOSIT_ACC]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.ORIGIN_ACCT]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.INST]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.CAPABILITY_NAME]: (
      <div onClick={handleClose}>
        <FilterMenuCapabilityName detailsType={detailsType} />
      </div>
    ),
    [EFieldColumn.BROKER]: (
      <FilterMenuBroker detailsType={detailsType} handleClose={handleClose} />
    ),
    [EFieldColumn.ACCOUNT]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.USER]: (
      <FilterMenuInputText
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.PMT_DATE]: (
      <FilterMenuDate
        auxFilterText="Payment Date"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),


  }

  return FilterMenuComponents[field]
}
