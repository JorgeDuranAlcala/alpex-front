import useDownloadDebitNote from '@/hooks/reports/useDownloadDebitNote'
import { useAppSelector } from '@/store'
import { delayMs } from '@/utils/formatDates'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, Modal, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import StatusSelect from 'src/views/custom/select/StatusSelect'
import { ActionsHeaderBoundModal, ActionsHeaderBoundModalCancel } from './modals/ModalEndorsment'

// ** MUI Imports

interface IActionsHeaderProps {
  accountStatus: string
  sideHeader: boolean
  setActiveEndorsement?: any
}

interface StatusHistory {
  id: number
  name: string
  date: string
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

const statusHistory: StatusHistory[] = [
  {
    id: 1,
    name: 'Account creation',
    date: '11 / December / 2020'
  },
  {
    id: 2,
    name: 'Bound status',
    date: '11 / January / 2021'
  }
]

const ActionsHeaderBound: React.FC<IActionsHeaderProps> = ({ accountStatus, sideHeader, setActiveEndorsement }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({})
  const [uneditableAccount, setUneditableAccount] = useState(false)
  const [openEndorsment, setOpenEndorsment] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [cancellEndorsment, setCancellEndorsment] = useState(false)
  const [value, setValue] = useState('')

  // Notifications
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // ** Store
  const account = useAppSelector(state => state.accounts?.formsData?.form1)

  // ** Custom Hooks
  const { getDebitNote } = useDownloadDebitNote()

  // const downloadSpanish = () => {
  //   console.log('Spanish Download')
  //   setShowPrintOptions(false)
  // }

  // const downloadEnglish = () => {
  //   console.log('English Download')
  //   setShowPrintOptions(false)
  // }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleDebitNote = async () => {
    if (account && account.id) {
      setBadgeData({
        message: `DOWNLOADING DEBIT NOTE`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='primary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })
      await delayMs(1000)

      try {
        const debitNoteBuffer = await getDebitNote({ idAccount: account.id })

        if (debitNoteBuffer) {
          setBadgeData({
            message: `DOWNLOADED`,
            status: 'success',
            open: true,
            icon: <Icon icon='ic:baseline-check-circle' />,
            theme: 'success',
            disableAutoHide: true
          })
          await delayMs(1000)

          const fileToDownload = new File([debitNoteBuffer], `DEBIT NOTE ID-${account.id}.xlsx`)
          const downloadUrl = URL.createObjectURL(fileToDownload)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = fileToDownload.name
          link.click()
        }
      } catch (error) {
        setBadgeData({
          message: `UNKNOWN ERROR, TRY AGAIN`,
          theme: 'error',
          open: true,
          status: 'error',
          icon: (
            <Icon
              style={{
                color: '#FF4D49',
                marginTop: '-1px'
              }}
              icon='jam:alert'
            />
          ),
          disableAutoHide: true
        })
      }
      await delayMs(1500)

      setBadgeData({
        message: '',
        status: undefined,
        icon: undefined,
        open: false
      })
    }
  }

  useEffect(() => {
    if (sideHeader) {
      setUneditableAccount(false)
    }
  }, [sideHeader])

  return (
    <>
      <CustomAlert {...badgeData} />
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
              <ButtonIcon onClick={handleDebitNote} disabled={uneditableAccount} title='DEBIT NOTE'>
                <Icon icon='material-symbols:post-add' />
              </ButtonIcon>
            </div>
            {/* ESTE ES EL MODAL QUE SE DESPLIEGA CUANDO SE GENERA EL ENDORSEMENT*/}
            <ActionsHeaderBoundModal
              setOpenHistory={setOpenHistory}
              uneditableAccount={uneditableAccount}
              openHistory={openHistory}
              handleSubmit={handleSubmit}
              value={value}
              handleRadioChange={handleRadioChange}
              setCancellEndorsment={setCancellEndorsment}
              setActiveEndorsement={setActiveEndorsement}
            />
            {/* ESTE ES EL MODAL QUE SE DESPLIEGA CUANDO SE VA POR LA RUTA DE CANCELACIÓN */}
            <ActionsHeaderBoundModalCancel
              setOpenHistory={setCancellEndorsment}
              openHistory={cancellEndorsment}
              cancel={setOpenHistory}
              uneditableAccount={uneditableAccount}
              value={value}
              setCancellEndorsment={setCancellEndorsment}
            />

            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenEndorsment(true)
                }}
                title='ENDT. HISTORY'
                disabled={uneditableAccount}
              >
                <Icon icon='mdi:clock-outline' />
              </ButtonIcon>
              <Modal
                className='history-modal'
                open={openEndorsment}
                onClose={() => {
                  setOpenEndorsment(false)
                }}
              >
                <Box className='modal-wrapper'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Account History</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenEndorsment(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <div className='headers'>
                    <div className='name'>Name</div>
                    <div className='date'>Date</div>
                  </div>
                  {statusHistory.map(status => (
                    <>
                      <div className={status.id % 2 == 0 ? 'history-status grey-bg' : 'history-status'} key={status.id}>
                        <div className='name'>{status.name}</div>
                        <div className='date'>{status.date}</div>
                      </div>
                    </>
                  ))}
                </Box>
              </Modal>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                className='delete-button'
                onClick={() => {
                  console.log('Print')
                }}
                title='PRINT SECTION'
                disabled={uneditableAccount}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:printer' />
                </div>
              </ButtonIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionsHeaderBound
