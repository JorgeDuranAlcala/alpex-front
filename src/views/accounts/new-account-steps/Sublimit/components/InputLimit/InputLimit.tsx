import { ResponseGetAccount } from '@/hooks/accounts/forms'
import { Grid, TextField } from '@mui/material'
import React from 'react'
import { NumericFormat } from 'react-number-format'

export type InputLimitProps = {
  account: ResponseGetAccount | undefined
}

const InputLimit: React.FC<InputLimitProps> = ({ account }) => {
  return (
    <Grid item xs={12} sm={4}>
      <NumericFormat
        value={account?.informations[0].limit || 'Limit'}
        prefix='$'
        allowLeadingZeros
        thousandSeparator=','
        customInput={TextField}
        disabled
        name='Limit'
        label='Limit'
        multiline
        variant='outlined'
        fullWidth
      />
    </Grid>
  )
}

export default InputLimit
