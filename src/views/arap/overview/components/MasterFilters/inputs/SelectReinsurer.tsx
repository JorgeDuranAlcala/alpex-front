import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { InputSelectProps } from '../../../interfaces/InputSelectProps';

export const SelectReinsurer = ({ selectedValue, onChange }: InputSelectProps) => {

  const { reinsuranceCompany: reinsurers } = useGetAllReinsuranceCompanies();

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Reinsurer</InputLabel>

      <Select
        name='reinsurer'
        label='Select Reinsurer'
        value={selectedValue}
        onChange={onChange}
        labelId='reinsurer'
      >
        <MenuItem value="all">
          ALL
        </MenuItem>
        {reinsurers && reinsurers.length > 0 ? (
          reinsurers.map(reinsurer => {
            return (
              <MenuItem key={reinsurer.id} value={reinsurer.id}>
                {reinsurer.name}
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
