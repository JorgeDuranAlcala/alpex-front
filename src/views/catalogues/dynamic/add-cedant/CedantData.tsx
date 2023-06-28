import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { ICedant } from '../cedants-table'

// Hooks
import { useAddCedant } from '@/hooks/catalogs/cedant'
import { useDeleteCedant } from '@/hooks/catalogs/cedant/useDelete'
import { useFindByIdCedant } from '@/hooks/catalogs/cedant/useFindById'
import { useUpdateById } from '@/hooks/catalogs/cedant/useUpdateById'
import { useRouter } from 'next/router'

interface ICedantData {
  idCedant: number
  setIdCedant: (id: number) => void
}

const CedantData = ({ idCedant, setIdCedant }: ICedantData) => {
  const [newCedant, setNewCedant] = useState<ICedant>({ id: 0, name: '' })
  const [isCedantSaved, setIsCedantSaved] = useState(false)
  const [disableAddCedant, setDisableAddCedant] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //new
  const [nameDisabled, setNameDisabled] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  //hooks
  const { saveCedant } = useAddCedant()
  const { update } = useUpdateById()
  const { deleteCedant: deleteCedants } = useDeleteCedant()
  const { setId, cedant } = useFindByIdCedant()

  //router
  const router = useRouter()

  useEffect(() => {
    if (idCedant !== 0) {
      setId(idCedant)
      setNewCedant({ id: idCedant, name: cedant?.name || '' })
      setIsCedantSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
    }
    //eslint-disable-next-line
  }, [idCedant, cedant])

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText(text || 'NEW BROKER ADDED')
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

  const addCedant = async () => {
    const result = await saveCedant({ name: newCedant.name })
    if (result) {
      setNewCedant({ id: result.id, name: result.name })
      triggerAlert('success-alert')
      setIdCedant(result.id)
      setNameDisabled(true)
      setIsCedantSaved(true)
    } else {
      triggerAlert('error-alert')
    }
  }

  const activeEditCedant = () => {
    setNameDisabled(false)
    setIsEditing(true)
  }

  const editCedant = async () => {
    const result = await update(newCedant.id, newCedant)
    if (result) {
      setNewCedant({ id: result.id, name: result.name })
      setIsCedantSaved(true)
      setNameDisabled(true)
      setIsEditing(false)
      triggerAlert('success-alert', 'CHANGES SAVED')
    } else {
      triggerAlert('error-alert')
    }
  }

  const deleteCedant = async () => {
    const result = await deleteCedants({ idDeleteList: [newCedant.id] })
    if (result) {
      triggerAlert('success-alert', 'DELETED')
      setIdCedant(0)
    } else {
      triggerAlert('error-alert')
    }
    setOpenDelete(false)
  }

  useEffect(() => {
    if (newCedant.name !== '') {
      setDisableAddCedant(false)
    } else {
      setDisableAddCedant(true)
    }
  }, [newCedant])

  return (
    <>
      <div className='add-new'>
        <div className='inner-row'>
          <div className='title'>{isCedantSaved ? 'Cedant details' : 'Add Cedant'}</div>
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
            {isCedantSaved
              ? 'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Cedant.'
              : 'You can fill out the information below to Add a Cedant. In ‘Contacts’ you can add one or morecontacts for this Cedant.'}
          </div>
        </div>
        <div className='inner-row'>
          <div className='subtitle'>Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Cedant Name'
              value={newCedant.name}
              onChange={e => setNewCedant({ ...newCedant, ['name']: e.target.value })}
              disabled={nameDisabled}
            />
          </FormControl>

          {isCedantSaved ? (
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
                <Button className='edit-broker-btn' variant='outlined' onClick={editCedant} disabled={disableAddCedant}>
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
                <Button className='edit-broker-btn' variant='outlined' onClick={activeEditCedant}>
                  <div className='btn-icon'>
                    <Icon icon='mdi:pencil' />
                  </div>
                  EDIT
                </Button>
              </div>
            )
          ) : (
            <div className='action-buttons'>
              <Button className='add-btn' onClick={addCedant} disabled={disableAddCedant}>
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD CEDANT
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
                  Are you sure you want to delete {newCedant.name}?
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
              <Button className='header-modal-btn' variant='contained' onClick={deleteCedant}>
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

export default CedantData
