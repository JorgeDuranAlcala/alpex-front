import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps'
import { optionsPaymentStatusAdapter } from '@/views/arap/services/getPaymentStatus/frontAdapters/optionsPaymentStatusAdapter'
import { getPaymentStatusService } from '@/views/arap/services/getPaymentStatus/getPaymentStatusService'
import { useEffect, useState } from 'react'

export const SelectStatus = ({ selectedValue, onChange }: InputSelectProps) => {
  const [options, setOptionsPaymentStatus] = useState<{ value: number; text: string }[]>([])

  const getPaymentStatusOptions = async () => {
    const data = await getPaymentStatusService()
    setOptionsPaymentStatus(optionsPaymentStatusAdapter(data))
  }

  useEffect(() => {
    getPaymentStatusOptions()
  }, [])

  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
      <InputLabel>Status</InputLabel>

      <Select name='status' label='Select Status' value={selectedValue} onChange={onChange} labelId='status'>
        <MenuItem value='all'>ALL</MenuItem>
        {options && options.length > 0 ? (
          options.map(option => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.text.toUpperCase()}
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
