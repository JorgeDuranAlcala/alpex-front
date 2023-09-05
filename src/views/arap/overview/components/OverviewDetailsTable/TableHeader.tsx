// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { Box, Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { Filter } from '@/views/arap/_commons/interfaces/Grid'
import { Caption, RightTextsContainer, Subtitle, TableHeaderContainer, TitleH6 } from '@/views/arap/_commons/styles/TableHeader'
import Chip from 'src/@core/components/mui/chip'

import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'

import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext'

interface TableHeaderProps {
  title: string;
  subtitle: string;
  rightTitle: string;
  detailsType: DetailsType;
}

const TableHeader = ({ title, subtitle, rightTitle, detailsType }: TableHeaderProps) => {

  const { getGridFilters, getTotalAmount, handleDeleteFilters } = useContext(OverviewDetailsContext);

  const filters = getGridFilters(detailsType);
  const { totalAmount, currency } = getTotalAmount(detailsType);

  const handleDelete = (filter: Filter) => {
    handleDeleteFilters(filter.type, detailsType)
  }



  return (
    <TableHeaderContainer sx={{ justifyContent: 'space-between' }}>
      <Box >

        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: filters.length === 1 ? 'space-between' : null
          }}
        >

          <Grid item xs={12} sm={5} md={7} sx={{ height: 'auto' }}>
            <TitleH6>{title}</TitleH6>
            {filters.length === 0 ? null : filters.map((filter, index) =>
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
          </Grid>

        </Grid>

        <Subtitle sx={{ mt: '8px' }}>{subtitle}</Subtitle>
      </Box>

      <RightTextsContainer>
        <Caption>{rightTitle}</Caption>
        <TitleH6 sx={{ fontWeight: '400' }}>
          ${totalAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2
          })} {currency}
        </TitleH6>
      </RightTextsContainer>
    </TableHeaderContainer>
  )
}

export default TableHeader;




