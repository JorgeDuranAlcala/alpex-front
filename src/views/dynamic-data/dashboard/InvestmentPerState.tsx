// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import ReactApexcharts from '@/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
// import OptionsMenu from 'src/@core/components/option-menu'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Import hooks
import { useGetInvestmentPerState } from '@/hooks/dynamic-data/dashboard'

//Dto imports
// import { InvestmentPerStateDto } from '@/services/dynamic-data/dtos/dashboard.dto'

import { useEffect, useState } from 'react'

const InvestmentPerState = () => {
  // ** Hook
  const theme = useTheme()

  const {getInvestmentPerState} = useGetInvestmentPerState()
  const [totalValfis, setTotalValfis] = useState<string | number>(0)
  const [categories, setCategories] = useState<string[]>([])
  const [series, setSeries] = useState<any[]>([
    {
      name: '',
      data: []
    }
  ])

  const setDataInformation = async () => {
    const data = await getInvestmentPerState()

    if (!data) return

    const newSeries = [
      {
      name: data.name || '',
      data: data.data || [],
      }
    ]


    setSeries(newSeries)
    setTotalValfis(data.totalValfis)
    setCategories(data.categories)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const info: InvestmentPerStateDto = {
  //   totalValfis: '142,000',
  //   name: 'Sales',
  //   data: [14165, 12859, 10375, 8567, 6880],
  //   categories: ['CX', 'NL', 'YU', 'EM', 'PU']
  // }
  // const series = [
  //   {
  //     name: info.name,
  //     data: info.data
  //   }
  // ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '70%',
        horizontal: true,
        distributed: true,
        startingShape: 'rounded',
        dataLabels: {
          hideOverflowingLabels: true,
        },
        rangeBarOverlap: false
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: 8,
      style: {
        fontWeight: 500,
        fontSize: '0.875rem'
      }
    },
    grid: {
      strokeDashArray: 8,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -18,
        left: 21,
        right: 33,
        bottom: 10
      }
    },
    colors: [
      hexToRGBA(theme.palette.primary.light, 1),
      hexToRGBA(theme.palette.success.light, 1),
      hexToRGBA(theme.palette.warning.light, 1),
      hexToRGBA(theme.palette.info.light, 1),
      hexToRGBA(theme.palette.error.light, 1)
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: categories,
      labels: {
        formatter: val => `${Number(val) / 1000}k`,
        style: {
          fontSize: '0.875rem',
          colors: theme.palette.text.disabled
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontWeight: 600,
          fontSize: '0.875rem',
          colors: theme.palette.text.primary
        }
      }
    }
  }


  return (
    <Card className='investment-per-state'>
      <CardHeader
        title='Investment per State'
        subheader={`Total VALFIS sum $${totalValfis}M`}
        sx= {{position: 'relative'}}
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <div className='icon-wrapper'>
            <Tooltip arrow title='Investment per state info.' placement='top'>
              <div className='tooltip-content' style={{ color: 'rgba(87, 90, 111, 0.54)' }}><Icon icon='mdi:information-outline' /></div>
            </Tooltip>
          </div>
        }
      />
      <CardContent
        sx={{
          p: '0 !important',
          '& .apexcharts-canvas .apexcharts-yaxis-label': { fontSize: '0.875rem', fontWeight: 600 },
          '& .apexcharts-canvas .apexcharts-xaxis-label': { fontSize: '0.875rem', fill: theme.palette.text.disabled },
          '& .apexcharts-data-labels .apexcharts-datalabel': {
            fontWeight: 500,
            fontSize: '0.875rem',
            fill: theme.palette.common.white
          }
        }}
      >
        <ReactApexcharts type='bar' height={332} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default InvestmentPerState
