// ** MUI Imports
import { useGetAll } from '@/hooks/catalogs/account-status/useGetAll'
import { ContainerSelectDownload, HeaderTitle } from '@/styles/Dashboard/DownloadAcounts/downloadAccountsInfo'
import { delayMs } from '@/utils/formatDates'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import ReportServices from 'src/services/reports/report.service'

const DownloadAccountInfo = () => {
  // Notifications
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const [status, setStatus] = useState('')

  const { accountStatus } = useGetAll()

  const handleOnchange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  const handleOnDownload = async () => {
    setBadgeData({
      message: `DOWNLOADING ACCOUNTS INFO`,
      status: 'secondary',
      open: true,
      icon: <CircularProgress size={20} color='primary' />,
      backgroundColor: '#828597',
      theme: 'info',
      disableAutoHide: true
    })
    await delayMs(1000)

    try {
      const accountsBuffer = await ReportServices.downloadAllAccountsReport({ idStatus: parseInt(status) })
      if (accountsBuffer) {
        setBadgeData({
          message: `DOWNLOADED SUCCESSFULLY`,
          status: 'success',
          open: true,
          icon: <Icon icon='ic:baseline-check-circle' />,
          theme: 'success',
          disableAutoHide: true
        })
        await delayMs(1000)

        const fileToDownload = new File([accountsBuffer], 'Template_Accounts_Info_Alpex.xlsx')
        const downloadUrl = URL.createObjectURL(fileToDownload)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileToDownload.name
        link.click()
      }
    } catch (error) {
      console.error(error)
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

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const useColor = userThemeConfig.palette?.buttonText.primary
  const size = userThemeConfig.typography?.size.px15
  const textColor = userThemeConfig.palette?.text.title

  return (
    <Card
      sx={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        marginTop: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <CustomAlert {...badgeData} />
      <HeaderTitle>
        <Typography
          variant='h6'
          sx={{ fontFamily: inter, fontSize: '20px', color: textColor, letterSpacing: '0.15px', fontWeight: 500 }}
        >
          Download accounts info
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontFamily: inter,
            fontSize: '14px',
            color: userThemeConfig.palette?.text.subTitle,
            letterSpacing: '0.15px'
          }}
        >
          Select an option and click on the button to download
        </Typography>
      </HeaderTitle>
      <ContainerSelectDownload>
        <Select
          sx={{ width: '71%', height: '100%', '@media (max-width:599px)': { width: '100%', height: '38px' } }}
          value={status}
          displayEmpty
          onChange={e => {
            handleOnchange(e)
          }}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={selected =>
            selected.length === 0
              ? 'Select option'
              : accountStatus.find(accountStatus => accountStatus.id === Number(selected))?.status
          }
        >
          {accountStatus?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.status}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant='outlined'
          sx={{
            width: '29%',
            height: '100%',
            color: useColor,
            fontFamily: inter,
            fontSize: size,
            '@media (max-width:599px)': { width: '100%', height: '38px' }
          }}
          startIcon={<FileDownloadIcon />}
          onClick={handleOnDownload}
          disabled={status === ''}
        >
          Download
        </Button>
      </ContainerSelectDownload>
    </Card>
  )
}

export default DownloadAccountInfo
