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
        auxFilterText="Amount Received"
        placeholder="Search amount"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.AMOUNT_PAID]: (
      <FilterMenuInputText
        auxFilterText="Amount Paid"
        placeholder="Search amount"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.TRANSACTION_ID]: (
      <FilterMenuInputText
        auxFilterText="Ref ID"
        placeholder="Search by Transaction ID"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.DEPOSIT_ACC]: (
      <FilterMenuInputText
        auxFilterText="Deposit Acct"
        placeholder="Search by Deposit Account"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.ORIGIN_ACCT]: (
      <FilterMenuInputText
        auxFilterText="Origin Acct"
        placeholder="Search by Origin Account"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.INST]: (
      <FilterMenuInputText
        auxFilterText="Inst"
        placeholder="Search by Installment"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.CAPABILITY_NAME]: 
      filterType === 'broker' ? 
        <FilterMenuBroker 
          auxFilterText="Capability Name" 
          detailsType={detailsType} 
          handleClose={handleClose} 
        />
      : filterType === 'reinsurer' ? 
        <FilterMenuReinsurer 
          auxFilterText="Capability Name" 
          detailsType={detailsType} 
          handleClose={handleClose} 
        />
      : <></>
    ,
    [EFieldColumn.BROKER]: (
      <FilterMenuBroker detailsType={detailsType} handleClose={handleClose} />
    ),
    [EFieldColumn.ACCOUNT]: (
      <FilterMenuInputText
      auxFilterText="Account"
        placeholder="Search by Account"
        columnType={field}
        detailsType={detailsType}
        handleClose={handleClose}
      />
    ),
    [EFieldColumn.USER]: (
      <FilterMenuInputText
        auxFilterText="User"
        placeholder="Search by User"
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
