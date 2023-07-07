import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import useGetReinsCompBindByIdReinsComp from '@/hooks/catalogs/reinsuranceCompanyBinder/useGetAllByIdReinsurance'
import useDownloadBourderau from '@/hooks/reports/useDownloadBourderau'
import { delayMs } from '@/utils/formatDates'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'

interface IModalBordereaux {
  headingText: string
  text: string
  handleClickContinue?: () => void
  handleClickCancel?: () => void
  renderButton: (handleOpen: () => void) => JSX.Element
  setShow: boolean
  onClose?: () => void
}

const ModalBordereaux: React.FC<IModalBordereaux> = ({
  headingText,
  text,
  onClose,
  handleClickCancel,
  setShow = false
}) => {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    reinsurer: '',
    binder: ''
  })
  const [disabledControl, setDisabledControl] = useState({
    selectReinsurer: true,
    downloadButton: true
  })

  // Notifications
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // Custom hooks
  const { getBourderau } = useDownloadBourderau()
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { reinsuranceCompanyBinders, setIdReinsuranceCompany } = useGetReinsCompBindByIdReinsComp()

  const handleChange = (event: SelectChangeEvent) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onCancel = () => {
    handleClose()
    if (handleClickCancel) {
      handleClickCancel()
    }
  }

  const resetStates = () => {
    setValues({
      reinsurer: '',
      binder: ''
    })
    setDisabledControl({
      selectReinsurer: true,
      downloadButton: true
    })
  }

  // ** Handlers for opening and closing
  const handleClose = (event?: any, reason?: string) => {
    resetStates()

    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      return
    }

    if (onClose) {
      onClose()
    }

    setOpen(false)
  }

  const handleDownload = async () => {
    if (values.reinsurer && values.binder) {
      setBadgeData({
        message: `DOWNLOADING BOURDERAU`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='primary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })
      await delayMs(1000)

      try {
        const bourderauBuffer = await getBourderau({
          idCReinsuranceCompany: Number(values.reinsurer),
          idCReinsuranceCompanyBinder: Number(values.binder)
        })

        if (bourderauBuffer) {
          setBadgeData({
            message: `DOWNLOADED SUCCESSFULLY`,
            status: 'success',
            open: true,
            icon: <Icon icon='ic:baseline-check-circle' />,
            theme: 'success',
            disableAutoHide: true
          })
          await delayMs(1000)

          const fileToDownload = new File([bourderauBuffer], 'REINSURANCE BDX DYNAMIC.xlsx')
          const downloadUrl = URL.createObjectURL(fileToDownload)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = fileToDownload.name
          link.click()
        }
      } catch (error) {
        setBadgeData({
          message: `NOT DATA FOUND`,
          theme: 'warning',
          open: true,
          status: 'warning',
          icon: (
            <Icon
              style={{
                color: '#EF9713',
                marginTop: '-1px'
              }}
              icon='material-symbols:warning-outline'
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

  const backdropProps = {
    timeout: 500
  }

  const drawBinderOptions = () => {
    const binderOptions = []

    if (reinsuranceCompanyBinders && reinsuranceCompanyBinders?.length > 0) {
      binderOptions.push(<MenuItem value={'-1'}>All binders</MenuItem>)
      reinsuranceCompanyBinders?.map(reinsuranceCompanyBinders => {
        binderOptions.push(
          <MenuItem key={reinsuranceCompanyBinders.id} value={reinsuranceCompanyBinders.id}>
            {reinsuranceCompanyBinders.referenceNumber}
          </MenuItem>
        )
      })
    }

    if (binderOptions.length > 0) return binderOptions
  }

  // ** Hooks
  useEffect(() => {
    if (setShow) {
      setOpen(true)
    }
  }, [setShow])

  useEffect(() => {
    if (values.reinsurer) {
      setDisabledControl({
        selectReinsurer: false,
        downloadButton: true
      })
      setValues({
        ...values,
        binder: ''
      })
      setIdReinsuranceCompany(Number(values.reinsurer))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.reinsurer])

  useEffect(() => {
    if (values.binder) {
      setDisabledControl({
        ...disabledControl,
        downloadButton: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.binder])

  return (
    <Box>
      <CustomAlert {...badgeData} />
      {setShow && (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={(event, reason) => handleClose(event, reason)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: backdropProps
          }}
        >
          <Fade in={open}>
            <Card
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                padding: '47px 0 16px 0'
              }}
            >
              <CardContent>
                <IconButton
                  aria-label='close'
                  onClick={handleClose}
                  sx={{ top: 15, right: 10, position: 'absolute', color: 'grey.500' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '208px',

                    justifyContent: 'space-between'
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '64px',

                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='h5' component='div'>
                      {headingText}
                    </Typography>
                    <Typography component='div'>{text}</Typography>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Select Reinsurer</InputLabel>
                    <Select
                      name={'reinsurer'}
                      value={values?.reinsurer}
                      label='Select Reinsurer'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      {reinsuranceCompany && reinsuranceCompany?.length > 0
                        ? reinsuranceCompany?.map(reinsuranceCompany => {
                            return (
                              <MenuItem key={reinsuranceCompany.id} value={reinsuranceCompany.id}>
                                {reinsuranceCompany.name}
                              </MenuItem>
                            )
                          })
                        : null}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Select Binder</InputLabel>
                    <Select
                      name={'binder'}
                      value={values.binder}
                      label='Select Binder'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                      disabled={
                        disabledControl.selectReinsurer ||
                        !reinsuranceCompanyBinders ||
                        reinsuranceCompanyBinders?.length === 0
                      }
                    >
                      {drawBinderOptions()}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100px',
                    justifyContent: 'space-between',
                    mt: 10
                  }}
                >
                  <Button
                    variant='contained'
                    size='large'
                    sx={{ width: '100%' }}
                    onClick={handleDownload}
                    disabled={disabledControl.downloadButton}
                  >
                    Download
                  </Button>
                  <Button onClick={onCancel} size='large' sx={{ width: '100%' }}>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Modal>
      )}
    </Box>
  )
}
export default ModalBordereaux
