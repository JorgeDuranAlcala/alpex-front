// ** MUI Imports
import { useGetAll } from '@/hooks/catalogs/account-status/useGetAll'
import { ContainerSelectDownload, HeaderTitle } from '@/styles/Dashboard/DownloadAcounts/downloadAccountsInfo'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import ReportServices from 'src/services/reports/report.service'

//Google Analytics

const DownloadAccountInfo = () => {
  const [status, setStatus] = useState('')

  /*const status = [
    { name: 'Select option', value: '' },
    { name: 'Pending', value: 1 },
    { name: 'No materialized', value: 2 },
    { name: 'Not taken up', value: 3 },
    { name: 'Declined', value: 4 },
    { name: 'Bound', value: 5 },
    { name: 'Reneward', value: 6 },
    { name: 'All accounts', value: 7 }
  ]*/

  const { accountStatus } = useGetAll()

  const handleOnchange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  const handleOnDownload = async () => {
    try {
      const url = await ReportServices.downloadAllAccountsReport({ idStatus: parseInt(status) })
      if (url) {
        const fileToDownload = new File([url], 'AccountsReport.xlsx')
        const downloadUrl = URL.createObjectURL(fileToDownload)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileToDownload.name
        link.click()
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error)
    }
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
        >
          Download
        </Button>
      </ContainerSelectDownload>
    </Card>
  )
}

export default DownloadAccountInfo
