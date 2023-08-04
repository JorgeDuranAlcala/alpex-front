// import { useGetAllEndorsementTypes } from '@/hooks/accounts/endorsementType/getAllEndorsementTypes.tsx'
import { useGetDoctosByIdAccountAndIdDocumentType } from '@/hooks/accounts/information/useGetFilesByType'
import { ContainerMobileBound } from '@/styled-components/accounts/Security.styled'
import ActionsHeader2 from '@/views/accounts/new-account-steps/headers/ActionsHeader'
import StatusSelect from '@/views/custom/select/StatusSelect'
import {
  Box,
  Button,
  Card,
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
import { useAppSelector } from 'src/store'
import StatusInstallment from '../components/StatusInstallment'
import ActionsHeader from './ActionsHeader'
import { ModalTxtImg } from './modals/ModalTxtImg'
import { ModalUploadImg } from './modals/ModalUploadImg'

// ** MUI Imports

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
  setAccountId,
  isDataSheet
}: InstallmentHeaderProps) => {
  const [status, setStatus] = useState('')
  const account = useAppSelector(state => state.accounts?.formsData?.form1)

  const formaterAmount = (amount: number) => {
    if (amount) {
      return amount.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
      })
    }
  }

  const convertirFecha = (fecha: string) => {
    const fechaObjeto = new Date(fecha)

    const dia = fechaObjeto.getUTCDate()
    const mes = fechaObjeto.getUTCMonth() + 1
    const anio = fechaObjeto.getUTCFullYear()

    return `${dia}/${mes < 10 ? '0' + mes : mes}/${anio}`
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
    account && setAccountId(account.id)
  }, [account])

  useEffect(() => {
    accountDetails && setStatus(accountDetails.status)
  }, [accountDetails])

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [placement, setPlacement] = useState<PopperPlacementType | undefined>(undefined)

  return (
    <>
      <Card className='info-header' style={{ marginBottom: '16px' }}>
        <div className='form-header-data'>
          <div className='form-container-all-data'>
            {/* Contenedor mobile bound */}
            <ContainerMobileBound>
              <div className='title'>Quality Insurance México</div>
              <div className='idNumber'>#{account?.id}</div>

              <span className='subtitle'>Total debt</span>
              <span className='moneySubtitle'>$400,000 USD {account?.placementStructure?.currency}</span>

              <span className='subtitle'>Broker Name</span>
              <span className='subtitle-installment'>Broker Name</span>

              <span className='subtitle'>Line of Business</span>
              <span className='subtitle-installment'>Line of Business</span>

              <span className='subtitle'>Next Due Date</span>
              <span className='subtitle-installment'>10 / 01 / 2023</span>

              <span className='subtitle'>Next Balance Date</span>
              <span className='subtitle-installment'>$100,000 USD</span>

              <span className='subtitle'>Installments</span>
              <span className='subtitle-installment'>1/4</span>

              <span className='subtitle'>Balance</span>
              <span className='subtitle-installment'>$0 USD</span>
              {/* <span className='subtitle'>Reception Date</span>
              <span className='reception'>{account && convertirFecha(account?.basicInfo?.receptionDate)}</span> */}
            </ContainerMobileBound>

            {/* Contenedor mobile bound */}
            {/* Container first */}
            <div className='form-header-sections'>
              <div className='form-header-info-profile-container'>
                <ModalUploadImage accountId={account?.id} />
                <div className='form-header-info-profile-txt-container'>
                  <span className='form-header-info-profile-txt-title'>Quality Insurance México</span>
                  <span className='form-header-info-profile-num'>#{account?.id}</span>
                </div>
              </div>
              <div className='form-header-money-data'>
                <span className='form-header-money-data-txt'>Net premium</span>
                <span className='form-header-money-data-num'>
                  ${account && formaterAmount(account?.placementStructure?.netPremium)}{' '}
                  {account?.placementStructure?.currency}
                </span>
                <span className='form-header-money-data-date'>
                  Last Update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                </span>
              </div>
            </div>
            {/* Container first */}
            {/* Container second */}
            <div className='form-secondContainer-wrapper'>
              <div className='form-secondContainer-wrapper-first-side installments-wrapper'>
                <div className='form-secondContainer-second'>
                  <span className='form-secondContainer-header-title'>Status</span>
                  {isDataSheet ? (
                    <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                  ) : (
                    <StatusInstallment status={'Pending'} />
                  )}
                </div>
                {isDataSheet ? (
                  <>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Line of Business</span>
                      <span className='form-secondContainer-header-subtitle'>Line of Business</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Reception Date</span>
                      <span className='form-secondContainer-header-subtitle'>13 / 03 / 2023</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <div className='actions-header'>
                        <ActionsHeader2
                          accountId={account?.id}
                          setEditInfo={setEditInfo}
                          accountStatus='PENDING'
                          sideHeader={true}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Broker Name</span>
                      <span className='form-secondContainer-header-subtitle'>Broker Name</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Line of Business</span>
                      <span className='form-secondContainer-header-subtitle'>Line of Business</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Next Due Date</span>
                      <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Next Balance Date</span>
                      <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Installments</span>
                      <span className='form-secondContainer-header-subtitle'>1/4</span>
                    </div>
                    <div className='form-secondContainer-second'>
                      <span className='form-secondContainer-header-title'>Balance</span>
                      <span className='form-secondContainer-header-subtitle'>$0 USD</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isDataSheet ? (
              <div className='actions-header'>
                <ActionsHeader
                  accountId={account?.id}
                  setEditInfo={setEditInfo}
                  accountStatus='PENDING'
                  sideHeader={true}
                />
              </div>
            ) : null}
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
