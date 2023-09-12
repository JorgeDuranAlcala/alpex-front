import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { InputSelectProps } from '@/views/arap/_commons/interfaces/InputSelectProps'
import { paymentScheduleOptions } from '../../constants/paymentScheduleOptions'

export const SelectPaymentSchedule = ({ selectedValue, onChange }: InputSelectProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
      <InputLabel>Payment Schedule</InputLabel>

      <Select
        name='payment_schedule'
        label='Select Payment Schedule'
        value={selectedValue}
        onChange={onChange}
        labelId='broker'
      >
        {paymentScheduleOptions.length > 0 ? (
          paymentScheduleOptions.map(option => {
            return (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  '::first-letter': {
                    textTransform: 'uppercase'
                  }
                }}
              >
                {option}
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
