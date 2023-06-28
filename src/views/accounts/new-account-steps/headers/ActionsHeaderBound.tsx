import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import StatusSelect from 'src/views/custom/select/StatusSelect'
import { ActionsHeaderBoundModal, ActionsHeaderBoundModalCancel } from './modals/ModalEndorsment'

// ** MUI Imports

interface IActionsHeaderProps {
  accountStatus: string
  sideHeader: boolean
}

const ButtonIcon = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  padding: '0px !important',
  maxWidth: '52px !important',
  '&:hover': {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  '&:focus': {}
})

const ActionsHeaderBound: React.FC<IActionsHeaderProps> = ({ accountStatus, sideHeader }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({})
  const [uneditableAccount, setUneditableAccount] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editInfo, setEditInfo] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showPrintOptions, setShowPrintOptions] = useState(false)
  const [cancellEndorsment, setCancellEndorsment] = useState(false)
  const [value, setValue] = useState('')

  const deleteAccount = () => {
    console.log('Deleted')
    setOpenDelete(false)
  }

  const downloadSpanish = () => {
    console.log('Spanish Download')
    setShowPrintOptions(false)
  }

  const downloadEnglish = () => {
    console.log('English Download')
    setShowPrintOptions(false)
  }

  useEffect(() => {
    if (sideHeader) {
      setUneditableAccount(false)
    }
  }, [sideHeader])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)

    // if (value === 'Informative') {

    // } else if (value === 'Cancellation') {

    // } else {

    // }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div className={sideHeader ? 'btnWrapperFth' : ' '}>
        <div className='btnWrappers'>
          {sideHeader ? '' : <div className='header-text'>Status:</div>}

          <div className='header-rows'>
            {sideHeader ? (
              ''
            ) : (
              <div className='header-btns'>
                <StatusSelect setSelectedStatus={setStatus} initialStatus={accountStatus || 'PENDING'} />
              </div>
            )}
            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setEditInfo(true)
                }}
                disabled={uneditableAccount}
              >
                <Icon icon='material-symbols:post-add' />
              </ButtonIcon>
            </div>

            <ActionsHeaderBoundModal
              setOpenHistory={setOpenHistory}
              uneditableAccount={uneditableAccount}
              openHistory={openHistory}
              handleSubmit={handleSubmit}
              value={value}
              handleRadioChange={handleRadioChange}
              setCancellEndorsment={setCancellEndorsment}
            />

            <ActionsHeaderBoundModalCancel
              setOpenHistory={setCancellEndorsment}
              openHistory={cancellEndorsment}
              cancel={setOpenHistory}
              uneditableAccount={uneditableAccount}
              value={value}
              setCancellEndorsment={setCancellEndorsment}
            />
            {/* )} */}

            <div className='header-btns'>
              <ButtonIcon
                className='print-button'
                onClick={() => {
                  setShowPrintOptions(!showPrintOptions)
                }}
                disabled={uneditableAccount}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:clock-outline' />
                </div>
                {showPrintOptions ? (
                  <div className='print-options'>
                    <div className='title'>Select a language</div>
                    <div className='language' onClick={downloadEnglish}>
                      English
                    </div>
                    <div className='language' onClick={downloadSpanish}>
                      Spanish
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </ButtonIcon>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                className='delete-button'
                onClick={() => {
                  setOpenDelete(true)
                }}
                disabled={uneditableAccount}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:printer' />
                </div>
              </ButtonIcon>

              <Modal
                className='delete-modal'
                open={openDelete}
                onClose={() => {
                  setOpenDelete(false)
                }}
              >
                <Box className='modal-wrapper'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Are you sure you want to delete this account?</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenDelete(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <div className='delete-modal-text'>This action can’t be undone.</div>
                  <Button className='header-modal-btn' variant='contained' onClick={deleteAccount}>
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
        </div>
      </div>
    </>
  )
}

export default ActionsHeaderBound
