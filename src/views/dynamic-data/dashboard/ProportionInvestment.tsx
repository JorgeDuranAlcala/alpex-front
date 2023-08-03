// ** MUI Imports
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Dto imports
import { useGetProportionInvestment } from '@/hooks/dynamic-data/dashboard'
import { ProportionInvestmentDto } from '@/services/dynamic-data/dtos/dashboard.dto'

const ProportionInvestment = () => {
  const [investedPercentage, setInvestedPercentage] = useState<number>(0)
  const [avaliablePercentage, setAvaliablePercentage] = useState<number>(0)
  const [proportion, setProportion] = useState<ProportionInvestmentDto>({
    invested: 0,
    avaliable: 0,
  })

  const { getProportionInvestment } = useGetProportionInvestment()

  const setDataInformation = async () => {
    const data = await getProportionInvestment()

    if (!data) return

    const updateProportion = {
      invested: data.invested || '',
      avaliable: data.avaliable || 0,

    }
    const total = Number(data.invested) + Number(data.avaliable)
    const invested = (Number(data.invested) * 100) / total
    const avaliable = (Number(data.avaliable) * 100) / total

    setInvestedPercentage(invested)
    setAvaliablePercentage(avaliable)
    setProportion(updateProportion)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const info: ProportionInvestmentDto = {
  //   invested: 84,
  //   avaliable: 22,
  // }
  // const total = Number(info.invested) + Number(info.avaliable)
  // const investedPercentage = (Number(info.invested) * 100) / total
  // const avaliablePercentage = (Number(info.avaliable) * 100) / total

  return (
    <Card>
      <CardContent sx={{ py: theme => `${theme.spacing(6.625)} !important`, paddingTop: '1.2rem' }}>
        <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center', position: 'relative'}}>
          <Box sx={{ mr: 6.5, display: 'flex', position: 'relative' }}>
            <CircularProgress
              size={60}
              value={100}
              thickness={5}
              variant='determinate'
              sx={{
                position: 'absolute',
                color: 'customColors.trackBg',
                '& .MuiCircularProgress-circle': { strokeWidth: 4 }
              }}
            />
            <CircularProgress
              size={60}
              value={investedPercentage}
              thickness={5}
              color='warning'
              variant='determinate'
              sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
            />
            <Box
              sx={{
                mt: -3,
                ml: -2.5,
                top: '50%',
                left: '50%',
                display: 'flex',
                position: 'absolute',
                color: '#FFB446'
              }}
            >
              <Icon icon='mdi:currency-usd-off' fontSize={20} />
            </Box>
          </Box>
          <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 1.75 }}>
              {`${proportion.invested}k`}
              </Typography>
            </Box>
            <Typography variant='body2'>Invested</Typography>
          </div>
          <div className='icon-wrapper'>
          <Tooltip arrow title='Proportion invesment info.' placement='top'>
            <div className='tooltip-content' style={{color: 'rgba(87, 90, 111, 0.54)'}}><Icon icon='mdi:information-outline' /></div>
          </Tooltip>
          </div>
        </Box>
      </CardContent>

      <CardContent sx={{ py: theme => `${theme.spacing(6.625)} !important`, paddingTop: '1rem' }}>
        <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 6.5, position: 'relative' }}>
            <CircularProgress
              size={60}
              value={100}
              thickness={5}
              variant='determinate'
              sx={{
                position: 'absolute',
                color: 'customColors.trackBg',
                '& .MuiCircularProgress-circle': { strokeWidth: 4 }
              }}
            />
            <CircularProgress
              size={60}
              thickness={5}
              value={avaliablePercentage}
              color='success'
              variant='determinate'
              sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
            />
            <Box sx={{ mt: -3, ml: -2.5, position: 'absolute', top: '50%', left: '50%', color: 'success.main' }}>
              <Icon icon='mdi:currency-usd' fontSize={20} />
            </Box>
          </Box>
          <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 1.75 }}>
              {`${proportion.avaliable}k`}
              </Typography>
            </Box>
            <Typography variant='body2'>Avaliable</Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProportionInvestment
