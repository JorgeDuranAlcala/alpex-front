import usePrintReport from '@/hooks/reports/usePrintReport'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

interface IActionsHeaderProps {
  accountId?: number
  accountStatus: string
  sideHeader: boolean
  setEditInfo?: any
}

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
const ActionsHeader: React.FC<IActionsHeaderProps> = ({ accountId, sideHeader }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [editInfo, setEditInfo] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [showPrintOptions, setShowPrintOptions] = useState(false)

  //hooks
  const { buffer, setPrintReportParams } = usePrintReport()
  const medios = [
    { active: true, id: 1, medio: 'Email' },
    { active: true, id: 2, medio: 'Whatsapp' }
  ]

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

  return (
    <>
      <div className={sideHeader ? 'btnWrapperFth' : ' '}>
        <div className='btnWrappers'>
          {sideHeader ? '' : <div className='header-text'>Status:</div>}

          <div className='header-rows' style={{ justifyContent: 'end' }}>
            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenHistory(true)
                }}
                disabled={false}
              >
                <Icon icon='ic:sharp-download' />
              </ButtonIcon>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenHistory(true)
                }}
                disabled={false}
              >
                <Icon icon='mdi:email-outline' />
              </ButtonIcon>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenHistory(true)
                }}
                disabled={false}
              >
                <Icon icon='mdi:whatsapp' />
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
                    <Typography variant='h6'>Email</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenHistory(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                </Box>
              </Modal>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                className='print-button'
                onClick={() => {
                  setShowPrintOptions(!showPrintOptions)
                }}
                disabled={false}
              >
                <div className='btn-icon'>
                  <Icon icon='mdi:comment-outline' />
                </div>
                {showPrintOptions ? (
                  <div className='print-options'>
                    <div className='title'>Select medio</div>

                    {medios.map(medio => {
                      return (
                        <div
                          key={medio.id}
                          className='language'
                          onClick={() => {
                            downloadReport(medio.id)
                          }}
                        >
                          {medio.medio}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  ''
                )}
              </ButtonIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionsHeader
