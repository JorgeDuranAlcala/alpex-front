
import {
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material';


import { NumericFormatCustom } from '@/views/components/inputs/numeric-format/NumericFormatCustom';

interface TotalInputsProps {
  recievedNetPremium: number;
  distribuitedNetPremium: number;
  difference: number;
}

interface InputProps {
  value: number;
}

export const TotalInputs = ({ recievedNetPremium, distribuitedNetPremium, difference }: TotalInputsProps) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={4}>
        <ReceivedNetPremium value={recievedNetPremium} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DistribuitedNetPremium value={distribuitedNetPremium} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Difference value={difference} />
      </Grid>
    </Grid>
  )
}

function ReceivedNetPremium({ value }: InputProps) {
  return (
    <FormControl fullWidth>
      <TextField
        autoFocus
        label='Received net premium'
        disabled
        fullWidth
        value={value}
        InputProps={{
          inputComponent: NumericFormatCustom as any
        }}
        inputProps={{
          suffix: ' '
        }}
      />
    </FormControl>
  )
}

function DistribuitedNetPremium({ value }: InputProps) {
  return (
    <FormControl fullWidth>
      <TextField
        autoFocus
        label='Distributed net premium'
        value={value}
        InputProps={{
          inputComponent: NumericFormatCustom as any
        }}
        inputProps={{
          suffix: ' '
        }}
        disabled
      />
      {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
    </FormControl>
  )
}

function Difference({ value }: InputProps) {
  return (
    <FormControl fullWidth>
      <TextField
        autoFocus
        label='Difference'
        value={value}
        InputProps={{
          inputComponent: NumericFormatCustom as any
        }}
        inputProps={{
          suffix: ' '
        }}
        disabled
      />
      {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
    </FormControl>
  )
}
