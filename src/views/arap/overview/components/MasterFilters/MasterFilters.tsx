
import { Box, styled } from '@mui/material'
import { useContext } from 'react'
import { MasterFiltersContext } from '../../context/masterFilters/MasterFiltersContext'
import { useMasterFilters } from '../../hooks/useMasterFilters'
import { InputDateFilter } from './inputs/InputDateFilter'
import { SelectBroker } from './inputs/SelectBroker'
import { SelectReinsurer } from './inputs/SelectReinsurer'
import { SelectStatus } from './inputs/SelectStatus'
import { SelectTransaction } from './inputs/SelectTransaction'
import { TextId } from './inputs/TextId'

export const MasterFilters = () => {
  const { queryFilters, handleSelectChange, handleDateChange, handleTextChange } = useMasterFilters()
  
  const { gridFilters } = useContext(MasterFiltersContext)

  const selectedFilters = {
    ...queryFilters,
    ...gridFilters,
    ...((queryFilters.hasOwnProperty('id') && !gridFilters.hasOwnProperty('id')) ? {id: ''} : {})
  }


  return (
    <FiltersContainer>
      <SelectBroker selectedValue={selectedFilters.broker} onChange={handleSelectChange} />

      <SelectReinsurer selectedValue={selectedFilters.reinsurer} onChange={handleSelectChange} />

      <SelectStatus selectedValue={selectedFilters.status} onChange={handleSelectChange} />

      <SelectTransaction selectedValue={selectedFilters.transactionType} onChange={handleSelectChange} />

      <InputDateFilter value={selectedFilters.date} onChange={handleDateChange} />

      <TextId value={selectedFilters.id || ''} onChange={handleTextChange} />
    </FiltersContainer>
  )
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '29px',

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  }
}))
