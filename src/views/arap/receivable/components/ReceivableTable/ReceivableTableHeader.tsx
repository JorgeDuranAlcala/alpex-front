// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { Box, } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Components
import Chip from 'src/@core/components/mui/chip'

// ** Custom Common Styles imports
import { TableHeaderContainer, TitleH5 } from '@/views/arap/_commons/styles/TableHeader'

// ** Custom Common Interfaces
import { Filter } from '@/views/arap/_commons/interfaces/Grid'

// ** Custom Components imports
import { ReceivableContext } from '../../context/ReceivableContext'
import { ReceivableMasterFilters } from '../ReceivableMasterFilters/ReceivableMasterFilters'


const ReceivableTableHeader = () => {

  const { receivableGrid, handleDeleteFilters } = useContext(ReceivableContext);

  const handleDelete = (filter: Filter) => {
    handleDeleteFilters(filter.type)
  }

  return (
    <TableHeaderContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <TitleH5>Receivable</TitleH5>
        <ReceivableMasterFilters />

      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {receivableGrid?.filters.length === 0 ? null : receivableGrid?.filters.map((filter, index) =>
        (
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
        )
        )}
      </Box>
    </TableHeaderContainer>
  )
}

export default ReceivableTableHeader;




