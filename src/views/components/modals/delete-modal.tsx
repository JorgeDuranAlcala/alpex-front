import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

interface IDeleteModal {
  openModal: boolean
  onCloseModal: () => void
  onDelete: () => void
  textItem: string
}

const DeleteModal: React.FC<IDeleteModal> = ({ openModal, onCloseModal, onDelete, textItem }) => {
  return (
    <Modal className='delete-modal' open={openModal} onClose={onCloseModal}>
      <Box className='modal-wrapper'>
        <HeaderTitleModal>
          <Typography variant='h6'>Are you sure you want to delete this {textItem} ? </Typography>
          <ButtonClose onClick={onCloseModal}>
            <CloseIcon />
          </ButtonClose>
        </HeaderTitleModal>
        <div className='delete-modal-text'>This action can’t be undone.</div>
        <Button className='header-modal-btn' variant='contained' onClick={onDelete}>
          DELETE
        </Button>
        <Button className='close-modal header-modal-btn' onClick={onCloseModal}>
          CANCEL
        </Button>
      </Box>
    </Modal>
  )
}
export default DeleteModal
