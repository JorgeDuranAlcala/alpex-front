import { useEffect, useState } from 'react'


// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import { IBroker } from '../broker-table'

const AddBroker = () => {
  const [newBroker, setNewBroker] = useState<IBroker>({ id: "0", name: '' })
  const [isBrokerSaved, setIsBrokerSaved] = useState(false)
  const [disableAddBroker, setDisableAddBroker] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)

  const addBroker = () => { //Call to add broker service
    console.log("call add broker service", newBroker.id)
    setIsBrokerSaved(true)
  }

  const editBroker = () => { //Call to edit broker service
    console.log("call edit broker service", newBroker.id)
  }

  const deleteBroker = () => { //Call to delete broker service
    console.log("call delete broker service", newBroker.id)
    setOpenDelete(false)
  }

  useEffect(() => {
    if (newBroker.name !== '') {
      setDisableAddBroker(false)
    } else {
      setDisableAddBroker(true)
    }

  }, [newBroker])

  return (
    <>
      <div className='add-broker'>
        <div className="inner-row">
          <div className="title">{isBrokerSaved ? "Broker details" : "Add Broker" }</div>
        </div>
        <div className="inner-row">
          <div className="description">
            {isBrokerSaved?
             'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Broker.'
             : "You can fill out the information below to Add a Broker. In ‘Contacts’ you can add one or morecontacts for this Broker."}

          </div>
        </div>
        <div className="inner-row">
          <div className="subtitle">Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Broker Name'
              value={newBroker.name}
              onChange={e => setNewBroker({ ...newBroker, ['name']: e.target.value })}
            />

          </FormControl>
          {isBrokerSaved ?
            <div className='action-buttons'>
              <Button className='delete-broker-btn' onClick={() => { setOpenDelete(true) }}>
                <div className='btn-icon'>
                  <Icon icon='mdi:delete-outline' />
                </div>
                DELETE
              </Button>
              <Button className='edit-broker-btn' variant='outlined' onClick={editBroker}>
                <div className='btn-icon'>
                  <Icon icon='mdi:pencil' />
                </div>
                EDIT
              </Button></div> :
            <div className='action-buttons'>
              <Button
                className='create-contact-btn'
                onClick={addBroker}
                disabled={disableAddBroker}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD BROKER
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
              sx={{maxWidth: "450px"}}
            >
              Are you sure you want to delete {newBroker.name}?</Typography>
              <ButtonClose
                onClick={() => {
                  setOpenDelete(false)
                }}
              >
                <CloseIcon />
              </ButtonClose>
            </HeaderTitleModal>
            <div className='delete-modal-text'>This action can’t be undone.</div>
            <Button className='header-modal-btn' variant='contained' onClick={deleteBroker}>
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

export default AddBroker
