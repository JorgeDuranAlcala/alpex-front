import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { ReactNode, useState } from 'react'

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
      <Button onClick={handleOpen}>Open modal</Button>
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
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
