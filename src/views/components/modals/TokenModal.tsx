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
  remainingTime: string
  handleClickContinue: () => void
  handleClickCancel?: () => void
  renderButton: (handleOpen: () => void) => JSX.Element
  setShow?: boolean
  onClose?: () => void
}

const ModalTokenAction: React.FC<IModalAction> = ({
  headingText,
  text,
  handleClickContinue,
  handleClickCancel,
  renderButton,
  onClose,
  remainingTime,
  setShow = false
}) => {
  // ** State
  const [open, setOpen] = useState(false)

  // ** handlers for continue and cancel
  const onContinue = () => {
    setOpen(false)
    handleClickContinue()
  }

  const onCancel = () => {
    handleClose()
    if (handleClickCancel) {
      handleClickCancel()
    }
  }

  // ** Handlers for opening and closing
  const handleOpen = () => setOpen(true)
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
  const ButtonComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return renderButton(onClick)
  }

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
      <ButtonComponent onClick={handleOpen} />
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
              <Typography variant='body2' component='div' sx={{ marginTop: 1.5 }}>
                {text}
              </Typography>
              <Box
                sx={{
                  marginTop: 6,
                  marginBottom: 2,
                  height: 65,
                  background: 'rgba(76, 78, 100, 0.04)',
                  borderRadius: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0px'
                }}
              >
                <Typography
                  variant='h4'
                  component='div'
                  sx={{
                    margin: 'auto 1px',
                    display: 'flex'
                  }}
                >
                  {remainingTime}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
              <Button onClick={onCancel} variant='contained' size='large' sx={{ width: '100%' }}>
                EXTEND SESSION
              </Button>
              <Button onClick={onContinue} size='large' sx={{ width: '100%', marginTop: '20px' }}>
                LOG OUT
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ModalTokenAction
