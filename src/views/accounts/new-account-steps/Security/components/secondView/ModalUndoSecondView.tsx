import { FormInformation, SecurityDto } from '@/services/accounts/dtos/security.dto'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { SecondViewContext } from './SecondViewContext'

interface ModalUndoSecondViewProps {
  securities: SecurityDto[]
  calculateSecurities: (securities: SecurityDto[]) => void
  information: FormInformation
}

export const ModalUndoSecondView = ({ securities, calculateSecurities, information }: ModalUndoSecondViewProps) => {
  const { isOpenModalUndo, closeModalUndo, deleteSecondView } = useContext(SecondViewContext)

  const handleDeleteSecondView = () => {
    handleCloseModalUndo()
    deleteSecondView({
      securities,
      calculateSecurities,
      information
    })
  }

  const handleCloseModalUndo = () => {
    closeModalUndo()
  }

  return (
    <Dialog
      open={isOpenModalUndo || false}
      onClose={handleCloseModalUndo}
      aria-labelledby='alert-dialog-second-view'
      aria-describedby='alert-dialog-create-a-second-view'
    >
      <DialogTitle id='alert-dialog-second-view'>Undo second view</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-create-a-second-view'>
          <Box component='span' sx={{ display: 'block', mb: 2 }}>
            By undoing the second view, the premiums registered at the moment in the first view will be restored.
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleCloseModalUndo}>
          CANCEL
        </Button>
        <Button variant='contained' onClick={handleDeleteSecondView} autoFocus>
          UNDO
        </Button>
      </DialogActions>
    </Dialog>
  )
}
