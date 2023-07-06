import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { Icon } from '@iconify/react';
import { Box, Button, styled } from '@mui/material';
import { useContext } from 'react';
import { SecondViewContext } from './SecondViewContext';


const UndoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',

  // backgroundColor: 'lightcoral',
  width: '100%',
  zIndex: '1',
  [theme.breakpoints.down('md')]: {
    top: '-116px',
  }

}))

const AlertContainer = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  backgroundColor: '#2D2F39',
  color: '#FFFFFF',
  padding: '6px 16px',
  boxShadow: '0px 2px 10px 0px rgba(76, 78, 100, 0.22)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  }

}))

interface UndoSecondViewProps {
  formIndex: number;
  securities: SecurityDto[];
  calculateSecurities: (securities: SecurityDto[]) => void;
}

export const UndoSecondView = ({ formIndex }: UndoSecondViewProps) => {


  const { openModalUndo } = useContext(SecondViewContext);


  const handleOpenModalUndo = () => {
    openModalUndo(formIndex)
  }

  return (
    <UndoContainer sx={{

      top: formIndex === 1 ? '-80px' : '-40px',
    }}>
      <AlertContainer >

        <span>You are now on the secondary view, you are not able to edit information here.</span>
        <Button variant="text" sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#EF9713',
          letterSpacing: '0.46px'
        }}
          onClick={handleOpenModalUndo}>
          <span>
            UNDO VIEW
          </span>

          <Icon icon="ic:round-undo" color="#ef9713" width="24" height="24" />
        </Button>
      </AlertContainer>
    </UndoContainer>
  )
}
