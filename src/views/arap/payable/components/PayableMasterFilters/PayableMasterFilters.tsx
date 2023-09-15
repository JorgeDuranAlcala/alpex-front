import { InputDate } from '@/views/arap/_commons/components/inputs/InputDate'
import { Box, CircularProgress, styled } from '@mui/material'
import { usePayableMasterFilters } from '../../hooks/usePayableMasterFilters'
import { SelectCapabilityReinsurer } from './inputs/SelectCapabilityReinsurer'

export const PayableMasterFilters = () => {
  const { isLoading, payableFilters, handleSelectChange, handleDateChange } = usePayableMasterFilters()

  return (
    <FiltersContainer>
      {isLoading ? (
        <Box>
          <CircularProgress size={35} />
        </Box>
      ) : null}
      <InputDate value={payableFilters.date} onChange={date => handleDateChange(date)} isDisabled={isLoading} />

      <SelectCapabilityReinsurer
        selectedValue={payableFilters.capability}
        onChange={handleSelectChange}
        isDisabled={isLoading}
      />
    </FiltersContainer>
  )
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '8px'
  }
}))
