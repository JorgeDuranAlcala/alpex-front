
import { Box, styled } from '@mui/material';
import { useMasterFiltersFollowUp } from '../../hooks/useMasterFilters';
import { SelectBroker } from './inputs/SelectBroker';
import { TextId } from './inputs/TextId';

export const MasterFilters = () => {

  const { queryFilters, handleSelectChange, handleTextChange } = useMasterFiltersFollowUp();

  return (
    <FiltersContainer>
      <SelectBroker
        selectedValue={queryFilters.claimNumber}
        onChange={handleSelectChange}
      />

      {/* <InputDate
        value={queryFilters.date}
        onChange={(date: any) => handleDateChange(date)}
      /> */}

      <TextId
        value={queryFilters.claimNumber}
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

