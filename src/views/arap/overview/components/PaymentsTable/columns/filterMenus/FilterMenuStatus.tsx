// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPStatus } from '@/views/arap/overview/constants/OptionsARAPStatus'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPStatus } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'


interface IFilterMenuStatusOptionProps {
  value: ARAPStatus;
  text: string;
  handleClose?: () => void
}

const FilterMenuStatusOption: React.FC<IFilterMenuStatusOptionProps> = ({ value, text }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'status',
      value,
      text
    })
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

const FilterMenuStatus = ({ }) => {
  return (
    <>
      {OptionsARAPStatus.map((status) => (

        <FilterMenuStatusOption key={status.value} value={status.value} text={status.text} />
      ))}
    </>
  )
}

export default FilterMenuStatus
