// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPCapabilityName } from '@/views/arap/overview/constants/OptionsARAPCapabilityName'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPCapabilityName } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'


interface FilterMenuOptionProps {
  value: ARAPCapabilityName;
  text: string;
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ value, text }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'capabilityName',
      value,
      text
    });

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

const FilterMenuCapabilityName = ({ }) => {
  return (
    <>
      {OptionsARAPCapabilityName.map((item) => (

        <FilterMenuOption key={item.value} value={item.value} text={item.text} />
      ))}
    </>
  )
}

export default FilterMenuCapabilityName
