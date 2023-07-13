import { useContext } from 'react'

import {
  Box,
  Button,
  Modal,
} from '@mui/material'

import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'
import CloseIcon from '@mui/icons-material/Close'
import { LayoutSecurityContext } from '../../context/layoutSecurity/LayoutSecurityContext'


export const NextModal = () => {

  const { isOpenNextModal, handleCloseNextModal, handleNextStep } = useContext(LayoutSecurityContext)

  return (
    <Modal className='next-step-modal' open={isOpenNextModal} onClose={handleCloseNextModal}>
      <Box
        sx={{
          position: 'absolute',
          bgcolor: 'white',
          top: '50%',
          left: '50%',
          boxShadow: 24,
          pl: 5,
          pr: 5,
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          padding: '15px'
        }}
      >
        <HeaderTitleModal>
          <div className='next-modal-title'>Ready to continue?</div>
          <ButtonClose onClick={handleCloseNextModal}>
            <CloseIcon />
          </ButtonClose>
        </HeaderTitleModal>
        <div className='next-modal-text'>
          You are about to advance to the next form. Make sure that all the fields have been completed with the
          correct information.
        </div>
        <Button className='continue-modal-btn' variant='contained' onClick={handleNextStep}>
          CONTINUE
        </Button>
        <Button className='create-contact-modal' onClick={handleCloseNextModal}>
          Keep editing information
        </Button>
      </Box>
    </Modal>
  )
}
