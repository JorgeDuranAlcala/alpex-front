import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { ICedant } from '../retrocedants-table'

// Hooks
// import { useUpdateById } from '@/hooks/catalogs/retroCedant'
// import { useDeleteCedant } from '@/hooks/catalogs/retroCedant/useDelete'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { fetchCedants } from '@/store/apps/catalogs/retroCedants'
// import { useAddCedant } from 'src/hooks/catalogs/retroCedant/useAdd'

const AddRetroCedant = () => {
  const [newRetroCedant, setNewRetroCedant] = useState<ICedant>({ id: 0, name: '' })
  const [isRetroCedantSaved, setIsRetroCedantSaved] = useState(false)
  const [disableAddRetroCedant, setDisableAddRetroCedant] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  // const { saveRetroCedant } = useAddRetroCedant()
  // const { deleteRetroCedant: deleteRetroCedants } = useDeleteRetroCedant()
  // const { update } = useUpdateById()

  // const dispatch = useAppDispatch()
  // const retroCedantReducer = useAppSelector(state => state.retroCedants)

  const triggerAlert = (type: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText('NEW CEDANT ADDED')
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

  const addRetroCedant = async () => {
    // const result = await saveRetroCedant({ name: newRetroCedant.name })
    // if (result) {
      // setNewRetroCedant({ id: result.id, name: result.name })
      triggerAlert('success')

      // dispatch(fetchRetroCedants(retroCedantReducer))
      setIsRetroCedantSaved(true)

    // }
  }

  const editRetroCedant = async () => {
    // const result = await update(newRetroCedant.id, newRetroCedant)
    // if (result) {
      // setNewRetroCedant({ id: result.id, name: result.name })
      // dispatch(fetchRetroCedants(retroCedantReducer))

      setIsRetroCedantSaved(true)
      triggerAlert('success')

    // } else {
      // triggerAlert('error')
    }


  const deleteRetroCedant = async () => {
    // const result = await deleteRetroCedants({ idDeleteList: [newRetroCedant.id] })
    // if (result) {
      triggerAlert('success')

      // dispatch(fetchRetroCedants(retroCedantReducer))
    // }
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
            />
          </FormControl>
          {isRetroCedantSaved ? (
            <div className='action-buttons'>
              <Button
                className='delete-btn'
                onClick={() => {
                  setOpenDelete(true)
                }}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:delete-outline' />
                </div>
                DELETE
              </Button>
              <Button className='edit-btn' variant='outlined' onClick={editRetroCedant}>
                <div className='btn-icon'>
                  <Icon icon='mdi:pencil' />
                </div>
                EDIT
              </Button>
            </div>
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

export default AddRetroCedant
