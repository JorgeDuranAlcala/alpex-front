// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPTransaction } from '@/views/arap/overview/constants/OptionsARAPTransaction'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPTransaction } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'


interface FilterMenuOptionProps {
  item: ARAPTransaction
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ item }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'transaction',
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

const FilterMenuTransaction = ({ }) => {
  return (
    <>
      {OptionsARAPTransaction.map((item) => (

        <FilterMenuOption key={item.value} item={item.value} />
      ))}
    </>
  )
}

export default FilterMenuTransaction
