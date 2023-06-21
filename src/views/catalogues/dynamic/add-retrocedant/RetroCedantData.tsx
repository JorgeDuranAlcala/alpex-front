import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { useAddRetroCedant, useGetRetroCedantById, useUpdateRetroCedant } from '@/hooks/catalogs/retroCedant'
import { useDeleteRetroCedant } from '@/hooks/catalogs/retroCedant/useDelete'
import { useRouter } from 'next/router'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { ICedant } from '../retrocedants-table'

// Hooks
// import { useUpdateById } from '@/hooks/catalogs/retroCedant'
// import { useDeleteCedant } from '@/hooks/catalogs/retroCedant/useDelete'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { fetchCedants } from '@/store/apps/catalogs/retroCedants'
// import { useAddCedant } from 'src/hooks/catalogs/retroCedant/useAdd'

interface IRetroCedantData {
  idRetroCedant: number
  setIdRetroCedant: (id: number) => void
}

const RetroCedantData = ({ idRetroCedant, setIdRetroCedant }: IRetroCedantData) => {
  const [newRetroCedant, setNewRetroCedant] = useState<ICedant>({ id: 0, name: '' })
  const [isRetroCedantSaved, setIsRetroCedantSaved] = useState(false)
  const [disableAddRetroCedant, setDisableAddRetroCedant] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //new
  const [nameDisabled, setNameDisabled] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  //hooks
  const { saveRetroCedant } = useAddRetroCedant()
  const { updateRetroCedant: update } = useUpdateRetroCedant()
  const { deleteRetroCedant: deleteRetroCedants } = useDeleteRetroCedant()
  const { setId, retroCedant } = useGetRetroCedantById()

  //router
  const router = useRouter()

  useEffect(() => {
    if (idRetroCedant !== 0) {
      setId(idRetroCedant)
      setNewRetroCedant({ id: idRetroCedant, name: retroCedant?.name || '' })
      setIsRetroCedantSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
    }

    //eslint-disable-next-line
  }, [idRetroCedant, retroCedant])

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText(text || 'NEW CEDANT ADDED')
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error-alert':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn-alert':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break
      default:
        break
    }

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
      text === 'DELETED' && router.push('/catalogues/dynamic/')
    }, 5000)
  }

  const addRetroCedant = async () => {
    const result = await saveRetroCedant({ name: newRetroCedant.name })
    if (result) {
      setNewRetroCedant({ id: result.id, name: result.name })
      triggerAlert('success-alert')
      setIdRetroCedant(result.id)
      setNameDisabled(true)
      setIsRetroCedantSaved(true)
    } else {
      triggerAlert('error-alert')
    }
  }

  const activeEditRetroCedant = () => {
    setNameDisabled(false)
    setIsEditing(true)
  }

  const editRetroCedant = async () => {
    const result = await update(newRetroCedant.id, newRetroCedant)
    if (result) {
      setNewRetroCedant({ id: result.id, name: result.name })
      setIsRetroCedantSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
      triggerAlert('success', 'CHANGES SAVED')
    } else {
      triggerAlert('error-alert')
    }
  }

  const deleteRetroCedant = async () => {
    const result = await deleteRetroCedants({ idDeleteList: [newRetroCedant.id] })
    if (result) {
      triggerAlert('success', 'DELETED')
      setIdRetroCedant(0)
    } else {
      triggerAlert('error-alert')
    }
    setOpenDelete(false)
  }

  useEffect(() => {
    if (newRetroCedant.name !== '') {
      setDisableAddRetroCedant(false)
    } else {
      setDisableAddRetroCedant(true)
    }
  }, [newRetroCedant])

  return (
    <>
      <div className='add-new'>
        <div className='inner-row'>
          <div className='title'>{isRetroCedantSaved ? 'Retro cedant details' : 'Add Retro Cedant'}</div>
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
            {isRetroCedantSaved
              ? 'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Retro Cedant.'
              : 'You can fill out the information below to Add a Retro Cedant. In ‘Contacts’ you can add one or morecontacts for this Retro Cedant.'}
          </div>
        </div>
        <div className='inner-row'>
          <div className='subtitle'>Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Retro Cedant Name'
              value={newRetroCedant.name}
              onChange={e => setNewRetroCedant({ ...newRetroCedant, ['name']: e.target.value })}
              disabled={nameDisabled}
            />
          </FormControl>

          {isRetroCedantSaved ? (
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
                <Button
                  className='edit-broker-btn'
                  variant='outlined'
                  onClick={editRetroCedant}
                  disabled={disableAddRetroCedant}
                >
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
                <Button className='edit-broker-btn' variant='outlined' onClick={activeEditRetroCedant}>
                  <div className='btn-icon'>
                    <Icon icon='mdi:pencil' />
                  </div>
                  EDIT
                </Button>
              </div>
            )
          ) : (
            <div className='action-buttons'>
              <Button className='add-btn' onClick={addRetroCedant} disabled={disableAddRetroCedant}>
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD RETRO CEDANT
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
                  Are you sure you want to delete {newRetroCedant.name}?
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
              <Button className='header-modal-btn' variant='contained' onClick={deleteRetroCedant}>
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

export default RetroCedantData
