import Icon from 'src/@core/components/icon'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { ReactNode, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

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
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const textColor = userThemeConfig.palette?.text.primary
  const weight = userThemeConfig.typography?.fontWeight.weight400
  const textSize = userThemeConfig.typography?.size.px20

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant='outlined'
        sx={{
          width: 'auto',
          height: '30px',
          fontSize: '13px',
          color: userThemeConfig.palette?.buttonText.primary,
          fontFamily: inter
        }}
      >
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
            <Typography
              variant='h6'
              sx={{ fontFamily: inter, color: textColor, fontWeight: weight, fontSize: textSize }}
            >
              Reinsurers in this account
            </Typography>

            <IconButton onClick={handleClose}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          </HeaderTitleModal>
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
