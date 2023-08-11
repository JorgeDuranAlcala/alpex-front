// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// import { useTheme } from '@mui/material/styles'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Icon from 'src/@core/components/icon'

export type DialogProps = {
  openDialog: boolean
  title: string
  body: any
  subBody?: any
  resolve: () => void
  reject: () => void
  sublimits?: boolean
}
const DialogCustomAlpex = ({ openDialog, resolve, title, body, reject, subBody, sublimits }: DialogProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  // const theme = useTheme()
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClose = () => {
    setOpen(false)
    reject()
  }

  useEffect(() => {
    setOpen(openDialog)
  }, [openDialog])

  return (
    <Fragment>
      {/* // fullScreen={fullScreen} */}
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='responsive-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='responsive-dialog-title'>
          {title}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {sublimits ? (
            <>
              <DialogContentText id='alert-dialog-description' sx={{ mb: 2 }}>
                {body}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>{subBody}</DialogContentText>
            </>
          ) : (
            <DialogContentText id='alert-dialog-description'>{body}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          {sublimits ? (
            <Button onClick={resolve} sx={{ width: '20%', m: 2 }}>
              CANCEL
            </Button>
          ) : (
            <Button onClick={handleClose} sx={{ width: '20%', m: 2 }}>
              CANCEL
            </Button>
          )}

          {sublimits ? (
            <Button variant='contained' sx={{ width: '20%', m: 2 }} onClick={handleClose}>
              CONFIRM
            </Button>
          ) : (
            <Button variant='contained' sx={{ width: '20%', m: 2 }} onClick={resolve}>
              REMOVE
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogCustomAlpex
