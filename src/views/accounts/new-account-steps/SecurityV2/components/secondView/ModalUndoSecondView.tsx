import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { SecondViewContext } from '../../context/secondView/SecondViewContext'

export const ModalUndoSecondView = () => {
  const { isOpenModalUndo, closeModalUndo, handleDeleteSecondView } = useContext(SecondViewContext)

  const onDeleteSecondView = () => {
    handleCloseModalUndo()
    handleDeleteSecondView()
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
        <Button variant='contained' onClick={onDeleteSecondView} autoFocus>
          UNDO
        </Button>
      </DialogActions>
    </Dialog>
  )
}
