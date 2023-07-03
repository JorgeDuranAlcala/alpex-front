import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'

interface IModalBordereaux {
  headingText: string
  text: string
  handleClickContinue?: () => void
  handleClickCancel?: () => void
  renderButton: (handleOpen: () => void) => JSX.Element
  setShow: boolean
  onClose?: () => void
}

const ModalBordereaux: React.FC<IModalBordereaux> = ({
  headingText,
  text,
  onClose,
  handleClickCancel,
  setShow = false
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  // ** handlers for continue and cancel
  // const onContinue = () => {
  //   handleClose()
  //   handleClickContinue()
  // }

  const onCancel = () => {
    handleClose()
    if (handleClickCancel) {
      handleClickCancel()
    }
  }

  // ** Handlers for opening and closing
  // const handleOpen = () => setOpen(true)
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
  // const ButtonComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  //   return renderButton(onClick)
  // }

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
      {setShow && (
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
                padding: '47px 0 16px 0'
              }}
            >
              <CardContent>
                <IconButton
                  aria-label='close'
                  onClick={handleClose}
                  sx={{ top: 15, right: 10, position: 'absolute', color: 'grey.500' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '208px',

                    justifyContent: 'space-between'
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '64px',

                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='h5' component='div'>
                      {headingText}
                    </Typography>
                    <Typography component='div'>{text}</Typography>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Select Reinsurer</InputLabel>
                    <Select
                      value={value}
                      label='Select Reinsurer'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Select Binder</InputLabel>
                    <Select
                      value={value}
                      label='Select Binder'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100px',
                    justifyContent: 'space-between',
                    mt: 10
                  }}
                >
                  <Button variant='contained' size='large' sx={{ width: '100%' }}>
                    Download
                  </Button>
                  <Button onClick={onCancel} size='large' sx={{ width: '100%' }}>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Modal>
      )}
    </Box>
  )
}

export default ModalBordereaux

{
  /* <ButtonComponent onClick={handleOpen} /> */
}
