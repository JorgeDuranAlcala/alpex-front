// ** Custom utilities

import { IStatus } from 'src/views/broker-tracker/Table/Status'
import { EFieldColumn } from 'src/views/broker-tracker/Table/Table'
import FilterMenuAccountDebt from './FilterMenuAccountDebt'
import FilterMenuAccountId from './FilterMenuAccountId'
import FilterMenuInstallment from './FilterMenuInstallment'
import FilterMenuInsured from './FilterMenuInsured'

interface IFilterMenu {
  field: string
  handleClose?: () => void
}

const FilterMenu: React.FC<IFilterMenu> = ({ field }) => {
  const FilterMenuComponents: IStatus = {
    [EFieldColumn.idAccount]: <FilterMenuAccountId />,
    [EFieldColumn.insured]: <FilterMenuInsured />,
    [EFieldColumn.installments]: <FilterMenuInstallment />,
    [EFieldColumn.accountDebt]: <FilterMenuAccountDebt />
  }

  return FilterMenuComponents[field]
}

export default FilterMenu
