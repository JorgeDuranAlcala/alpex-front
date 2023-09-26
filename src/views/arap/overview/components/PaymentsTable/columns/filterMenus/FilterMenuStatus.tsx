// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'

// ** Custom utilities
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { optionsPaymentStatusAdapter } from '@/views/arap/overview/services/getPaymentStatus/frontAdapters/optionsPaymentStatusAdapter'
import { getPaymentStatusService } from '@/views/arap/overview/services/getPaymentStatus/getPaymentStatusService'
import { useContext, useEffect, useState } from 'react'

interface IFilterMenuStatusOptionProps {
  value: number
  text: string
  handleClose?: () => void
}

const FilterMenuStatusOption: React.FC<IFilterMenuStatusOptionProps> = ({ value, text }) => {
  const { handleChangeFilters } = useContext(PaymentsContext)

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

const FilterMenuStatus = ({}) => {
  const [options, setOptionsPaymentStatus] = useState<{ value: number; text: string }[]>([])

  const getPaymentStatusOptions = async () => {
    const data = await getPaymentStatusService()
    setOptionsPaymentStatus(optionsPaymentStatusAdapter(data))
  }

  useEffect(() => {
    getPaymentStatusOptions()
  }, [])

  return (
    <>
      {options.map(status => (
        <FilterMenuStatusOption key={status.value} value={status.value} text={status.text} />
      ))}
    </>
  )
}

export default FilterMenuStatus
