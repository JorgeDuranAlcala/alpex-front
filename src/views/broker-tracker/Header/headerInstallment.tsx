// import { useGetAllEndorsementTypes } from '@/hooks/accounts/endorsementType/getAllEndorsementTypes.tsx'
import { useGetDoctosByIdAccountAndIdDocumentType } from '@/hooks/accounts/information/useGetFilesByType'

// import { ContainerMobileBound } from '@/styled-components/accounts/Security.styled'
import {
  ContainerActionsHeader,
  ContainerAmountLastUpdate,
  FormHeaderInfoProfileContainer,
  FormHeaderInfoProfiletext,
  FormHeaderMoneyDataDate,
  FormHeaderSection,
  Frame3486,
  SubContainerHeaderData
} from '@/styles/Payments/PaymnetsInstallments/paymentsInstallments'
import {
  Box,
  Button,
  Card,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  PopperPlacementType,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'

//import StatusInstallment from '../components/StatusInstallment'
import ActionsHeader from './ActionsHeader'
import { ModalTxtImg } from './modals/ModalTxtImg'
import { ModalUploadImg } from './modals/ModalUploadImg'

// ** MUI Imports
// ** Redux

// ** Next

// ** Custom hooks
/* eslint-disable */

interface IActionsHeaderProps {
  accountStatus: string
  sideHeader: boolean
}

interface StatusHistory {
  id: number
  name: string
  date: string
}
interface InstallmentHeaderProps {
  isNewAccount?: boolean
  setActiveEndorsement?: any
  setEditInfo?: any
  setTypeofAccount?: any
  accountDetails: any
  setAccountId: any
  isDataSheet?: boolean
  installmentDetails: any
}

//Pending types

const ModalUploadImage = ({ accountId }: any) => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [modalUpload, setModalUpload] = useState(false)
  const [modalTxt, setModalTxt] = useState(false)
  const [logo, setLogo] = useState<undefined | string>(undefined)

  //hooks
  const { setAccountDocumentFilters, doctos } = useGetDoctosByIdAccountAndIdDocumentType()

  const openMenu = Boolean(anchorEl)

  useEffect(() => {
    accountId && setAccountDocumentFilters({ idAccount: accountId, idCDocto: 3 }) //TODO change the id
  }, [accountId])

  useEffect(() => {
    doctos && setLogo(doctos[0]?.url)
  }, [doctos])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (action: string) => {
    switch (action) {
      case 'upload':
        setOpen(false)
        setAnchorEl(null)
        setModalUpload(true)
        break
      case 'txtLogo':
        setOpen(false)
        setAnchorEl(null)
        setModalTxt(true)
        break

      default:
        break
    }
  }

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const randomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4']

    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    //TODO Cuando se tenga la funcionalidad de logos sustituir este menu
    <>
      <div className='header-form-main'>
        <Button
          id='basic-button'
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}
        >
          <div className='header-menu'>
            {!logo ? (
              <>
                <Icon icon='ic:baseline-file-upload' style={{ display: 'block', margin: 'auto' }} fontSize={20} />
                <span style={{ display: 'block' }}>Logo</span>
              </>
            ) : (
              <img
                src={logo}
                alt='Dragged'
                className='dragged-image'
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={() => handleClose('upload')}>
            <ListItemText>Upload Company Logo</ListItemText>
            <ListItemIcon>
              <Icon icon='ic:baseline-file-upload' style={{ marginLeft: 'auto' }} fontSize={20} />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={() => handleClose('txtLogo')}>
            <ListItemText>Use a Text-Based Logo</ListItemText>
            <ListItemIcon>
              <Icon icon='ph:text-a-underline-bold' style={{ marginLeft: 'auto' }} fontSize={20} />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Upload image
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <input type='file' onChange={handleImageChange} />
            <img src={imagePreview} alt='' />
          </Typography>
        </Box>
      </Modal>
      <ModalTxtImg setOpenHistory={setModalTxt} openHistory={modalTxt} />
      <ModalUploadImg setOpenHistory={setModalUpload} openHistory={modalUpload} accountId={accountId} />
    </>
  )
}

const InstallmentHeader = ({
  isNewAccount,
  setActiveEndorsement,
  setTypeofAccount,
  setEditInfo,
  accountDetails,
  isDataSheet,
  installmentDetails
}: InstallmentHeaderProps) => {
  const [accountId, setAccountId] = useState<number | null>(null)
  const [insured, setInsured] = useState<string | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (accountDetails?.informations?.length > 0) {
      setInsured(accountDetails?.informations[0]?.insured)
      setAccountId(accountDetails?.id)
    }
  }, [accountDetails])

  const formaterAmount = (amount: number) => {
    const currency = accountDetails?.informations[0]?.currency
    if (amount && currency) {
      const convert = new Intl.NumberFormat('en', { style: 'currency', currency: currency })
      const formatTotalBalanceDue = convert.format(amount || 0)
      return formatTotalBalanceDue
    }
  }

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

  useEffect(() => {
    installmentDetails && setStatus(installmentDetails.status)
  }, [installmentDetails])

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [placement, setPlacement] = useState<PopperPlacementType | undefined>(undefined)

  return (
    <>
      <Card className='info-header' style={{ marginBottom: '16px' }}>
        <div className='form-header-data'>
          <div className='form-container-all-data'>
            <FormHeaderSection
              sx={{
                '@media (max-width: 764px)': {
                  display: isDataSheet ? 'none' : 'block'
                }
              }}
            >
              <FormHeaderInfoProfileContainer>
                <Box
                  sx={{
                    '@media (max-width: 764px)': {
                      display: 'none'
                    }
                  }}
                >
                  <ModalUploadImage accountId={accountDetails?.id} />
                </Box>
                <FormHeaderInfoProfiletext>
                  <span className='form-header-info-profile-txt-title'>{insured}</span>
                  <span className='form-header-info-profile-num'>#{accountDetails?.id}</span>
                </FormHeaderInfoProfiletext>
              </FormHeaderInfoProfileContainer>
              <ContainerAmountLastUpdate>
                {isDataSheet ? (
                  <span className='form-header-money-data-txt'>Net premium</span>
                ) : (
                  <span className='form-header-money-data-txt'>Total debit</span>
                )}
                <span className='form-header-money-data-num'>
                  {formaterAmount(accountDetails?.informations[0]?.netPremium)}
                </span>
                <FormHeaderMoneyDataDate>
                  Last Update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                </FormHeaderMoneyDataDate>
              </ContainerAmountLastUpdate>
            </FormHeaderSection>
            {/* Container first */}
            {/* Container second */}
            <div className='form-secondContainer-wrapper'>
              <SubContainerHeaderData>
                <Frame3486>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                      <Grid item xs={12} sm={3} md={5}>
                        <div className='form-secondContainer-second'>
                          <span className='form-secondContainer-header-title'>Broker Name</span>
                          <span className='form-secondContainer-header-subtitle'>{installmentDetails?.broker}</span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={3.5} md={5}>
                        <div className='form-secondContainer-second'>
                          <span className='form-secondContainer-header-title'>Line of Business</span>
                          <span className='form-secondContainer-header-subtitle'>
                            {' '}
                            {installmentDetails?.lineOfBusiness}
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={2.5} md={2}>
                        <div className='form-secondContainer-second'>
                          <span className='form-secondContainer-header-title'>Installments</span>
                          <span className='form-secondContainer-header-subtitle'>
                            {accountDetails?.installments.length}
                          </span>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={12}
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'end',
                          marginTop: '10px',

                          '@media (max-width: 599px)': {
                            display: 'flex',
                            justifyContent: 'center'
                          }
                        }}
                      >
                        <ContainerActionsHeader>
                          <ActionsHeader
                            accountId={accountDetails?.id}
                            setEditInfo={setEditInfo}
                            accountStatus='PENDING'
                            sideHeader={true}
                          />
                        </ContainerActionsHeader>
                      </Grid>
                    </Grid>
                  </Box>
                </Frame3486>
              </SubContainerHeaderData>
            </div>
            {/* {isDataSheet ? (
              <div className='actions-header'>
                <ActionsHeader
                  accountId={account?.id}
                  setEditInfo={setEditInfo}
                  accountStatus='PENDING'
                  sideHeader={true}
                />
              </div>
            ) : null} */}
            {/* Container second */}
            <div
              style={{
                display: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)',
                color: '#FFB446',
                backgroundColor: '#fff6e9'
              }}
            >
              <Icon icon='mdi:alert-outline' style={{ marginRight: '10px' }} />
              INSTALLMENT 3 HAS PENDING BALANCE PAYMENT. PLEASE UPDATE SOON.
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default InstallmentHeader
