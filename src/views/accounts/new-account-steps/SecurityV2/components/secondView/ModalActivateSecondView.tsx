import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { SecondViewContext } from '../../context/secondView/SecondViewContext'

export const ModalActivateSecondView = () => {
  const { isOpenModal, closeModalSecondView, handleCreateSecondView } = useContext(SecondViewContext)

  const onCreateSecondView = () => {
    handleCloseModal()
    handleCreateSecondView()
  }

  const handleCloseModal = () => {
    closeModalSecondView()
  }

  return (
    <Dialog
      open={isOpenModal}
      onClose={closeModalSecondView}
      aria-labelledby='alert-dialog-second-view'
      aria-describedby='alert-dialog-create-a-second-view'
    >
      <DialogTitle id='alert-dialog-second-view'>You are about to generate a second view</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-create-a-second-view'>
          <Box component='span' sx={{ display: 'block', mb: 2 }}>
            Editing this field will generate a second view with the information registered in Form 1: Information.
          </Box>
          <Box component='span'>You will be able to edit on the first view and visualize on the second view</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleCloseModal}>
          CANCEL
        </Button>
        <Button variant='contained' onClick={onCreateSecondView} autoFocus>
          CONTINUE
        </Button>
      </DialogActions>
    </Dialog>
  )
}
