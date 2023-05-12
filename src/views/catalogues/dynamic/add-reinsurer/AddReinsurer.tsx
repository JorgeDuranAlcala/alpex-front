import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { IReinsurer } from '../reinsurers-table'

const AddReinsurer = () => {
  const [newReinsurer, setNewReinsurer] = useState<IReinsurer>({ id: "0", name: '' })
  const [isReinsurerSaved, setIsReinsurerSaved] = useState(false)
  const [disableAddReinsurer, setDisableAddReinsurer] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true);
  const [alertType, setAlertType] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertIcon, setAlertIcon] = useState('');

  const triggerAlert = (type: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText('NEW REINSURER ADDED')
        setAlertIcon('mdi:check-circle-outline')
        break;
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break;
      case 'warn':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break;
      default:
        break
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const addReinsurer = () => { //Call to add broker service
    console.log("call add reinsurer service", newReinsurer.id)
    setIsReinsurerSaved(true)
  }

  const editReinsurer = () => { //Call to edit broker service
    console.log("call edit reinsurer service", newReinsurer.id)
    triggerAlert('success')

    // triggerAlert('error')
    // triggerAlert('warn')
  }

  const deleteReinsurer = () => { //Call to delete broker service
    console.log("call delete reinsurer service", newReinsurer.id)
    setOpenDelete(false)
  }

  useEffect(() => {
    if (newReinsurer.name !== '') {
      setDisableAddReinsurer(false)
    } else {
      setDisableAddReinsurer(true)
    }

  }, [newReinsurer])

  return (
    <>
      <div className='add-new'>
        <div className="inner-row">
          <div className="title">{isReinsurerSaved ? "Reinsurer details" : "Add Reinsurer"}</div>
        </div>
        <div className='inner-row'>
          {showAlert &&
            <div className={`${alertType} add-new-alert`}>
              <div className='btn-icon'>
                <Icon icon={alertIcon} />
              </div>
              {alertText}
            </div>}
        </div>
        <div className="inner-row">
          <div className="description">
            {isReinsurerSaved ?
              'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Reinsurer.'
              : "You can fill out the information below to Add a Reinsurer. In ‘Contacts’ you can add one or morecontacts for this Reinsurer."}

          </div>
        </div>
        <div className="inner-row">
          <div className="subtitle">Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Broker Name'
              value={newReinsurer.name}
              onChange={e => setNewReinsurer({ ...newReinsurer, ['name']: e.target.value })}
            />

          </FormControl>
          {isReinsurerSaved ?
            <div className='action-buttons'>
              <Button className='delete-reinsurer-btn' onClick={() => { setOpenDelete(true) }}>
                <div className='btn-icon'>
                  <Icon icon='mdi:delete-outline' />
                </div>
                DELETE
              </Button>
              <Button className='edit-reinsurer-btn' variant='outlined' onClick={editReinsurer}>
                <div className='btn-icon'>
                  <Icon icon='mdi:pencil' />
                </div>
                EDIT
              </Button></div> :
            <div className='action-buttons'>
              <Button
                className='create-contact-btn'
                onClick={addReinsurer}
                disabled={disableAddReinsurer}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD REINSURER
              </Button>
            </div>
          }
          <Modal
            className='delete-modal'
            open={openDelete}
            onClose={() => {
              setOpenDelete(false)
            }}
          >
            <Box className='modal-wrapper'>
              <HeaderTitleModal>
                <Typography
                  variant='h6'
                  sx={{ maxWidth: "450px" }}
                >
                  Are you sure you want to delete {newReinsurer.name}?</Typography>
                <ButtonClose
                  onClick={() => {
                    setOpenDelete(false)
                  }}
                >
                  <CloseIcon />
                </ButtonClose>
              </HeaderTitleModal>
              <div className='delete-modal-text'>This action can’t be undone.</div>
              <Button className='header-modal-btn' variant='contained' onClick={deleteReinsurer}>
                DELETE
              </Button>
              <Button
                className='close-modal header-modal-btn'
                onClick={() => {
                  setOpenDelete(false)
                }}
              >
                CANCEL
              </Button>
            </Box>
          </Modal>
        </div>

      </div>
    </>


  )
}

export default AddReinsurer
