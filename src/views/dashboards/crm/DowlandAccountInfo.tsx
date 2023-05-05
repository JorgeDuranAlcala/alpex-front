// ** MUI Imports
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { ContainerSelectDowland, HeaderTitle } from 'src/styles/Dashboard/DowlandAcounts/dowlandAccountsInfo'

const DowlandAccountInfo = () => {
  const [broker, setBroker] = useState('')
  const brokers = [
    { name: 'Select option', value: '' },
    { name: 'Pending', value: 1 },
    { name: 'No materialized', value: 2 },
    { name: 'Not taken up', value: 3 },
    { name: 'Declined', value: 4 },
    { name: 'Bound', value: 5 },
    { name: 'Reneward', value: 6 },
    { name: 'All accounts', value: 7 }
  ]

  const handleOnchange = (e: SelectChangeEvent) => {
    setBroker(e.target.value)
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
        height: '178px',
        marginTop: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
      <ContainerSelectDowland>
        <Select
          sx={{ width: '71%', height: '100%' }}
          value={broker}
          displayEmpty
          onChange={e => {
            handleOnchange(e)
            console.log(e.target.value)
          }}
          IconComponent={KeyboardArrowDownIcon}
        >
          {brokers?.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant='outlined'
          sx={{ width: '29%', height: '100%', color: useColor, fontFamily: inter, fontSize: size }}
          startIcon={<FileDownloadIcon />}
        >
          Download
        </Button>
      </ContainerSelectDowland>
    </Card>
  )
}

export default DowlandAccountInfo
