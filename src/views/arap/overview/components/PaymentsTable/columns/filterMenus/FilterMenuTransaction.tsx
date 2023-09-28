// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'

// ** Custom utilities
import { OptionsARAPTransaction } from '@/views/arap/overview/constants/OptionsARAPTransaction'
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { ARAPTransactionValue } from '@/views/arap/overview/interfaces/QueryFilters'
import { useContext } from 'react'
import { EFieldColumn } from '../efieldColumn'

interface FilterMenuOptionProps {
  value: ARAPTransactionValue
  text: string
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ value, text }) => {
  const { handleChangeFilters } = useContext(PaymentsContext)

  const handleClick = () => {
    handleChangeFilters({
      type: EFieldColumn.TRANSACTION_TYPE,
      value,
      text
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
        {text}
      </MenuItem>
    </>
  )
}

const FilterMenuTransaction = ({}) => {
  return (
    <>
      {OptionsARAPTransaction.map(item => (
        <FilterMenuOption key={item.value} value={item.value} text={item.text} />
      ))}
    </>
  )
}

export default FilterMenuTransaction
