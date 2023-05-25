import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { IBroker } from '../broker-table'

// Hooks
import { useUpdateById } from '@/hooks/catalogs/broker'
import { useDeleteBroker } from '@/hooks/catalogs/broker/useDelete'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchBrokers } from '@/store/apps/catalogs/brokers'
import { useAddBroker } from 'src/hooks/catalogs/broker/useAdd'

interface IBrokerData {
  idBroker: number
  setIdBroker: (id: number) => void
}

const BrokerData = ({ idBroker, setIdBroker }: IBrokerData) => {
  const [newBroker, setNewBroker] = useState<IBroker>({ id: 0, name: '' })
  const [isBrokerSaved, setIsBrokerSaved] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [disableAddBroker, setDisableAddBroker] = useState(true)
  const [nameDisabled, setNameDisabled] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  const { saveBroker } = useAddBroker()
  const { deleteBroker: deleteBrokers } = useDeleteBroker()
  const { update } = useUpdateById()

  const dispatch = useAppDispatch()
  const brokerReducer = useAppSelector(state => state.brokers)

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText(text || 'NEW BROKER ADDED')
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break
      default:
        break
    }

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  const addBroker = async () => {
    const result = await saveBroker({ name: newBroker.name })
    if (result) {
      setNewBroker({ id: result.id, name: result.name })
      triggerAlert('success')
      dispatch(fetchBrokers(brokerReducer))
      setIdBroker(result.id)
      setNameDisabled(true)
      setIsBrokerSaved(true)
    }
  }

  const activeEditBroker = () => {
    setNameDisabled(false)
    setIsEditing(true)
  }

  const editBroker = async () => {
    const result = await update(newBroker.id, newBroker)
    if (result) {
      setNewBroker({ id: result.id, name: result.name })
      dispatch(fetchBrokers(brokerReducer))
      setIsBrokerSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
      triggerAlert('success', 'CHANGES SAVED')
    } else {
      triggerAlert('error')
    }
  }

  const deleteBroker = async () => {
    const result = await deleteBrokers({ idDeleteList: [newBroker.id] })
    if (result) {
      triggerAlert('success')
      dispatch(fetchBrokers(brokerReducer))
    }
    setOpenDelete(false)
  }

  useEffect(() => {
    if (brokerReducer.current !== undefined && brokerReducer.current !== null && idBroker !== 0) {
      setNewBroker({ ...brokerReducer.current })
      setIsBrokerSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
    }

    //eslint-disable-next-line
  }, [brokerReducer.current, idBroker])

  useEffect(() => {
    if (newBroker.name !== '') {
      setDisableAddBroker(false)
    } else {
      setDisableAddBroker(true)
    }
  }, [newBroker])

  return (
    <>
      <div className='add-new'>
        <div className='inner-row'>
          <div className='title'>{isBrokerSaved ? 'Broker details' : 'Add Broker'}</div>
        </div>
        <div className='inner-row'>
          {showAlert && (
            <div className={`${alertType} add-new-alert`}>
              <div className='btn-icon'>
                <Icon icon={alertIcon} />
              </div>
              {alertText}
            </div>
          )}
        </div>
        <div className='inner-row'>
          <div className='description'>
            {isBrokerSaved
              ? 'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Broker.'
              : 'You can fill out the information below to Add a Broker. In ‘Contacts’ you can add one or morecontacts for this Broker.'}
          </div>
        </div>
        <div className='inner-row'>
          <div className='subtitle'>Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Broker Name'
              value={newBroker.name}
              onChange={e => setNewBroker({ ...newBroker, ['name']: e.target.value })}
              disabled={nameDisabled}
            />
          </FormControl>
          {isBrokerSaved ? (
            isEditing ? (
              <div className='action-buttons'>
                <Button
                  className='delete-broker-btn'
                  onClick={() => {
                    setOpenDelete(true)
                  }}
                >
                  <div className='btn-icon'>
                    <Icon icon='mdi:delete-outline' />
                  </div>
                  DELETE
                </Button>
                <Button className='edit-broker-btn' variant='outlined' onClick={editBroker} disabled={disableAddBroker}>
                  <div className='btn-icon'>
                    <Icon icon='mdi:content-save' />
                  </div>
                  SAVE
                </Button>{' '}
              </div>
            ) : (
              <div className='action-buttons'>
                <Button
                  className='delete-broker-btn'
                  onClick={() => {
                    setOpenDelete(true)
                  }}
                >
                  <div className='btn-icon'>
                    <Icon icon='mdi:delete-outline' />
                  </div>
                  DELETE
                </Button>
                <Button className='edit-broker-btn' variant='outlined' onClick={activeEditBroker}>
                  <div className='btn-icon'>
                    <Icon icon='mdi:pencil' />
                  </div>
                  EDIT
                </Button>
              </div>
            )
          ) : (
            <div className='action-buttons'>
              <Button className='add-btn' onClick={addBroker} disabled={disableAddBroker}>
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD BROKER
              </Button>
            </div>
          )}
          <Modal
            className='delete-modal'
            open={openDelete}
            onClose={() => {
              setOpenDelete(false)
            }}
          >
            <Box className='modal-wrapper'>
              <HeaderTitleModal>
                <Typography variant='h6' sx={{ maxWidth: '450px' }}>
                  Are you sure you want to delete {newBroker.name}?
                </Typography>
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

export default BrokerData
