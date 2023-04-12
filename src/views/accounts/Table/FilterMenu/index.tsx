// ** Custom utilities
import FilterMenuAccountId from 'src/views/accounts/Table/FilterMenu/FilterMenuAccountId';
import FilterMenuEffectiveDate from 'src/views/accounts/Table/FilterMenu/FilterMenuEffectiveDate';
import FilterMenuInsured from 'src/views/accounts/Table/FilterMenu/FilterMenuInsured';
import FilterMenuLob from 'src/views/accounts/Table/FilterMenu/FilterMenuLob';
import FilterMenuStatus from 'src/views/accounts/Table/FilterMenu/FilterMenuStatus';
import { IComponents } from 'src/views/accounts/Table/Status';
import { EFieldColumn } from 'src/views/accounts/Table/index';

interface IFilterMenu {
    field: string,
    handleClose?: () => void,
}


const FilterMenu: React.FC<IFilterMenu> = ({ field, }) => {

    const FilterMenuComponents: IComponents = {
        [EFieldColumn.ACCOUNT_ID]: (
            <FilterMenuAccountId />
        ),
        [EFieldColumn.STATUS]: (
            <FilterMenuStatus  />
        ),
        [EFieldColumn.INSURED]: (
            <FilterMenuInsured  />
        ),
        [EFieldColumn.LOB]: (
            <FilterMenuLob />
        ),
        [EFieldColumn.EFFECTIVE_DATE]: (
            <FilterMenuEffectiveDate  />
        ),
    }
  
    return FilterMenuComponents[field]
}

export default FilterMenu