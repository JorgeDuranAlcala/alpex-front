// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface IModalAction {
  headingText: string
  text: string
  handleClickContinue: () => void
  handleClickCancel?: () => void
  setShow?: boolean
  onClose?: () => void
  continueText?: string
}

const ModalAction: React.FC<IModalAction> = ({
  headingText,
  text,
  handleClickContinue,
  handleClickCancel,
  onClose,
  continueText,
  setShow = false
}) => {
  // ** State
  const [open, setOpen] = useState(false)

  // ** handlers for continue and cancel
  const onContinue = () => {
    handleClose()
    handleClickContinue()
  }

  const onCancel = () => {
    handleClose()
    if (handleClickCancel) {
      handleClickCancel()
    }
  }

  // ** Handlers for opening and closing
  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      return
    }
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }

  // ** Component

  // ** Hooks
  useEffect(() => {
    if (setShow) {
      setOpen(true)
    }
  }, [setShow])

  const backdropProps = {
    timeout: 500
  }

  return (
    <Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={(event, reason) => handleClose(event, reason)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: backdropProps
        }}
      >
        <Fade in={open}>
          <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              padding: '56px 0 26px 0'
            }}
          >
            <CardContent>
              <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
              >
                <Icon icon='mdi:close' />
              </IconButton>
              <Typography variant='h5' component='div'>
                {headingText}
              </Typography>
              <Typography component='div'>{text}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
              <Button onClick={onContinue} variant='contained' size='large' sx={{ width: '100%' }}>
                {continueText ? continueText : 'Continue'}
              </Button>
              <Button onClick={onCancel} size='large' sx={{ width: '100%', marginTop: '20px' }}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ModalAction
