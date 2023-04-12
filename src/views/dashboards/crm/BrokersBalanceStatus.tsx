// ** MUI Imports
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import {
  ContainerAccounts,
  ContainerCircularProgress,
  ContainerFrame,
  ContainerPayments,
  ContainerTitle,
  ContainerTotal,
  ContentTextAccounts,
  HeaderTitle
} from 'src/styles/Dashboard/Brokers/brokerBalanceStatus'

const BrokersBalanceStatus = () => {
  const [broker, setBroker] = useState('')
  const brokers = [
    { name: 'All brokers', value: '' },
    { name: 'broker1', value: 1 },
    { name: 'broker2', value: 2 },
    { name: 'broker3', value: 3 },
    { name: 'broker4', value: 4 },
    { name: 'broker5', value: 5 }
  ]

  const handleOnchange = (e: SelectChangeEvent) => {
    setBroker(e.target.value)
  }
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['#72E128'],
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        track: {
          background: '#C4F7B3'
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 23,
            fontWeight: 600,
            fontSize: '34px',
            color: theme.palette.text.primary
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 0
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  return (
    <Card sx={{ position: 'relative', width: '55%', height: '393px' }}>
      <HeaderTitle>
        <ContainerTitle>
          <Typography variant='h6' sx={{ color: theme.palette.text.primary, fontFamily: 'Inter' }}>
            Brokers balance status
          </Typography>
          <Typography variant='body2' sx={{ fontFamily: 'Inter' }}>
            Overview
          </Typography>
        </ContainerTitle>
      </HeaderTitle>
      <div style={{ padding: '20px 20px 15px 20px' }}>
        <Select
          sx={{ width: '100%', height: '48px' }}
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
      </div>
      <ContainerFrame>
        <ContainerPayments>
          <ContainerAccounts>
            <ContentTextAccounts>
              <Box sx={{ width: '24px', height: '24px', backgroundColor: '#72E128', borderRadius: '4px' }} />
              <Typography sx={{ fontSize: '16px' }}>Paid accounts:</Typography>
            </ContentTextAccounts>
            <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#535353' }}>29</Typography>
          </ContainerAccounts>
          <ContainerAccounts>
            <ContentTextAccounts>
              <Box sx={{ width: '24px', height: '24px', backgroundColor: '#C4F6B3', borderRadius: '4px' }} />
              <Typography sx={{ fontSize: '16px' }}>Unpaid accounts:</Typography>
            </ContentTextAccounts>
            <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#535353' }}>21</Typography>
          </ContainerAccounts>
          <ContainerTotal>
            <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#444444' }}>Total debt:</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#444444' }}>$3,500,000.00 USD</Typography>
          </ContainerTotal>
        </ContainerPayments>
        <ContainerCircularProgress>
          <Typography
            sx={{
              position: 'absolute',
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(76,78,100,0.87)',
              letterSpacing: 0.3,
              bottom: '55%'
            }}
          >
            Paid
          </Typography>
          <ReactApexcharts type='radialBar' height={240} width={240} series={[64]} options={options} />
        </ContainerCircularProgress>
      </ContainerFrame>
    </Card>
  )
}

export default BrokersBalanceStatus
