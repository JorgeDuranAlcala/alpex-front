import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { Icon } from '@iconify/react'
import { Box, Button } from '@mui/material'

import { useContext } from 'react'
import { SecondViewContext } from './SecondViewContext'

interface SwitchSecondViewProps {
  securities: SecurityDto[]
  calculateSecurities: (securities: SecurityDto[]) => void
  view: number
}
export const SwitchSecondView = ({ securities, calculateSecurities, view }: SwitchSecondViewProps) => {
  const { switchView } = useContext(SecondViewContext)

  const handleSwitchView = () => {
    switchView({ securities, calculateSecurities, view })
  }

  return (
    <Box style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
      <Button
        variant='text'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: view === 1 ? '#EF9713' : '#2D67EB',
          letterSpacing: '0.46px'
        }}
        onClick={handleSwitchView}
      >
        <span>{view === 1 ? 'SEE SECOND VIEW' : 'SEE FIRST VIEW'}</span>

        <Icon
          icon='material-symbols:wifi-protected-setup'
          color={view === 1 ? '#EF9713' : '#2D67EB'}
          width='24'
          height='24'
        />
      </Button>
    </Box>
  )
}
