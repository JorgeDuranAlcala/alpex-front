import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { SecondViewContext } from './SecondViewContext';


interface SwitchSecondViewProps {
  formIndex: number;
  securities: SecurityDto[];
  calculateSecurities: (securities: SecurityDto[]) => void;
}
export const SwitchSecondView = ({ formIndex, securities, calculateSecurities }: SwitchSecondViewProps) => {

  const { switchView } = useContext(SecondViewContext);

  if (securities[formIndex + 1]) {
    if (securities[formIndex].view === 1 && securities[formIndex + 1].view === 2) {
      // se renderiza el boton de switch view
    } else if (securities[formIndex].view === 2) {
      // se renderiza el boton de switch view
    } else {

      return null;
    }
  } else if (securities[formIndex].view === 2) {
    // se renderiza el boton de switch view
  } else {

    return null;
  }


  const handleSwitchView = () => {
    const view = securities[formIndex].view === 1 ? 2 : 1;
    switchView({ formIndex, securities, calculateSecurities, view })
  }

  return (
    <Box sx={
      {
        position: 'absolute',
        top: formIndex === 0 ? '-50px' : '5px',
        right: '10px',

        zIndex: '2'
      }
    }>
      <Button variant="text" sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: securities[formIndex].view === 1 ? '#EF9713' : '#2D67EB',
        letterSpacing: '0.46px'
      }}
        onClick={handleSwitchView}>
        <span>
          {securities[formIndex].view === 1 ? 'SEE SECOND VIEW' : 'SEE FIRST VIEW'}
        </span>

        <Icon icon="material-symbols:wifi-protected-setup" color={securities[formIndex].view === 1 ? '#EF9713' : '#2D67EB'} width="24" height="24" />
      </Button>
    </Box>
  )
}
