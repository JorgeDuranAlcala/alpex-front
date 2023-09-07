
import { InputDate } from '@/views/arap/_commons/components/inputs/InputDate';
import { Box, CircularProgress, styled } from '@mui/material';
import { useReceivableMasterFilters } from '../../hooks/useReceivableMasterFilters';
import { SelectCapabilityBroker } from './inputs/SelectCapabilityBroker';

export const ReceivableMasterFilters = () => {

  const { isLoading, receivableFilters, handleSelectChange, handleDateChange } = useReceivableMasterFilters();

  return (
    <FiltersContainer>

      {isLoading ? (
        <Box>
          <CircularProgress size={35} />
        </Box>
      )
        : null}

      <SelectCapabilityBroker
        selectedValue={receivableFilters.capability}
        onChange={handleSelectChange}
        isDisabled={isLoading}
      />

      <InputDate
        value={receivableFilters.date}
        onChange={(date) => handleDateChange(date)}
        isDisabled={isLoading}
      />

    </FiltersContainer>
  )
}

const FiltersContainer = styled(Box)(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

