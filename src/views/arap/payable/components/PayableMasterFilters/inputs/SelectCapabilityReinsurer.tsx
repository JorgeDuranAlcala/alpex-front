import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany';

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps';

export const SelectCapabilityReinsurer = ({ selectedValue, onChange, isDisabled }: InputSelectProps) => {

  const { reinsuranceCompany: reinsurers } = useGetAllReinsuranceCompanies();


  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }} >
      <InputLabel>Capability</InputLabel>

      <Select
        name='capability'
        label='Select Capability'
        value={selectedValue}
        onChange={onChange}
        labelId='capability'
        disabled={isDisabled}
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
