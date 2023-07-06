import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import useGetReinsCompBindByIdReinsComp from '@/hooks/catalogs/reinsuranceCompanyBinder/useGetAllByIdReinsurance'
import useDownloadBourderau from '@/hooks/reports/useDownloadBourderau'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
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
    reinsurer: undefined,
    binder: undefined
  })

  const { buffer, setDownloadBourderauParams } = useDownloadBourderau()
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

  // ** Handlers for opening and closing
  // const handleOpen = () => setOpen(true)
  const handleClose = (event?: any, reason?: string) => {
    setValues({
      binder: undefined,
      reinsurer: undefined
    })

    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      return
    }

    if (onClose) {
      onClose()
    }

    setOpen(false)
  }

  const handleDownload = () => {
    if (values.reinsurer && values.binder) {
      setDownloadBourderauParams({
        idCReinsuranceCompany: values.reinsurer,
        idCReinsuranceCompanyBinder: values.binder
      })
    }
  }

  const backdropProps = {
    timeout: 500
  }

  // ** Hooks
  useEffect(() => {
    if (setShow) {
      setOpen(true)
    }
  }, [setShow])

  useEffect(() => {
    console.log(values.reinsurer)
    if (values.reinsurer) {
      setIdReinsuranceCompany(values.reinsurer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.reinsurer])

  useEffect(() => {
    if (buffer) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buffer])

  return (
    <Box>
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
                      value={values?.binder}
                      label='Select Binder'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      {reinsuranceCompanyBinders && reinsuranceCompanyBinders?.length > 0
                        ? reinsuranceCompanyBinders?.map(reinsuranceCompanyBinders => {
                            return (
                              <MenuItem key={reinsuranceCompanyBinders.id} value={reinsuranceCompanyBinders.id}>
                                {reinsuranceCompanyBinders.referenceNumber}
                              </MenuItem>
                            )
                          })
                        : null}
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
                  <Button variant='contained' size='large' sx={{ width: '100%' }} onClick={handleDownload}>
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
