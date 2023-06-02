import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Imports
import {
  useAddReinsuranceCompany,
  useGetReinsuranceCompanyById,
  useUpdateReinsuranceCompany
} from '@/hooks/catalogs/reinsuranceCompany'
import { useDeleteReinsuranceCompany } from '@/hooks/catalogs/reinsuranceCompany/useDelete'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import { IReinsurer } from '../reinsurers-table'

interface IReinsuranceCompanyData {
  idReinsuranceCompany: number
  setIdReinsuranceCompany: (id: number) => void
}

const ReinsurerData = ({ idReinsuranceCompany, setIdReinsuranceCompany }: IReinsuranceCompanyData) => {
  const [newReinsuranceCompany, setNewReinsuranceCompany] = useState<IReinsurer>({ id: 0, name: '' })
  const [isReinsuranceCompanySaved, setIsReinsuranceCompanySaved] = useState(false)
  const [disableAddReinsuranceCompany, setDisableAddReinsuranceCompany] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')
  const [suscriptionValue, setSuscriptionValue] = useState('1')
  const [isEditing, setIsEditing] = useState(false)
  const [nameDisabled, setNameDisabled] = useState(false)

  //hooks
  const { addReinsuranceCompany } = useAddReinsuranceCompany()
  const { deleteReinsuranceCompany: deleteReinsuranceCompanys } = useDeleteReinsuranceCompany()
  const { updateReinsuranceCompany: update } = useUpdateReinsuranceCompany()
  const { setId, reinsuranceCompany } = useGetReinsuranceCompanyById()

  useEffect(() => {
    if (idReinsuranceCompany !== 0) {
      setId(idReinsuranceCompany)
      setNewReinsuranceCompany({ id: idReinsuranceCompany, name: reinsuranceCompany?.name || '' })
      setIsReinsuranceCompanySaved(true)
      setNameDisabled(true)
      setIsEditing(false)
    }
    //eslint-disable-next-line
  }, [idReinsuranceCompany, reinsuranceCompany])

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText(text || 'NEW REINSURER ADDED')
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

  const addReinsurer = async () => {
    console.log(suscriptionValue)
    const result = await addReinsuranceCompany({
      name: newReinsuranceCompany.name,
      idSubscriptionType: parseInt(suscriptionValue)
    })
    if (result) {
      setNewReinsuranceCompany({ id: result.id, name: result.name })
      triggerAlert('success')
      setIdReinsuranceCompany(result.id)
      setNameDisabled(true)
      setIsReinsuranceCompanySaved(true)
    } else {
      triggerAlert('error')
    }
  }

  const activeEditReinsuranceCompany = () => {
    setNameDisabled(false)
    setIsEditing(true)
  }

  const editReinsurer = async () => {
    const result = await update(newReinsuranceCompany.id, {
      ...newReinsuranceCompany,
      idSubscriptionType: parseInt(suscriptionValue)
    })
    if (result) {
      setNewReinsuranceCompany({ id: result.id, name: result.name })
      setIsReinsuranceCompanySaved(true)
      setNameDisabled(true)
      setIsEditing(false)
      triggerAlert('success', 'CHANGES SAVED')
    } else {
      triggerAlert('error')
    }
  }

  const deleteReinsurer = async () => {
    const result = await deleteReinsuranceCompanys({ idDeleteList: [newReinsuranceCompany.id] })
    if (result) {
      triggerAlert('success')
      setIdReinsuranceCompany(0)
    } else {
      triggerAlert('error')
    }
    setOpenDelete(false)
  }

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSuscriptionValue((event.target as HTMLInputElement).value)
  }

  useEffect(() => {
    if (newReinsuranceCompany.name !== '') {
      setDisableAddReinsuranceCompany(false)
    } else {
      setDisableAddReinsuranceCompany(true)
    }
  }, [newReinsuranceCompany])

  return (
    <>
      <div className='add-new'>
        <div className='inner-row'>
          <div className='title'>{isReinsuranceCompanySaved ? 'Reinsurer details' : 'Add Reinsurer'}</div>
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
            {isReinsuranceCompanySaved
              ? 'You can edit the information below. In ‘Contacts’ you can add one or more contacts for this Reinsurer.'
              : 'You can fill out the information below to Add a Reinsurer. In ‘Contacts’ you can add one or morecontacts for this Reinsurer.'}
          </div>
        </div>
        <div className='inner-row'>
          <div className='subtitle'>Basic Info</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='ReinsuranceCompany Name'
              value={newReinsuranceCompany.name}
              onChange={e => setNewReinsuranceCompany({ ...newReinsuranceCompany, ['name']: e.target.value })}
              disabled={nameDisabled}
            />
          </FormControl>
          <div className='inner-row'>
            <div className='subtitle'>Subscription under</div>
            <RadioGroup
              row
              aria-label='controlled'
              name='controlled'
              value={suscriptionValue}
              onChange={handleChangeRadio}
            >
              <FormControlLabel value='1' control={<Radio />} label='Gross premium' />
              <FormControlLabel value='2' control={<Radio />} label='Net premium' />
            </RadioGroup>
          </div>
          {isReinsuranceCompanySaved ? (
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
                  onClick={editReinsurer}
                  disabled={disableAddReinsuranceCompany}
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
                <Button className='edit-broker-btn' variant='outlined' onClick={activeEditReinsuranceCompany}>
                  <div className='btn-icon'>
                    <Icon icon='mdi:pencil' />
                  </div>
                  EDIT
                </Button>
              </div>
            )
          ) : (
            <div className='action-buttons'>
              <Button className='add-btn' onClick={addReinsurer} disabled={disableAddReinsuranceCompany}>
                <div className='btn-icon'>
                  <Icon icon='mdi:check' />
                </div>
                ADD REINSURER
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
                  Are you sure you want to delete {newReinsuranceCompany.name}?
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

export default ReinsurerData
