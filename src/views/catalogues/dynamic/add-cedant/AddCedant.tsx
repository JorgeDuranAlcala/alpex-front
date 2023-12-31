import { useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import { useAddCedant } from '@/hooks/catalogs/cedant'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { ICedant } from '../cedants-table'

// Hooks
// import { useUpdateById } from '@/hooks/catalogs/cedant'
// import { useDeleteCedant } from '@/hooks/catalogs/cedant/useDelete'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { fetchCedants } from '@/store/apps/catalogs/cedants'
// import { useAddCedant } from 'src/hooks/catalogs/cedant/useAdd'

const AddCedant = () => {
  const [newCedant, setNewCedant] = useState<ICedant>({ id: 0, name: '' })
  const [isCedantSaved, setIsCedantSaved] = useState(false)
  const [disableAddCedant, setDisableAddCedant] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')
  const [nameDisabled, setNameDisabled] = useState(false)

  //temp
  const [idCedant, setIdCedant] = useState(0)
  console.log(idCedant)

  //hooks
  const { saveCedant } = useAddCedant()

  //const { deleteCedant: deleteCedants } = useDeleteCedant()
  //const { update } = useUpdateById()

  // const { saveCedant } = useAddCedant()
  // const { deleteCedant: deleteCedants } = useDeleteCedant()
  // const { update } = useUpdateById()

  // const dispatch = useAppDispatch()
  // const cedantReducer = useAppSelector(state => state.cedants)

  const triggerAlert = (type: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText('NEW CEDANT ADDED')
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
    }, 5000)
  }

  const addCedant = async () => {
    // const result = await saveCedant({ name: newCedant.name })
    // if (result) {
    // setNewCedant({ id: result.id, name: result.name })
    console.log('addCedant')
    const result = await saveCedant({ name: newCedant.name })
    if (result) {
      setNewCedant({ id: result.id, name: result.name })
      triggerAlert('success-alert')
      setIdCedant(result.id)
      setNameDisabled(true)
      setIsCedantSaved(true)
    }
  }

  const editCedant = async () => {
    // const result = await update(newCedant.id, newCedant)
    // if (result) {
    // setNewCedant({ id: result.id, name: result.name })
    // dispatch(fetchCedants(cedantReducer))

    setIsCedantSaved(true)
    triggerAlert('success-alert')

    // } else {
    // triggerAlert('error-alert')
  }

  const deleteCedant = async () => {
    // const result = await deleteCedants({ idDeleteList: [newCedant.id] })
    // if (result) {
    triggerAlert('success-alert')

    // dispatch(fetchCedants(cedantReducer))
    // }
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
              <Button className='edit-btn' variant='outlined' onClick={editCedant}>
                <div className='btn-icon'>
                  <Icon icon='mdi:pencil' />
                </div>
                EDIT
              </Button>
            </div>
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

export default AddCedant
