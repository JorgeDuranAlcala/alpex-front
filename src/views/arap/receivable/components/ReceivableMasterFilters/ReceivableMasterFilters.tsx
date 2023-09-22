import { ActionButton } from '@/views/arap/_commons/components/buttons/ActionButton'
import { InputDate } from '@/views/arap/_commons/components/inputs/InputDate'
import { Box, CircularProgress, Tooltip, styled } from '@mui/material'
import { useReceivableMasterFilters } from '../../hooks/useReceivableMasterFilters'
import { SelectCapabilityBroker } from './inputs/SelectCapabilityBroker'

export const ReceivableMasterFilters = () => {
  const { isLoading, receivableFilters, handleSelectChange, handleDateChange, handleDownloadData } =
    useReceivableMasterFilters()

  return (
    <FiltersContainer>
      {isLoading ? (
        <Box>
          <CircularProgress size={35} />
        </Box>
      ) : null}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
        {!isLoading ? (
          <Tooltip title='Export to .xlsx' placement='top' arrow>
            <div>
              <ActionButton onClick={handleDownloadData} icon='ic:baseline-download' fontSize={32} />
            </div>
          </Tooltip>
        ) : null}

        <InputDate value={receivableFilters.date} onChange={date => handleDateChange(date)} isDisabled={isLoading} />
      </Box>

      <SelectCapabilityBroker
        selectedValue={receivableFilters.capability}
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
