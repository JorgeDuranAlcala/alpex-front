
// ** React Imports
import { ReactElement } from 'react';

// ** Custom utilities
import { EFieldColumn } from 'src/views/dynamic-data/property-listing/';
import FilterMenuNomEnt from './FilterMenuNomEnt';
import FilterMenuNomMun from './FilterMenuNomMun';
import FilterMenuPropertyId from './FilterMenuPropertyId';
import FilterMenuTypology from './FilterMenuTypology';
import FilterMenuValfis from './FilterMenuValfis';
import FilterMenuZonacresta from './FilterMenuZonacresta';

interface IFilterMenu {
    field: string,
    handleClose?: () => void,
}

export interface IComponents {
  [key: string]: ReactElement
}

const FilterMenu: React.FC<IFilterMenu> = ({ field, }) => {

    const FilterMenuComponents: IComponents = {
        [EFieldColumn.PROPERTY_ID]: (
            <FilterMenuPropertyId />
        ),
        [EFieldColumn.VALFIS]: (
          <FilterMenuValfis  />
      ),
        [EFieldColumn.NOM_ENT]: (
            <FilterMenuNomEnt  />
        ),
        [EFieldColumn.NOM_MUN]: (
            <FilterMenuNomMun  />
        ),
        [EFieldColumn.TYPOLOGY]: (
            <FilterMenuTypology  />
        ),
        [EFieldColumn.ZONACRESTA]: (
          <FilterMenuZonacresta  />
      ),
    }

    return FilterMenuComponents[field]
}

export default FilterMenu
