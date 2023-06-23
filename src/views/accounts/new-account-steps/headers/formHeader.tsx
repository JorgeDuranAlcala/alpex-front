import { useFindInformationByIdAccount } from '@/hooks/accounts/information'
import { Box, Button, Card, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useAppSelector } from 'src/store'
import StatusSelect from 'src/views/custom/select/StatusSelect'
import ActionsHeader from './ActionsHeader'

// import StatusSelect from 'src/views/custom/select/StatusSelect'

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

//Pending types

const ModalUploadImage = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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

  const handleClose = () => {
    setOpen(false)
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
          <MenuItem onClick={handleClose}>
            <ListItemText>Upload Company Logo</ListItemText>
            <ListItemIcon>
              <Icon icon='ic:baseline-file-upload' style={{ marginLeft: 'auto' }} fontSize={20} />
            </ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemText>Use a Text-Based Logo </ListItemText>
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
    </>
  )
}

const FormHeader = ({ isNewAccount }: any) => {
  const [status, setStatus] = useState({})

  const account = useAppSelector(state => state.accounts?.formsData?.form1)

  const { setIdAccount, information } = useFindInformationByIdAccount()
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
  const formatDate = (date: Date | null | undefined): string => {
    if (date) {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }

      return new Intl.DateTimeFormat('ban', options).format(date)
    }
    return ''
  }
  useEffect(() => {
    account && setIdAccount(account.id)
  }, [account])

  return (
    <>
      <Card className='info-header' style={{ marginBottom: '16px' }}>
        <div className='form-header-data'>
          <div className='form-container-all-data'>
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
                  <span className='form-header-money-data-date'>Last Update: 11 / 03 / 2023</span>
                </div>
              </div>
            )}
            {/* Container first */}

            {/* Container second */}

            <div className='form-secondContainer-wrapper'>
              <div className='form-secondContainer-wrapper-first-side'>
                <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                  <span className='form-secondContainer-header-title'>Status</span>
                  <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                </div>

                <div className='form-secondContainer-third'>
                  <span className='form-header-money-data-date'>Last Update: 11 / 03 / 2023</span>
                </div>
                {!isNewAccount && (
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Line of Business</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {information && formatDate(information?.createdAt)}
                    </span>
                  </div>
                )}

                {!isNewAccount && (
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Reception Date</span>
                    <span className='form-secondContainer-header-subtitle'>
                      {information && formatDate(information?.createdAt)}
                    </span>
                  </div>
                )}
              </div>
              <div className={!isNewAccount ? 'actions-header' : 'form-secondContainer-fourths'}>
                <div className={!isNewAccount ? 'display-none' : 'form-secondContainer-fourth'}>
                  <span className='form-header-money-data-date'>Last Update: 11 / 03 / 2023</span>
                </div>
                <ActionsHeader accountStatus='PENDING' sideHeader={true} />
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
