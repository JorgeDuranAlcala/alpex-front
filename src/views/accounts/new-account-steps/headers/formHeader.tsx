// import { useGetAllEndorsementTypes } from '@/hooks/accounts/endorsementType/getAllEndorsementTypes.tsx'

import { useGetDoctosByIdAccountAndIdDocumentType } from '@/hooks/accounts/information/useGetFilesByType'

// import { ContainerMobileBound } from '@/styled-components/accounts/Security.styled'
import {
  ContainerAmountLastUpdate,
  FormHeaderInfoProfileContainer,
  FormHeaderInfoProfiletext,
  FormHeaderMoneyDataDate,
  FormHeaderSection,
  FormSecondContainerFirstside,
  Frame3486,
  SecondContainer
} from '@/styles/Payments/PaymnetsInstallments/paymentsInstallments'
import { Badge, Box, Button, Card, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
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

  const AvatarLetter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',

    width: '80px',
    height: '80px'
  }))

  const { changeTypeLogo } = useAccountTable()

  const handleSelectTextBase = async (idAccount: number) => {
    await changeTypeLogo({
      idAccount: idAccount,
      typeLogo: 2
    })
  }

  const randomColor = (name: string) => {
    let hash = 0
    let i
    for (i = 0; i < name?.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  const stringAvatar = (name: string) => {
    const text = name?.split(' ')[0][0] + name?.split(' ')[0][1]
    return text.toString()
  }

  const account = useAppSelector(state => state.accounts?.formsData?.form1)

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
            {account?.basicInfo?.typeLogo == 2 ? (
              <Badge
                sx={{ ml: 2, cursor: 'pointer', zIndex: 1000, bgcolor: randomColor(account?.basicInfo?.insured) }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <AvatarLetter fontSize={20} sx={{ bgcolor: randomColor(account?.basicInfo?.insured) }}>
                  {stringAvatar(account?.basicInfo?.insured)}
                </AvatarLetter>
              </Badge>
            ) : (
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

const FormHeader = ({
  isNewAccount,
  accountDetails,
  setEditInfo,
  setActiveEndorsement,
  setTypeofAccount
}: FormHeaderProps) => {
  const [status, setStatus] = useState('')
  const [netPremiumAmount, setNetPremiumAmount] = useState<string | null>(null)
  const [insured, setInsured] = useState<string | null>(null)
  const [accountId, setAccountId] = useState<number | null>(null)
  const [receptionDate, setReceptionDate] = useState<string | null>(null)
  const [lastUserName, setLastUserName] = useState<string | null>(null)

  const account = useAppSelector(state => state.accounts?.formsData?.form1)

  // const lastUserName = 'Alejandro Hernández'

  // console.log(accountDetails);

  // const lastAccountId = useRef<number | null>(null)
  // const lastAccountDetailsId = useRef<number | null>(null);

  const formaterAmount = (amount: number) => {
    if (amount) {
      const amountNumber = Number(amount)

      return amountNumber.toLocaleString('en-US', {
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
        month: '2-digit',
        year: 'numeric'
      }

      return new Intl.DateTimeFormat('ban', options).format(fecha).toString().replaceAll('/', ' / ')
    }
    return ''
  }

  // useEffect(() => {

  //   // console.log('formHeader account', account);

  //   const accountId = account?.id;

  //   // console.log('formHeader accountId', {
  //   //   idFromAccout: account?.id,
  //   //   idFromAccountDetails: accountDetails?.id,
  //   //   accountId: accountId,
  //   // });

  //   if (accountId) {

  //     // console.log('formHeader lastAccountId', {
  //     //   lastAccountId: lastAccountId.current,
  //     //   accountId: accountId
  //     // })
  //     if (lastAccountId.current !== accountId || lastAccountDetailsId.current !== accountDetails?.id) {
  //       lastAccountId.current = accountId
  //       lastAccountDetailsId.current = accountId;

  //       console.log('formHeader setAccountId', accountId)

  //       setAccountId(accountId)
  //     }

  //     // isAccountSetted.current = true
  //   }

  //   // account && setAccountId(account.id)
  // }, [account, accountDetails])

  useEffect(() => {
    if (account) {
      const amount = formaterAmount(account?.placementStructure?.netPremium)
      const currency = account?.placementStructure?.currency

      setNetPremiumAmount(`$${amount} ${currency}`)
      setInsured(account?.basicInfo?.insured)
      setAccountId(account?.id)
      setReceptionDate(convertirFecha(account?.basicInfo?.receptionDate))
    }

    if (accountDetails?.informations?.length > 0) {
      const amount = formaterAmount(accountDetails?.informations[0]?.netPremium)
      const currency = accountDetails?.informations[0]?.currency

      setNetPremiumAmount(`$${amount} ${currency}`)
      setInsured(accountDetails?.informations[0]?.insured)
      setAccountId(accountDetails?.id)
      setReceptionDate(convertirFecha(accountDetails?.informations[0]?.receptionDate))
    }
  }, [account, accountDetails])

  useEffect(() => {
    // console.log('accountDetails Effect', accountDetails);

    if (accountDetails) {
      setStatus(accountDetails.status)

      if (Array.isArray(accountDetails.actionsHistory)) {
        if (accountDetails.actionsHistory.length === 0) return

        const lastAction = [...accountDetails.actionsHistory].reverse()

        if (!lastAction[0].idUser) return

        const userName = lastAction[0].idUser.username
        const fullName = `${lastAction[0].idUser.name || 'unknown name'} ${lastAction[0].idUser.surname || ''}`

        setLastUserName(userName || fullName.trim())
      }
    }
  }, [accountDetails])

  // console.log('account', account)

  return (
    <>
      <Card className='info-header' style={{ marginBottom: '16px' }}>
        <div className='form-header-data'>
          <div className='form-container-all-data'>
            {/* Contenedor mobile bound */}
            {/* <ContainerMobileBound>
              <div className='title'>{insured} </div>
              <div className='idNumber'>#{accountId}</div>

              <span className='subtitle'>Net premium</span>
              <span className='moneySubtitle'>${netPremiumAmount}</span>
              <span className='subtitle'>Reception Date</span>
              <span className='reception'>{receptionDate}</span>
            </ContainerMobileBound> */}

            {/* Contenedor mobile bound */}
            {/* Container first */}
            {!isNewAccount && (
              <FormHeaderSection>
                <FormHeaderInfoProfileContainer sx={{ flexDirection: 'row' }}>
                  <Box
                    sx={{
                      '@media (max-width: 764px)': {
                        display: 'none'
                      }
                    }}
                  >
                    <ModalUploadImage accountId={accountId} />
                  </Box>
                  <FormHeaderInfoProfiletext>
                    <span className='form-header-info-profile-txt-title'>{insured}</span>
                    <span className='form-header-info-profile-num'>#{accountId}</span>
                  </FormHeaderInfoProfiletext>
                </FormHeaderInfoProfileContainer>
                <ContainerAmountLastUpdate>
                  <span className='form-header-money-data-txt'>Net premium</span>
                  <span className='form-header-money-data-num'>{netPremiumAmount}</span>
                  <FormHeaderMoneyDataDate>
                    Last Update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                    {lastUserName ? ` by ${lastUserName}` : null}
                  </FormHeaderMoneyDataDate>
                </ContainerAmountLastUpdate>
              </FormHeaderSection>
            )}
            {/* Container first */}
            {/* Container second */}
            <Frame3486
              sx={{
                '@media (max-width: 764px)': {
                  flexDirection: 'column',
                  gap: '20px'
                }
              }}
            >
              <FormSecondContainerFirstside
                sx={{
                  width: isNewAccount ? '19%' : '100%',
                  '@media (max-width: 764px)': {
                    flexDirection: 'column',
                    gap: '12px',
                    width: isNewAccount ? '100%' : '100%'
                  }
                }}
              >
                <SecondContainer
                  sx={{
                    width: '160px',
                    '@media (max-width: 764px)': {
                      width: '100%'
                    }
                  }}
                >
                  <span className='form-secondContainer-header-title'>Status</span>
                  {status !== '' && accountDetails?.status && (
                    <StatusSelect
                      accountDetails={accountDetails}
                      margin={0}
                      initialStatus={accountDetails?.status}
                      setSelectedStatus={setStatus}
                    />
                  )}
                  {isNewAccount && (
                    <StatusSelect
                      accountDetails={accountDetails}
                      margin={0}
                      initialStatus='PENDING'
                      setSelectedStatus={setStatus}
                      isNewAccount={isNewAccount}
                    />
                  )}
                </SecondContainer>

                <div className='form-secondContainer-third'>
                  <span className='form-header-money-data-date'>
                    Last update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                  </span>
                </div>

                {!isNewAccount && (
                  <SecondContainer
                    sx={{
                      width: 'auto',
                      '@media (max-width: 764px)': {
                        width: '100%'
                      }
                    }}
                  >
                    <span className='form-secondContainer-header-title'>Line of Business</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {accountDetails && accountDetails?.informations[0]?.idLineOfBussines?.lineOfBussines}
                    </span>
                  </SecondContainer>
                )}

                {!isNewAccount && (
                  <SecondContainer
                    sx={{
                      width: 'auto',
                      '@media (max-width: 764px)': {
                        width: '100%'
                      }
                    }}
                  >
                    <span className='form-secondContainer-header-title'>Effective Date</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.effectiveDate || null)}
                    </span>
                  </SecondContainer>
                )}
              </FormSecondContainerFirstside>
              <div className={!isNewAccount ? 'actions-header' : 'form-secondContainer-fourths'}>
                <div className={!isNewAccount ? 'display-none' : 'form-secondContainer-fourth'}>
                  <span className='form-header-money-data-date'>
                    Last update: {accountDetails && formatDateFromUTC(accountDetails?.informations[0]?.updatedAt)}
                  </span>
                </div>
                {accountDetails && accountDetails?.idAccountStatus === 5 ? ( //TODO
                  <ActionsHeaderBound accountStatus='BOUND' sideHeader={true} />
                ) : accountId ? (
                  <ActionsHeader
                    accountId={accountId}
                    setEditInfo={setEditInfo}
                    accountStatus='PENDING'
                    sideHeader={true}
                  />
                ) : null}
              </div>
            </Frame3486>
            {/* Container second */}
          </div>
        </div>
      </Card>
    </>
  )
}

export default FormHeader
