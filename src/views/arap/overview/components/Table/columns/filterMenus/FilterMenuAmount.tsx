import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'


// ** Custom utilities
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'


interface FilterMenuOptionProps {
  item: string
  handleClose?: () => void
}

const FilterMenuOption: React.FC<FilterMenuOptionProps> = ({ item }) => {
  const { handleChangeFilters } = useContext(PaymentsContext);

  const handleClick = () => {

    handleChangeFilters({
      type: 'amount',
      value: item,
      text: item
    })
  }

  return (
    <>
      <MenuItem
        className='account-menu-item'
        sx={{ padding: '14px 10px', borderRadius: '0', textTransform: 'uppercase' }}
        onClick={() => {
          handleClick()
        }}
      >
        {item}
      </MenuItem>
    </>
  )
}

const FilterMenuAmount = ({ }) => {


  const { paymentsGrid } = useContext(PaymentsContext);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    if (!paymentsGrid) return;

    const currencies = paymentsGrid.paymentsGridList.reduce((uniqueCurrencies: string[], payment) => {
      if (!uniqueCurrencies.includes(payment.currency)) {
        uniqueCurrencies.push(payment.currency);
      }

      return uniqueCurrencies
    }, [])

    setCurrencies(currencies);
  }, [paymentsGrid])


  return (
    <>
      {currencies.map((item) => (

        <FilterMenuOption key={item} item={item} />
      ))}
    </>
  )
}

export default FilterMenuAmount
