// import { useGetAllEndorsementTypes } from '@/hooks/accounts/endorsementType/getAllEndorsementTypes.tsx'
import { ContainerMobileBound } from '@/styled-components/accounts/Security.styled'
import { Box, Button, Card, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useAppSelector } from 'src/store'
import StatusSelect from 'src/views/custom/select/StatusSelect'
import ActionsHeader from './ActionsHeader'
import ActionsHeaderBound from './ActionsHeaderBound'
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
interface FormHeaderProps {
  isNewAccount?: boolean
  setActiveEndorsement?: any
  setEditInfo?: any
  setTypeofAccount?: any
  accountDetails: any
  setAccountId: any
}

//Pending types

const ModalUploadImage = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [modalUpload, setModalUpload] = useState(false)
  const [modalTxt, setModalTxt] = useState(false)
  const openMenu = Boolean(anchorEl)
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
            <Icon icon='ic:baseline-file-upload' style={{ display: 'block', margin: 'auto' }} fontSize={20} />
            <span style={{ display: 'block' }}>Logo</span>
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
      <ModalUploadImg setOpenHistory={setModalUpload} openHistory={modalUpload} />
    </>
  )
}

const FormHeader = ({
  isNewAccount,
  setActiveEndorsement,
  setTypeofAccount,
  setEditInfo,
  accountDetails,
  setAccountId
}: FormHeaderProps) => {
  const [status, setStatus] = useState('')
  const account = useAppSelector(state => state.accounts?.formsData?.form1)

  //hooks
  //const { account: accountDetails, setAccountId } = useGetAccountById()

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
    if (accountDetails !== undefined && setTypeofAccount) {
      setTypeofAccount(accountDetails?.status)
    }
  }, [status])

  useEffect(() => {
    accountDetails && setStatus(accountDetails.status)
  }, [accountDetails])

  return (
    <>
      <Card className='info-header' style={{ marginBottom: '16px' }}>
        <div className='form-header-data'>
          <div className='form-container-all-data'>
            {/* Contenedor mobile bound */}
            <ContainerMobileBound>
              <div className='title'>{account?.basicInfo?.insured} </div>
              <div className='idNumber'>#{account?.id}</div>

              <span className='subtitle'>Net premium</span>
              <span className='moneySubtitle'>
                ${account && formaterAmount(account?.placementStructure?.netPremium)}{' '}
                {account?.placementStructure?.currency}
              </span>
              <span className='subtitle'>Reception Date</span>
              <span className='reception'>{account && convertirFecha(account?.basicInfo?.receptionDate)}</span>
            </ContainerMobileBound>

            {/* Contenedor mobile bound */}
            {/* Container first */}
            {!isNewAccount && (
              <div className='form-header-sections'>
                <div className='form-header-info-profile-container'>
                  <ModalUploadImage />
                  <div className='form-header-info-profile-txt-container'>
                    <span className='form-header-info-profile-txt-title'>{account?.basicInfo?.insured}</span>
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
            )}
            {/* Container first */}
            {/* Container second */}
            <div className='form-secondContainer-wrapper'>
              <div className='form-secondContainer-wrapper-first-side'>
                <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                  <span className='form-secondContainer-header-title'>Status</span>
                  {status !== '' && accountDetails?.status && (
                    <StatusSelect margin={0} initialStatus={accountDetails?.status} setSelectedStatus={setStatus} />
                  )}
                  {isNewAccount && <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />}
                </div>

                <div className='form-secondContainer-third'>
                  <span className='form-header-money-data-date'>
                    Last update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                  </span>
                </div>

                {!isNewAccount && (
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Line of Business</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {accountDetails && accountDetails?.informations[0]?.idLineOfBussines?.lineOfBussines}
                    </span>
                  </div>
                )}

                {!isNewAccount && (
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Reception Date</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.receptionDate)}
                    </span>
                  </div>
                )}
              </div>
              <div className={!isNewAccount ? 'actions-header' : 'form-secondContainer-fourths'}>
                <div className={!isNewAccount ? 'display-none' : 'form-secondContainer-fourth'}>
                  <span className='form-header-money-data-date'>
                    Last update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                  </span>
                </div>
                {accountDetails && accountDetails?.idAccountStatus === 5 ? ( //TODO
                  <ActionsHeaderBound
                    setActiveEndorsement={setActiveEndorsement}
                    accountStatus='BOUND'
                    sideHeader={true}
                  />
                ) : (
                  <ActionsHeader
                    accountId={account?.id}
                    setEditInfo={setEditInfo}
                    accountStatus='PENDING'
                    sideHeader={true}
                  />
                )}
              </div>
            </div>
            {/* Container second */}
          </div>
        </div>
      </Card>
    </>
  )
}

export default FormHeader
