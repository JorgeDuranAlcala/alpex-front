// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { Box, Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { TableHeaderContainer, Title } from '@/styles/Claims/FollowUpTable'

import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import Chip from 'src/@core/components/mui/chip'
import { FollowUpContext } from '../../context/followUp/FollowUpContext'

import { MasterFilters } from '../MasterFilters/MasterFilters'

const TableHeader = () => {
  const { followUpGrid, handleDeleteFilters } = useContext(FollowUpContext)

  const handleDelete = (filter: Filter) => {
    handleDeleteFilters(filter.type)
  }

  return (
    <TableHeaderContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: followUpGrid?.filters.length === 0 ? '16.5%' : null

            // justifyContent: followUpGrid?.filters.length === 0 ? 'space-between' : null
          }}
        >
          <Grid item xs={12} sm={2} md={2} sx={{ width: '20%' }}>
            <Title>Follow-up</Title>
          </Grid>

          {followUpGrid?.filters?.length === 0 ? null : (
            <Grid item xs={12} sm={1.5} md={1.5} sx={{ height: 'auto' }}>
              {followUpGrid?.filters.map((filter, index) => (
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
            </Grid>
          )}

          <Grid item xs={12} sm={8} md={8} sx={{ width: '80%' }}>
            <MasterFilters />
          </Grid>
        </Grid>
      </Box>
    </TableHeaderContainer>
  )
}

export default TableHeader
