import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

interface IDeleteModal {
  openModal: boolean
  onClose: () => void
  onDelete: () => void
  textItem: string
}

const InactivityModal: React.FC<IDeleteModal> = ({ openModal, onClose, onDelete, textItem }) => {
  return (
    <Modal
      className='delete-modal'
      open={openModal}
      onClose={() => {
        onClose
      }}
    >
      <Box className='modal-wrapper'>
        <HeaderTitleModal>
          <Typography variant='h6'>Are you sure you want to delete this {textItem} ? </Typography>
          <ButtonClose
            onClick={() => {
              onClose
            }}
          >
            <CloseIcon />
          </ButtonClose>
        </HeaderTitleModal>
        <div className='delete-modal-text'>This action can’t be undone.</div>
        <Button className='header-modal-btn' variant='contained' onClick={onDelete}>
          DELETE
        </Button>
        <Button
          className='close-modal header-modal-btn'
          onClick={() => {
            onClose
          }}
        >
          CANCEL
        </Button>
      </Box>
    </Modal>
  )
}
export default InactivityModal
