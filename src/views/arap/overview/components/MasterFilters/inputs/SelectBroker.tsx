import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker';
import { InputSelectProps } from '../../../interfaces/InputSelectProps';

export const SelectBroker = ({ selectedValue, onChange }: InputSelectProps) => {

  const { brokers } = useBrokerGetAll();

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Broker</InputLabel>

      <Select
        name='broker'
        label='Select Broker'
        value={selectedValue}
        onChange={onChange}
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
