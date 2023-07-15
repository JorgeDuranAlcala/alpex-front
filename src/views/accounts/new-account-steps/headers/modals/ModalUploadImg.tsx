import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'
import {
  ButtonClose,
  ContentModalUpload,
  FormContainerUpload,
  HeaderTitleModal
} from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

export const ModalUploadImg = ({ setOpenHistory, openHistory }: any) => {
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState(null)

  const handleDragStart = () => {
    setDragging(true)
  }

  const handleDragEnd = () => {
    setDragging(false)
  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    setDragging(false)

    const file = event.dataTransfer.files[0]
    const reader = new FileReader()

    reader.onload = (e: any) => {
      setImage(e.target.result)
    }

    reader.readAsDataURL(file)
  }

  const handleDragOver = (event: any) => {
    event.preventDefault()
  }

  return (
    <div>
      <Modal
        open={openHistory}
        onClose={() => {
          setOpenHistory(false)
        }}
        sx={{ outline: 'none' }}
      >
        <Box className='modal-wrapper' sx={{ padding: '20px', minWidth: '505px', minHeight: '533px' }}>
          <HeaderTitleModal style={{ justifyContent: 'flex-end', marginBottom: '0px' }}>
            <ButtonClose
              onClick={() => {
                setOpenHistory(false)
              }}
              sx={{ color: '#646776' }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <ContentModalUpload>
            <div className='title'>Upload company logo</div>
          </ContentModalUpload>
          <FormContainerUpload>
            <div
              className={`drag-container ${dragging ? 'dragging' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {image ? (
                <img src={image} alt='Dragged' className='dragged-image' />
              ) : (
                <div className='drag-box' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <label>
                    {' '}
                    DROP YOUR IMAGE HERE OR CLICK TO BROWSE <input type='file' className='fileSubmit' />
                  </label>
                </div>
              )}
            </div>

            <p className='txt'>Accepted File Types: .jpg, .jpeg, .png </p>
            <p className='txt' style={{ marginBottom: '60px' }}>
              Image must not exceed 5 MB.
            </p>
            <Button
              variant='contained'
              sx={{ marginBottom: '0' }}
              onClick={() => console.log('hola')}
              disabled={dragging}
            >
              DONE
            </Button>
          </FormContainerUpload>
        </Box>
      </Modal>
    </div>
  )
}
