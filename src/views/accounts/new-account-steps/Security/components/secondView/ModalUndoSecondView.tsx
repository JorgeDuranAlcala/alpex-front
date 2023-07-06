import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { SecondViewContext } from './SecondViewContext';


interface ModalUndoSecondViewProps {
  formIndex: number;
  securities: SecurityDto[];
  calculateSecurities: (securities: SecurityDto[]) => void;
}


export const ModalUndoSecondView = ({ formIndex, securities, calculateSecurities }: ModalUndoSecondViewProps) => {

  const { isOpenModalUndo, closeModalUndo, deleteSecondView } = useContext(SecondViewContext);

  const handleDeleteSecondView = () => {
    handleCloseModalUndo();
    deleteSecondView({
      formIndex,
      securities,
      calculateSecurities
    })
  }

  const handleCloseModalUndo = () => {
    closeModalUndo(formIndex);
  }

  return (
    <Dialog
      open={isOpenModalUndo[formIndex] || false}
      onClose={handleCloseModalUndo}
      aria-labelledby="alert-dialog-second-view"
      aria-describedby="alert-dialog-create-a-second-view"
    >
      <DialogTitle id="alert-dialog-second-view">
        Undo second view
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-create-a-second-view">
          <Box component="span" sx={{ display: 'block', mb: 2 }}>
            By undoing the second view, the premiums registered at the moment in the first view will be restored.
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCloseModalUndo}>CANCEL</Button>
        <Button variant="contained" onClick={handleDeleteSecondView} autoFocus>
          UNDO
        </Button>
      </DialogActions>
    </Dialog>
  )
}
