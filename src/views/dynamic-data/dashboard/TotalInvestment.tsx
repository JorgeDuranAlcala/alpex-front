
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Dto imports
import { TotalInvestmentDto } from '@/services/dynamic-data/dtos/dashboard.dto'

const TotalInvestment = () => {
  // ** Props

  const info: TotalInvestmentDto ={
    trend: 'positive',
    total: 48.2,
    differencePercentage: 22.5,
  }


  return (
    <Card className='total-investment'>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 6, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'0'}}>
          <CustomAvatar skin='light' variant='rounded' color={'success'}>
            <Icon icon='mdi:currency-usd' />
          </CustomAvatar>
          <Box
            sx={{ display: 'flex', flexWrap:'wrap', marginLeft: '15px',alignItems: 'center', color: info.trend === 'positive' ? 'success.main' : 'error.main' }}
          >
            <div className='dashboard-row' style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <Typography variant='h6' sx={{ mb: 1 }}>
            {`$ ${info.total}k`}
          </Typography>
          <Icon icon={info.trend === 'positive' ? 'mdi:chevron-up' : 'mdi:chevron-down'} fontSize='1.25rem' />
            <Typography variant='subtitle2' sx={{ color: info.trend === 'positive' ? 'success.main' : 'error.main' }}>
            {` ${info.differencePercentage}%`}
            </Typography>
            </div>
            <div className="dashboard-row">

 <Typography variant='body2' sx={{ mb: 5 }}>
          Total investment
        </Typography>
            </div>


          </Box>
        </Box>


      </CardContent>
    </Card>
  )
}

export default TotalInvestment
