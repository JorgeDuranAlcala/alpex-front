// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { TableHeaderContainer, TitleH5 } from '@/views/arap/_commons/styles/TableHeader'
import Chip from 'src/@core/components/mui/chip'

import { PaymentsContext } from '../../context/payments/PaymentsContext'


const TableHeader = () => {

  const { paymentsGrid, handleDeleteFilters } = useContext(PaymentsContext);


  const handleDelete = (filter: Filter) => {
    handleDeleteFilters(filter.type)
  }

  const formatDateText = (text: string) => {
    const label = 'Transaction Date: '
    const dateText = text.replace(label, '')
    const dateSplitted = dateText.split('-')

  return `${label}${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`
  }


  return (
    <TableHeaderContainer>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: paymentsGrid?.filters.length === 0 ? 'space-between' : null
        }}
      >
        <TitleH5>Payments</TitleH5>
        {paymentsGrid?.filters.length === 0 ? null : (
          <Grid item xs={12} sm={5} md={7} sx={{ height: 'auto' }}>
            {paymentsGrid?.filters.map((filter, index) =>
            (
              <Chip
                key={index}
                label={filter.type === 'date' ? formatDateText(filter.text) :filter.text}
                sx={{
                  backgroundColor: '#174BC125',
                  marginRight: '6px',
                  color: '#2535A8',
                  fontWeight: 500,
                  fontFamily: 'Inter',
                  mb: 2
                }}
                onDelete={() => {
                  if (filter.type !== 'date') {

                    handleDelete(filter)
                  }
                }}
                deleteIcon={filter.type !== 'date' ? <Icon icon='mdi:close-circle' style={{ color: '2535A8' }} /> : <></>}
              />
            )
            )}
          </Grid>
        )}

      </Grid>
    </TableHeaderContainer>
  )
}

export default TableHeader;




