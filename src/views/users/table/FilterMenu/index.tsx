// ** Custom utilities

import { IComponents } from 'src/views/users/table/Status'
import { EFieldColumn } from 'src/views/users/table/index'
import FilterMenuCompany from './FilterMenuCompany'
import FilterMenuUsers from './FilterMenuUsers'

interface IFilterMenu {
  field: string
  handleClose?: () => void
}

const FilterMenu: React.FC<IFilterMenu> = ({ field }) => {
  const FilterMenuComponents: IComponents = {
    [EFieldColumn.NAME]: <FilterMenuUsers />,
    [EFieldColumn.ROLE]: <FilterMenuUsers />,
    [EFieldColumn.COMPANY]: <FilterMenuCompany />,
    [EFieldColumn.PHONE_NUMBER]: <FilterMenuUsers />,
    [EFieldColumn.EMAIL]: <FilterMenuUsers />
  }

  return FilterMenuComponents[field]
}

export default FilterMenu
