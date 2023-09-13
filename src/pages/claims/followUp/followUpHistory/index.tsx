// ** MUI ImportsuseMultiTabButtons'
import TableHistory from '@/views/claims/Components/TableHistory/Table'
import { Box, Button, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import router from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OverViewHistory = () => {
  return (
    <Grid item xs={12}>
      <Button
        style={{ color: '#4D5062DE', textTransform: 'none', marginBottom: '24px' }}
        startIcon={<Icon icon='mdi:arrow-left' />}
        onClick={() => router.push('/claims/CustomerIdentification/')}
      >
        Back to Follow-up
      </Button>
      <Card>
        <Grid item xs={12} sm={12} md={12}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant='h6' margin={4}>
              Follow-up History
            </Typography>
            <Icon style={{ margin: '20px' }} icon={'mdi:download'} fontSize={24} color='rgb(37, 53, 168)' />
          </Box>
        </Grid>
        <TableHistory />
      </Card>
    </Grid>
  )
}

export default OverViewHistory
