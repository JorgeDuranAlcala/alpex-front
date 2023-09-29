import { ReactElement } from "react"
import { EFieldColumn, FilterType } from "../efieldColumn"

import FilterMenuBroker from "./FilterMenuBroker"
import FilterMenuDate from "./FilterMenuDate"
import FilterMenuInputText from "./FilterMenuInputText"

import { DetailsType } from '../../../../interfaces/overview/DetailsType'
import FilterMenuReinsurer from "./FilterMenuReinsurer"

export interface IComponents {
  [key: string]: ReactElement
}

interface IFilterMenu {
  detailsType: DetailsType;
  field: string;
  filterType?: FilterType;
  handleClose?: () => void;
}


export const SwitcherFilterMenus = ({ detailsType, field, filterType, handleClose }: IFilterMenu) => {

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
    [EFieldColumn.CAPABILITY_NAME]: 
      filterType === 'broker' ? 
      <FilterMenuBroker detailsType={detailsType} handleClose={handleClose} />
      : filterType === 'reinsurer' ? 
      <FilterMenuReinsurer detailsType={detailsType} handleClose={handleClose} />
      : <></>
    ,
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
