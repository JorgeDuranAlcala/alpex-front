
import { Box, styled } from '@mui/material';
import { useMasterFilters } from '../../hooks/useMasterFilters';
import { InputDate } from './inputs/InputDate';
import { SelectBroker } from './inputs/SelectBroker';
import { SelectReinsurer } from './inputs/SelectReinsurer';
import { SelectStatus } from './inputs/SelectStatus';
import { SelectTransaction } from './inputs/SelectTransaction';
import { TextId } from './inputs/TextId';

export const MasterFilters = () => {

  const { queryFilters, handleSelectChange, handleDateChange, handleTextChange } = useMasterFilters();

  return (
    <FiltersContainer>
      <SelectBroker
        selectedValue={queryFilters.broker}
        onChange={handleSelectChange}
      />

      <SelectReinsurer
        selectedValue={queryFilters.reinsurer}
        onChange={handleSelectChange}
      />

      <SelectStatus
        selectedValue={queryFilters.status}
        onChange={handleSelectChange}
      />

      <SelectTransaction
        selectedValue={queryFilters.transaction}
        onChange={handleSelectChange}
      />

      <InputDate
        value={queryFilters.date}
        onChange={(date) => handleDateChange(date)}
      />

      <TextId
        value={queryFilters.id}
        onChange={handleTextChange}
      />

    </FiltersContainer>
  )
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '29px',

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  }
}));

