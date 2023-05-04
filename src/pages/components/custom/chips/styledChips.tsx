import { Theme } from '@mui/material/styles'
import Chip from 'src/@core/components/mui/chip'
import { CustomChipProps } from 'src/@core/components/mui/chip/types'

interface StyledChip extends CustomChipProps {
  maxWidth?: string
  theme?: Theme
  otherProps?: React.CSSProperties
}
const StyledChip = (props: StyledChip) => {
  return (
    <Chip
      sx={{
        fontFamily: 'Inter',
        display: 'flex',
        flexDirection: 'row',
        padding: '3px 4px',
        width: '127px',
        height: '24px',
        color: '#2535A8',
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #2535A8',
        borderRadius: '16px',
        flex: 'none',
        order: 0,
        flexGrow: 0,
        overflow: 'ellipsis',
        ...props.otherProps
      }}
      label={props.label}
    />
  )
}

export default StyledChip
