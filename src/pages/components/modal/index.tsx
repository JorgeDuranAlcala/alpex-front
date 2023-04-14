import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { ReactNode, useState } from 'react'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

interface ICustomModal {
  width: string
  height: string
  bgColor: string
  top: string
  left: string
  open?: boolean
  setOpen?: any
  children: ReactNode
}

const CustomModal = ({ width, height, bgColor, top, left, children }: ICustomModal) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined' sx={{ width: '100%', height: '30px', fontSize: '13px' }}>
        Balance Preview
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: width,
            height: height,
            bgcolor: bgColor,
            top: top,
            left: left,
            boxShadow: 24,
            pl: 5,
            pr: 5,
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px'
          }}
        >
          <HeaderTitleModal>
            <Typography variant='h6'>Reinsurers in this account</Typography>
            <ButtonClose onClick={handleClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
