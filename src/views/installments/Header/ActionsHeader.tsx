import usePrintReport from '@/hooks/reports/usePrintReport'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, TextField, Typography, styled } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'

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
  const [openDownload, setOpenDownload] = useState(false)
  const [openMail, setOpenMail] = useState(false)

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

  const [fileType, setFileType] = useState('')
  const [template, setTemplate] = useState('')

  const handleChangeTemplate = (event: SelectChangeEvent) => {
    setTemplate(event.target.value as string)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value as string)
  }

  const [state, setState] = useState({
    selectAll: false,
    grossPremiumShare: false,
    netPremium: false,
    netPremiumTaxes: false,
    reinsuranceBrokerage: false,
    dynamicCommision: false,
    taxes: false,
    frontingFee: false,
    discount: false,
    brokerFrontingFee: false
  })

  const handleChangeChecks = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const {
    selectAll,
    grossPremiumShare,
    netPremium,
    netPremiumTaxes,
    reinsuranceBrokerage,
    dynamicCommision,
    taxes,
    frontingFee,
    discount,
    brokerFrontingFee
  } = state

  return (
    <>
      <div className={sideHeader ? 'btnWrapperFth' : ' '}>
        <div className='btnWrappers'>
          {sideHeader ? '' : <div className='header-text'>Status:</div>}

          <div className='header-rows' style={{ justifyContent: 'end' }}>
            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenDownload(true)
                }}
                disabled={false}
              >
                <Icon icon='ic:sharp-download' />
              </ButtonIcon>
              <Modal
                className='history-modal'
                open={openDownload}
                onClose={() => {
                  setOpenDownload(false)
                }}
              >
                <Box className='modal-wrapper modal-download'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Download</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenDownload(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>File Type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={fileType}
                        label='Type File'
                        onChange={handleChange}
                      >
                        <MenuItem value='pdf'>PDF</MenuItem>
                        <MenuItem value='image'>Image</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
                      <FormLabel>Select fields to download</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={selectAll} onChange={handleChangeChecks} name='selectAll' />}
                          label='Select All'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={grossPremiumShare}
                              onChange={handleChangeChecks}
                              name='grossPremiumShare'
                            />
                          }
                          label='Gross Premium per Share'
                        />
                        <FormControlLabel
                          control={<Checkbox checked={netPremium} onChange={handleChangeChecks} name='netPremium' />}
                          label='Net Premium'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={netPremiumTaxes} onChange={handleChangeChecks} name='netPremiumTaxes' />
                          }
                          label='Net Premium with Taxes'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={reinsuranceBrokerage}
                              onChange={handleChangeChecks}
                              name='reinsuranceBrokerage'
                            />
                          }
                          label='Reinsurance Brokerage'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={dynamicCommision}
                              onChange={handleChangeChecks}
                              name='dynamicCommision'
                            />
                          }
                          label='Dynamic Commision'
                        />
                        <FormControlLabel
                          control={<Checkbox checked={taxes} onChange={handleChangeChecks} name='taxes' />}
                          label='Taxes'
                        />
                        <FormControlLabel
                          control={<Checkbox checked={frontingFee} onChange={handleChangeChecks} name='frontingFee' />}
                          label='Fronting Fee'
                        />
                        <FormControlLabel
                          control={<Checkbox checked={discount} onChange={handleChangeChecks} name='discount' />}
                          label='Discount'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={brokerFrontingFee}
                              onChange={handleChangeChecks}
                              name='brokerFrontingFee'
                            />
                          }
                          label='Broker Fronting Fee'
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row-reverse' }}>
                    <Button
                      variant='text'
                      onClick={() => {
                        setOpenDownload(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant='contained'>Download</Button>
                  </Stack>
                </Box>
              </Modal>
            </div>

            <div className='header-btns'>
              <ButtonIcon
                onClick={() => {
                  setOpenMail(true)
                }}
                disabled={false}
              >
                <Icon icon='mdi:email-outline' />
              </ButtonIcon>
              <Modal
                className='history-modal'
                open={openMail}
                onClose={() => {
                  setOpenMail(false)
                }}
              >
                <Box className='modal-wrapper modal-download'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Email</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenMail(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <Box sx={{ minWidth: 120 }} className='box-form'>
                    <div className='wrapper-installments'>
                      <div className='width-full'>
                        <TextField fullWidth autoFocus name='recipient' id='recipient' label='Recipient' />
                      </div>
                    </div>
                    <div className='wrapper-installments'>
                      <div className='width-full'>
                        <TextField fullWidth name='subject' id='subject' label='Subject' />
                      </div>
                    </div>
                    <div className='wrapper-installments'>
                      <div className='width-full'>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>Template</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={template}
                            label='Template'
                            onChange={handleChangeTemplate}
                          >
                            <MenuItem value='paymentReminder'>Payment Reminder</MenuItem>
                            <MenuItem value='paymentReminder2'>Payment Reminder 2</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className='wrapper-installments'>
                      <div className='width-full'>
                        <TextareaAutosize className='text-area-i' minRows={3} placeholder='Message' />
                      </div>
                    </div>
                    <IconButton>
                      <Icon icon='material-symbols:attach-file-add' color={'#2535A8'} />
                    </IconButton>
                  </Box>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row-reverse' }}>
                    <Button variant='contained'>Send</Button>
                    <Button
                      variant='text'
                      onClick={() => {
                        setOpenMail(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Modal>
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
