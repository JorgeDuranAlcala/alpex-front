// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPCapabilityName } from '@/views/arap/overview/constants/OptionsARAPCapabilityName'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPCapabilityName } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'


interface FilterMenuOptionProps {
  item: ARAPCapabilityName
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ item }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'capabilityName',
      value: item,
      text: item
    })
  }

  return (
    <>
      <MenuItem
        className='account-menu-item'
        sx={{ padding: '14px 10px', borderRadius: '0', textTransform: 'capitalize' }}
        onClick={() => {
          handleClick()
        }}
      >
        {item}
      </MenuItem>
    </>
  )
}

const FilterMenuCapabilityName = ({ }) => {
  return (
    <>
      {OptionsARAPCapabilityName.map((item) => (

        <FilterMenuOption key={item.value} item={item.value} />
      ))}
    </>
  )
}

export default FilterMenuCapabilityName
