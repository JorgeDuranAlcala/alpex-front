import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps';
import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';

export const SelectBroker = ({ selectedValue, onChange }: InputSelectProps) => {

  const { brokers } = useBrokerGetAll();
  const {handleSaveMasterFilters} = useMasterFiltersStorage();

  const handleOnChange = (e: SelectChangeEvent<string>) => {
    handleSaveMasterFilters({
      items: brokers,
      saveValue: +e.target.value,
      type: 'broker'
    })
    onChange(e);
  }

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Broker</InputLabel>

      <Select
        name='broker'
        label='Select Broker'
        value={selectedValue}
        onChange={handleOnChange}
        labelId='broker'
      >
        <MenuItem value="all">
          ALL
        </MenuItem>
        {brokers.length > 0 ? (
          brokers.map(broker => {
            return (
              <MenuItem key={broker.id} value={broker.id}>
                {broker.name}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem key={null} value={''}>
            No options available
          </MenuItem>
        )}
      </Select>

    </FormControl>
  )
}
