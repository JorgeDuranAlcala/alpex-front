import useAccountTable from '@/hooks/accounts/Table/useAccountTable'
import useGetAccountHistoryLogByIdAccount from '@/hooks/accounts/historyLog/useFindByIdAccount'
import { useGetAllLanguage } from '@/hooks/catalogs/language'
import usePrintReport from '@/hooks/reports/usePrintReport'
import { HeaderRowsContainer } from '@/styles/Payments/PaymnetsInstallments/paymentsInstallments'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import StatusSelect from 'src/views/custom/select/StatusSelect'

// ** MUI Imports

interface IActionsHeaderProps {
  accountId?: number
  accountStatus: string
  sideHeader: boolean
  setEditInfo?: any
}

/*
interface StatusHistory {
  id: number
  name: string
  date: string
} */

/* const statusHistory: StatusHistory[] = [
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
] */

const ButtonIcon = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',

  padding: '0px !important',

  // border: '1px solid',
  maxWidth: '52px !important',
  '&:hover': {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  '&:focus': {}
})

// const ActionsHeader: React.FC<IActionsHeaderProps> = ({ accountStatus, sideHeader, setEditInfo }) => {
const ActionsHeader: React.FC<IActionsHeaderProps> = ({ accountId, accountStatus, sideHeader, setEditInfo }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({})
  const [uneditableAccount, setUneditableAccount] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [editInfo, setEditInfo] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showPrintOptions, setShowPrintOptions] = useState(false)

  //hooks
  const { buffer, setPrintReportParams } = usePrintReport()
  const { languages } = useGetAllLanguage()
  const { accountHistoryLog, setIdAccount } = useGetAccountHistoryLogByIdAccount()
  const { deleteAccounts } = useAccountTable()

  useEffect(() => {
    accountId && setIdAccount(accountId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId])

  const deleteAccount = () => {
    accountId && deleteAccounts([accountId])
    setOpenDelete(false)
  }

  const downloadReport = (id: number) => {
    if (accountId) {
      setPrintReportParams({
        idAccount: accountId,
        idLanguage: id
      })
    }
    setShowPrintOptions(false)
  }

  useEffect(() => {
    if (sideHeader) {
      setUneditableAccount(false)
    }
  }, [sideHeader])

  useEffect(() => {
    if (buffer) {
      const fileToDownload = new File([buffer], `Account_${accountId}.docx`)
      const downloadUrl = URL.createObjectURL(fileToDownload)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileToDownload.name
      link.click()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buffer])

  const formatDateFromUTC = (date: Date | null): string => {
    if (date) {
      const fecha = new Date(new Date(date).toLocaleString('en-US', { timeZone: 'UTC' }))
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }

      return new Intl.DateTimeFormat('ban', options).format(fecha)
    }

    return ''
  }

  return (
    <>
      <div className={sideHeader ? 'btnWrapperFth' : ' '}>
        <div className='btnWrappers'>
          {sideHeader ? '' : <div className='header-text'>Status:</div>}

          <HeaderRowsContainer>
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
                <Icon icon='mdi:pencil-outline' />
              </ButtonIcon>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenHistory(true)
                }}
                disabled={uneditableAccount}
              >
                <Icon icon='mdi:clock-outline' />
              </ButtonIcon>
              <Modal
                className='history-modal'
                open={openHistory}
                onClose={() => {
                  setOpenHistory(false)
                }}
              >
                <Box className='modal-wrapper'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Account History</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenHistory(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <div className='headers'>
                    <div className='name'>Name</div>
                    <div className='date'>Date</div>
                  </div>
                  {accountHistoryLog.map(accountHistory => (
                    <div
                      className={accountHistory.id % 2 == 0 ? 'history-status grey-bg' : 'history-status'}
                      key={accountHistory.id}
                    >
                      <div className='name'>{accountHistory.idAccountStatus.status}</div>
                      <div className='date'>{formatDateFromUTC(accountHistory.createdAt)}</div>
                    </div>
                  ))}
                </Box>
              </Modal>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                className='print-button'
                onClick={() => {
                  setShowPrintOptions(!showPrintOptions)
                }}
                disabled={uneditableAccount}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:printer' />
                </div>
                {showPrintOptions ? (
                  <div className='print-options'>
                    <div className='title'>Select a language</div>

                    {languages.map(language => {
                      return (
                        <div
                          key={language.id}
                          className='language'
                          onClick={() => {
                            downloadReport(language.id)
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
                  <Icon icon='mdi:delete-outline' />
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
          </HeaderRowsContainer>
        </div>
      </div>
    </>
  )
}

export default ActionsHeader
