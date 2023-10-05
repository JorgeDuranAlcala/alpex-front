interface MasterFilterStorageSelectorProps {
  label: string;
  value: string | number;
  type: string;
}

interface HandleSaveMasterFiltersSelectorsProps {
  items: any[];
  itemFieldValue?: string;
  itemFieldFilter?: string;
  saveValue: string | number;
  defaultLabel?: string | number;
  type: string;

}

const STORAGE_NAME = 'ARAP_OVERVIEW_PAYMENTS_masterFiltersStorage';

export const useMasterFiltersStorage = () => {

  const cleanMasterFiltersSelctors = () => {
    localStorage.removeItem(STORAGE_NAME)
  }
  const getMasterFiltersSelectors = (): MasterFilterStorageSelectorProps[] => {
    const savedFilters = localStorage.getItem(STORAGE_NAME)
    if (!savedFilters) return []

    return JSON.parse(savedFilters)
  }

  const saveMasterFiltersSelectors = ({label, value, type}: MasterFilterStorageSelectorProps) => {
    const savedFilters = getMasterFiltersSelectors().filter(item => item.type !== type)

    savedFilters.push({ label, value, type })

    localStorage.setItem(STORAGE_NAME, JSON.stringify(savedFilters))
  }

  const removeMasterFiltersSelector = (type: string) => {
    const savedFilters = getMasterFiltersSelectors().filter(item => item.type !== type)

    localStorage.setItem(STORAGE_NAME, JSON.stringify(savedFilters))
  }

  const handleSaveMasterFilters = ({
    items, 
    itemFieldFilter = 'id', 
    itemFieldValue = 'name', 
    saveValue, 
    defaultLabel = 'all', 
    type
  }: HandleSaveMasterFiltersSelectorsProps) => {
    
    const selectedItem = items.find(items => items[itemFieldFilter] === saveValue)
    const selectedItemText = selectedItem ? selectedItem[itemFieldValue] : defaultLabel;
    
    saveMasterFiltersSelectors({
      value: saveValue,
      label: selectedItemText,
      type: type
    })
  }

  return {
    getMasterFiltersSelectors,
    saveMasterFiltersSelectors,
    removeMasterFiltersSelector,
    cleanMasterFiltersSelctors,
    handleSaveMasterFilters,
  }
}