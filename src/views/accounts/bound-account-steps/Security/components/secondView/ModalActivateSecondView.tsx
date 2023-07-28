import { FormInformation, SecurityDto } from '@/services/accounts/dtos/security.dto'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { SecondViewContext } from './SecondViewContext'

interface ModalActivateSecondViewProps {
  securities: SecurityDto[]
  calculateSecurities: (securities: SecurityDto[]) => void
  information: FormInformation
}

export const ModalActivateSecondView = ({
  securities,
  calculateSecurities,
  information
}: ModalActivateSecondViewProps) => {
  const { isOpenModal, closeModalSecondView, createSecondView } = useContext(SecondViewContext)

  const handleCreateSecondView = () => {
    handleCloseModal()
    createSecondView({
      securities,
      calculateSecurities,
      information
    })
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
        <Button variant='contained' onClick={handleCreateSecondView} autoFocus>
          CONTINUE
        </Button>
      </DialogActions>
    </Dialog>
  )
}
