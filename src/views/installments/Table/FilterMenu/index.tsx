// ** Custom utilities

import { IStatus } from 'src/views/installments/Table/Status'
import { EFieldColumn } from 'src/views/installments/Table/Table'
import FilterMenuAccountId from './FilterMenuAccountId'
import FilterMenuBalanceDue from './FilterMenuBalanceDue'
import FilterMenuBroker from './FilterMenuBroker'
import FilterMenuEffectiveDate from './FilterMenuEffectiveDate'
import FilterMenuInstallmentId from './FilterMenuInstallmentId'
import FilterMenuInsured from './FilterMenuInsured'
import FilterMenuStatus from './FilterMenuStatus'

interface IFilterMenu {
  field: string
  handleClose?: () => void
}

const FilterMenu: React.FC<IFilterMenu> = ({ field }) => {
  const FilterMenuComponents: IStatus = {
    [EFieldColumn.idAccount]: <FilterMenuAccountId />,
    [EFieldColumn.idInstallment]: <FilterMenuInstallmentId />,
    [EFieldColumn.insured]: <FilterMenuInsured />,
    [EFieldColumn.status]: <FilterMenuStatus />,
    [EFieldColumn.broker]: <FilterMenuBroker />,
    [EFieldColumn.installment]: <FilterMenuStatus />,
    [EFieldColumn.dueDate]: <FilterMenuEffectiveDate />,
    [EFieldColumn.balanceDue]: <FilterMenuBalanceDue />
  }

  return FilterMenuComponents[field]
}

export default FilterMenu
