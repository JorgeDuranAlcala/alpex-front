// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Dto imports
import { ProportionInvestmentDto } from '@/services/dynamic-data/dtos/dashboard.dto'

const ProportionInvestment = () => {
  const info: ProportionInvestmentDto = {
    invested: 84,
    avaliable: 22,
  }
  const total = Number(info.invested) + Number(info.avaliable)
  const investedPercentage = (Number(info.invested) * 100) / total
  const avaliablePercentage = (Number(info.avaliable) * 100) / total

  return (
    <Card>
      <CardContent sx={{ py: theme => `${theme.spacing(6.625)} !important` }}>
        <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center' }}>
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
              {`${info.invested}k`}
              </Typography>
            </Box>
            <Typography variant='body2'>Invested</Typography>
          </div>
        </Box>
      </CardContent>

      <CardContent sx={{ py: theme => `${theme.spacing(6.625)} !important` }}>
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
              {`${info.avaliable}k`}
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
