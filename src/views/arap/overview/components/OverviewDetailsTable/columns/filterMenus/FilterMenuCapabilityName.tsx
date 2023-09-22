// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPCapabilityName } from '@/views/arap/overview/constants/OptionsARAPCapabilityName'

import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext'
import { ARAPCapabilityName } from '@/views/arap/overview/interfaces/QueryFilters'
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'
import { useContext } from 'react'


interface FilterMenuOptionProps {
  detailsType: DetailsType;
  value: ARAPCapabilityName;
  text: string;
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ value, text, detailsType }) => {
  const { handleChangeFilters } = useContext(OverviewDetailsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'capabilityName',
      value,
      text
    }, detailsType);

  }

  return (
    <>
      <MenuItem
        className='account-menu-item'
        sx={{ padding: '14px 10px', borderRadius: '0' }}
        onClick={() => {
          handleClick()
        }}
      >
        {text}
      </MenuItem>
    </>
  )
}

interface FilterMenuCapabilityNameProps {
  detailsType: DetailsType;

}

const FilterMenuCapabilityName = ({ detailsType }: FilterMenuCapabilityNameProps) => {
  return (
    <>
      {OptionsARAPCapabilityName.map((item) => (

        <FilterMenuOption key={item.value} value={item.value} text={item.text} detailsType={detailsType} />
      ))}
    </>
  )
}

export default FilterMenuCapabilityName
