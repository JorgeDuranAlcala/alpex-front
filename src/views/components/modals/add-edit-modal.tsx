// ** React Imports
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, FormHelperText, Modal, TextField, Typography } from '@mui/material';

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled';


interface IAddEditModal {
  openModal: boolean;
  onSubmit: (value: string) => void
  onClose: () => void
  title: string
  label: string
  errorMsg?:string
  actionBtnText?: string
}



const AddEditModal: React.FC<IAddEditModal> = ({openModal, onClose, onSubmit, title, label, errorMsg = 'Required field', actionBtnText='CONFIRM' }) => {
  const [value, setValue] = useState('')
  const [disableBtn, setDisableBtn] = useState(true)
  const [error, setError] = useState(false)
  const handleChangeModal = (value: string) =>{
    setValue(value)
    if(value !== ''){
      setDisableBtn(false)
      setError(false)
    }else{
      setError(true)
      setDisableBtn(true)
    }
  }

  return (
    <Modal className='create-contact-modal' open={openModal} onClose={() => onClose}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>{title}</Typography>
            <ButtonClose onClick={() => onClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                className='new-value'
                label={label}
                value={value}
                onChange={e => handleChangeModal(e.target.value)}
              />

              {error && <FormHelperText sx={{ color: 'error.main' }}>{errorMsg}</FormHelperText>}
            </FormControl>

          </div>
          <Button
            className='action-btn-modal'
            disabled={disableBtn}
            variant='contained'
            onClick={()=>{
              onSubmit(value)
            }}
          >
            {actionBtnText}
          </Button>
          <Button className='delete-modal' onClick={onClose}>
            CANCEL
          </Button>
        </Box>
      </Modal>
  )
}
export default AddEditModal

