import { useGetAccountById } from '@/hooks/accounts/forms'
import { useDownloadDebitNote } from '@/hooks/accounts/information'
import { useDownloadCreditNote } from '@/hooks/accounts/security'
import { useGetAllLanguage } from '@/hooks/catalogs/language'
import { AbilityContext } from '@/layouts/components/acl/Can'
import { delayMs } from '@/utils/formatDates'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, Modal, Typography, styled } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useAppSelector } from 'src/store'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import StatusSelect from 'src/views/custom/select/StatusSelect'
import { ActionsHeaderBoundModal, ActionsHeaderBoundModalCancel } from './modals/ModalEndorsment'

// ** MUI Imports

interface IActionsHeaderProps {
  accountStatus: string
  sideHeader: boolean
  setActiveEndorsement?: any
  setDataForEndorsement?: any
  dataForEndorsement?: any
  accountId?: any
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

const ActionsHeaderBound: React.FC<IActionsHeaderProps> = ({ accountStatus, sideHeader, accountId }) => {
  const { getAccountById } = useGetAccountById()
  const { languages } = useGetAllLanguage()
  const { downloadDebitNote } = useDownloadDebitNote()
  const { downloadCreditNote } = useDownloadCreditNote()
  const currentStep = useAppSelector(state => state.stepFormSlice)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({})
  const [uneditableAccount, setUneditableAccount] = useState(false)
  const [openEndorsment, setOpenEndorsment] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [cancellEndorsment, setCancellEndorsment] = useState(false)
  const ability = useContext(AbilityContext)
  const [showOptionsNotes, setShowOptionsNotes] = useState(false)

  // Notifications
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // ** Store
  // const account = useAppSelector(state => state.accounts?.formsData?.form1)

  // ** Custom Hooks

  // const downloadSpanish = () => {
  //   console.log('Spanish Download')
  //   setShowPrintOptions(false)
  // }

  // const downloadEnglish = () => {
  //   console.log('English Download')
  //   setShowPrintOptions(false)
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleDownloadError = () => {
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

  const downloadSucess = () => {
    setBadgeData({
      message: `DOWNLOADED`,
      status: 'success',
      open: true,
      icon: <Icon icon='ic:baseline-check-circle' />,
      theme: 'success',
      disableAutoHide: true
    })
  }

  const textIconNotes = () => {
    if (currentStep?.[accountId]?.step === 1 || Object.keys(currentStep).length === 0) {
      return 'DEBIT NOTE'
    } else if (currentStep?.[accountId]?.step === 2) {
      return 'CREDIT NOTE'
    }
  }

  const downloadNote = async (idLanguage: number) => {
    setBadgeData({
      message: `DOWNLOADING...`,
      status: 'secondary',
      open: true,
      icon: <CircularProgress size={20} color='primary' />,
      backgroundColor: '#828597',
      theme: 'info',
      disableAutoHide: true
    })
    if (accountId && (currentStep?.[accountId]?.step === 1 || Object.keys(currentStep).length === 0)) {
      await delayMs(1000)

      try {
        const downloaded = await downloadDebitNote(accountId, idLanguage)

        if (downloaded) {
          downloadSucess()
        }
      } catch (error) {
        handleDownloadError()
      }
      await delayMs(2000)
    } else if (accountId && currentStep?.[accountId]?.step === 2) {
      await delayMs(1000)

      try {
        const account = await getAccountById(accountId)
        const downloaded = []
        for (let index = 0; index < account.securities.length; index++) {
          const { id } = account.securities[index]
          const isDownload = await downloadCreditNote({
            idAccount: accountId,
            idSecurity: id,
            idLanguage
          })
          if (isDownload) downloaded.push(isDownload)
        }
        const success = downloaded.length === account.securities.length
        if (success) {
          downloadSucess()
        }
      } catch (error) {
        handleDownloadError()
      }
      await delayMs(2000)
    }
    setBadgeData({
      message: '',
      status: undefined,
      icon: undefined,
      open: false
    })
  }

  useEffect(() => {
    if (sideHeader) {
      setUneditableAccount(false)
    }
  }, [sideHeader])

  const downloadNotesButton = () => {
    if (ability?.can('downloadDebitNote', 'account')) {
      return (
        <ButtonIcon
          onClick={() => setShowOptionsNotes(!showOptionsNotes)}
          disabled={uneditableAccount}
          title={textIconNotes()}
        >
          <div className='btn-icon'>
            <Icon icon='material-symbols:post-add' />
          </div>
          {showOptionsNotes ? (
            <div className='print-options'>
              <div className='title'>Select a language</div>
              {languages.map(language => {
                return (
                  <div
                    key={language.id}
                    className='language'
                    onClick={() => {
                      downloadNote(language.id)
                    }}
                  >
                    {language.language}
                  </div>
                )
              })}
            </div>
          ) : (
            ''
          )}
        </ButtonIcon>
      )
    }
  }

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
            <div className='header-btns'>{downloadNotesButton()}</div>
            {/* ESTE ES EL MODAL QUE SE DESPLIEGA CUANDO SE GENERA EL ENDORSEMENT*/}
            <ActionsHeaderBoundModal
              setOpenHistory={setOpenHistory}
              uneditableAccount={uneditableAccount}
              openHistory={openHistory}
              handleSubmit={handleSubmit}
              setCancellEndorsment={setCancellEndorsment}
            />
            {/* ESTE ES EL MODAL QUE SE DESPLIEGA CUANDO SE VA POR LA RUTA DE CANCELACIÓN */}
            <ActionsHeaderBoundModalCancel
              setOpenHistory={setCancellEndorsment}
              openHistory={cancellEndorsment}
              cancel={setOpenHistory}
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
                    <Fragment key={status.id}>
                      <div className={status.id % 2 == 0 ? 'history-status grey-bg' : 'history-status'} key={status.id}>
                        <div className='name'>{status.name}</div>
                        <div className='date'>{status.date}</div>
                      </div>
                    </Fragment>
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
