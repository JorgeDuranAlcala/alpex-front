import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import StatusSelect from 'src/pages/components/custom/select/StatusSelect'

// ** MUI Imports

/* eslint-disable */

//Pending types

const ModalUploadImage = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const randomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4']

    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <>
      <div className='header-form-main'>
        <Button
          id='basic-button'
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}
        >
          <div className='header-menu'>
            <Icon icon='ic:baseline-file-upload' style={{ display: 'block', margin: 'auto' }} fontSize={20} />
            <span style={{ display: 'block' }}>Logo</span>
          </div>
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemText>Upload Company Logo</ListItemText>
            <ListItemIcon>
              <Icon icon='ic:baseline-file-upload' style={{ marginLeft: 'auto' }} fontSize={20} />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText>Use a Text-Based Logo </ListItemText>
            <ListItemIcon>
              <Icon icon='ph:text-a-underline-bold' style={{ marginLeft: 'auto' }} fontSize={20} />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Upload image
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <input type='file' onChange={handleImageChange} />
            <img src={imagePreview} alt='' />
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

const FormHeader = () => {
  const [status, setStatus] = useState({})
  return (
    <>
      <div className='form-header-data'>
        <div className='form-header'>
          <div className='form-header-section'>
            <ModalUploadImage />
            <div className='double-gap'>
              <span className='form-header-title2'>Insured name</span>
              <span className='block blue-subtitle'>#001</span>
            </div>
          </div>
          <div className='form-header-section'>
            <span className='form-header-title'>Status: </span>
            <span className='form-header-subtitle'>
              <StatusSelect setSelectedStatus={setStatus} />{' '}
            </span>
          </div>
          <div className='form-header-section'>
            <span className='form-header-title'>Net premium:</span>
            <span className='form-header-subtitle'>$5000 USD </span>
          </div>
          <div className='form-header-section'>
            <span className='form-header-title'>Registration date:</span>
            <span className='form-header-subtitle'>22 Oct 2022 </span>
          </div>
        </div>
        <div className='form-header2'>
          <span className=''>Created 2 hours ago</span>
        </div>
      </div>
    </>
  )
}

export default FormHeader
