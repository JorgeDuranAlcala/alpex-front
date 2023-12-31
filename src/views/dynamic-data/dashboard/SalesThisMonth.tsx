// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Dto imports
import { SalesThisMonthDto } from '@/services/dynamic-data/dtos/dashboard.dto'


const SalesThisMonth = () => {
  // ** Hook
  const theme = useTheme()

  const info: SalesThisMonthDto = {
    total: 28.450,
    data:[12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25]
  }

  const series = [{ data: info.data }]

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
    <Card>
      <CardContent sx={{ pb: '0 !important' }}>
        <Typography variant='h6' sx={{ mb: 2.5 }}>
          Sales This Months
        </Typography>
        <Typography variant='body2'>Total Sales This Month</Typography>
        <Typography variant='h6'>{`$ ${info.total}k`}</Typography>

        <ReactApexcharts type='line' height={115} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default SalesThisMonth
