import { Chip, Typography } from '@mui/material'
import { ARAPStatus } from '../../../interfaces/QueryFilters'

interface StatusProps {
  status: ARAPStatus
  fontSize?: string
  padding?: string
}

const statusColors: { [key: string]: string } = {
  pending: '#FDB528',
  unpaid: '#FF4D49',
  paid: '#72E128'
}
export const Status = ({ status, fontSize, padding }: StatusProps) => {
  return (
    <Chip
      label={
        <Typography
          sx={{
            textTransform: 'capitalize',
            color: 'white',
            minWidth: '100%',
            fontSize: fontSize
          }}
        >
          {status}
        </Typography>
      }
      sx={{
        backgroundColor: statusColors[status],
        minWidth: '100%',
        padding: padding,
        textAlign: 'center',
        paddingLeft: '0px',
        paddingRight: '0px'
      }}
    />
  )
}
