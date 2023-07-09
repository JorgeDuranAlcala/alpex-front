import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';

import { useContext } from 'react';
import { SecondViewContext } from '../../context/secondView/SecondViewContext';

interface SwitchSecondViewProps {
  activeView: number;

}
export const SwitchSecondView = ({ activeView }: SwitchSecondViewProps) => {
  const { handleSwitchView } = useContext(SecondViewContext)

  const onHandleSwitchView = () => {
    handleSwitchView({ toView: activeView === 1 ? 2 : 1 })
  }

  return (
    <Box style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
      <Button
        variant='text'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: activeView === 1 ? '#EF9713' : '#2D67EB',
          letterSpacing: '0.46px',
          position: 'sticky',
        }}
        onClick={onHandleSwitchView}
      >
        <span>{activeView === 1 ? 'SEE SECOND VIEW' : 'SEE FIRST VIEW'}</span>

        <Icon
          icon='material-symbols:wifi-protected-setup'
          color={activeView === 1 ? '#EF9713' : '#2D67EB'}
          width='24'
          height='24'
        />
      </Button>
    </Box>
  )
}
