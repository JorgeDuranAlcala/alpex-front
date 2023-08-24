import { Chip, Typography } from '@mui/material'
import { ARAPStatus } from '../../../interfaces/QueryFilters'

interface StatusProps {
  status: ARAPStatus
}

const statusColors: { [key: string]: string } = {
  'pending': '#FDB528',
  'unpaid': '#FF4D49',
  'paid': '#72E128',
}
export const Status = ({ status }: StatusProps) => {
  return (
    <Chip
      label={<Typography sx={{ textTransform: 'capitalize', color: 'white', minWidth: '100%' }}>{status}</Typography>}
      sx={{ backgroundColor: statusColors[status], minWidth: '100%' }}
    />
  )
}
