import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Dto imports
// import { SalesThisMonthDto } from '@/services/dynamic-data/dtos/dashboard.dto'

import { useGetSalesThisMonth } from '@/hooks/dynamic-data/dashboard'

const SalesThisMonth = () => {

  const [totalSales, setTotalSales] = useState<number>()
  const [firstDate, setFirstDate] = useState<string>('')
  const [lastDate, setLastDate] = useState<string>('')
  const [series, setSeries] = useState<any[]>([
    {
      data:[]
    }
  ])
  const { getSalesThisMonth } = useGetSalesThisMonth()

  // ** Hook
  const theme = useTheme()

  const setDataInformation = async () => {
    const data = await getSalesThisMonth()

    if (!data) return

    const newSeries= [
      {
        data: data.data
      }
    ]
    setTotalSales(data.total)
    setSeries(newSeries)
    setFirstDate(data.firstDate)
    setLastDate(data.lastDate)

  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 14,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: theme.palette.primary.main
      }
    },
    tooltip: { enabled: false },
    grid: {
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -12,
        left: -2,
        right: 8,
        bottom: -10
      }
    },
    stroke: {
      width: 5,
      lineCap: 'round'
    },
    markers: { size: 0 },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      labels: { show: false }
    }
  }

  return (
    <Card className='sales-this-month'>
      <CardContent sx={{ pb: '0 !important', position: 'relative' }}>
        <Typography variant='h6' sx={{ mb: 2.5 }}>
        Monthly Premiums
        </Typography>
        <Typography variant='body2'>{firstDate} - {lastDate}</Typography>
        <Typography variant='h6'>{`$ ${totalSales}k`}</Typography>

        <ReactApexcharts type='line' height={115} options={options} series={series} />
        <div className='icon-wrapper'>
          <Tooltip arrow title='Invested capital during the ongoing month' placement='top'>
            <div className='tooltip-content' style={{color: 'rgba(87, 90, 111, 0.54)'}}><Icon icon='mdi:information-outline' /></div>
          </Tooltip>
          </div>
      </CardContent>
    </Card>
  )
}

export default SalesThisMonth
