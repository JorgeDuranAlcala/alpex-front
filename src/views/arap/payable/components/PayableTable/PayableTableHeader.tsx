// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { Box } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Components
import Chip from 'src/@core/components/mui/chip'

// ** Custom Common Styles imports
import { TableHeaderContainer, TableHeaderTitleAndInputs, TitleH5 } from '@/views/arap/_commons/styles/TableHeader'

// ** Custom Common Interfaces
import { Filter } from '@/views/arap/_commons/interfaces/Grid'

// ** Custom Components imports
import { PayableContext } from '../../context/PayableContext'
import { PayableMasterFilters } from '../PayableMasterFilters/PayableMasterFilters'

const PayableTableHeader = () => {
  const { payableGrid, handleDeleteFilters } = useContext(PayableContext)

  const handleDelete = (filter: Filter) => {
    handleDeleteFilters(filter.type)
  }

  return (
    <TableHeaderContainer>
      <TableHeaderTitleAndInputs>
        <TitleH5>Payables</TitleH5>
        <PayableMasterFilters />
      </TableHeaderTitleAndInputs>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {payableGrid?.filters.length === 0
          ? null
          : payableGrid?.filters.map((filter, index) => (
              <Chip
                key={index}
                label={filter.text}
                sx={{
                  backgroundColor: '#174BC125',
                  marginRight: '6px',
                  color: '#2535A8',
                  fontWeight: 500,
                  fontFamily: 'Inter',
                  mb: 2
                }}
                onDelete={() => {
                  handleDelete(filter)
                }}
                deleteIcon={<Icon icon='mdi:close-circle' style={{ color: '2535A8' }} />}
              />
            ))}
      </Box>
    </TableHeaderContainer>
  )
}

export default PayableTableHeader
