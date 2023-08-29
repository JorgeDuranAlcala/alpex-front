// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { OptionsARAPStatus } from '@/views/arap/overview/constants/OptionsARAPStatus'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPStatus } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'


interface IFilterMenuStatusOptionProps {
  status: ARAPStatus
  handleClose?: () => void
}

const FilterMenuStatusOption: React.FC<IFilterMenuStatusOptionProps> = ({ status }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'status',
      value: status,
      text: status
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
        {status}
      </MenuItem>
    </>
  )
}

const FilterMenuStatus = ({ }) => {
  return (
    <>
      {OptionsARAPStatus.map((status) => (

        <FilterMenuStatusOption key={status.value} status={status.value} />
      ))}
    </>
  )
}

export default FilterMenuStatus
