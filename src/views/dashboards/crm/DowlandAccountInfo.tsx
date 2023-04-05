// ** MUI Imports
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import { ContainerSelectDowland, HeaderTitle } from 'src/styles/Dashboard/DowlandAcounts/dowlandAccountsInfo'

const DowlandAccountInfo = () => {
  const [broker, setBroker] = useState('')
  const brokers = [
    { name: 'Select option', value: '' },
    { name: 'option1', value: 1 },
    { name: 'option2', value: 2 },
    { name: 'option3', value: 3 },
    { name: 'option4', value: 4 },
    { name: 'option5', value: 5 }
  ]

  const handleOnchange = (e: SelectChangeEvent) => {
    setBroker(e.target.value)
  }

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
        <Typography variant='h6' sx={{ fontFamily: 'Inter', fontSize: '20px', color: 'rgba(68, 72, 84, 0.87)' }}>
          Download accounts info
        </Typography>
        <Typography variant='body2' sx={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(68, 72, 84, 0.68)' }}>
          Select an option and click on the button to download
        </Typography>
      </HeaderTitle>
      <ContainerSelectDowland>
        <Select
          sx={{ width: '75%', height: '100%' }}
          value={broker}
          displayEmpty
          onChange={e => {
            handleOnchange(e)
            console.log(e.target.value)
          }}
        >
          {brokers?.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Button variant='outlined' sx={{ width: '25%', height: '100%' }} startIcon={<FileDownloadIcon />}>
          Download
        </Button>
      </ContainerSelectDowland>
    </Card>
  )
}

export default DowlandAccountInfo
