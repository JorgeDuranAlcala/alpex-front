// ** MUI Imports

import { SubContainerAccountBalanceData } from '@/styles/Payments/BrokerTracer/brokerTracer'

import { Box, Grid } from '@mui/material'

const HeaderTable = () => {
  return (
    <>
      <Box sx={{ marginTop: '20px' }}>
        <SubContainerAccountBalanceData>
          <Grid
            container
            spacing={{ xs: 5, sm: 5, md: 5 }}
            sx={{ display: 'flex', flexDirection: 'row', alingItems: 'center' }}
          >
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Reserve</span>
                <span className='form-secondContainer-header-subtitle'>$0 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Salvage</span>
                <span className='form-secondContainer-header-subtitle'>$0 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Claim Payment</span>
                <span className='form-secondContainer-header-subtitle'>$0 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Suppliers Payment</span>
                <span className='form-secondContainer-header-subtitle'>$0 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Recovery MXN</span>
                <span className='form-secondContainer-header-subtitle'>$0 MXN</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Recovery USD</span>
                <span className='form-secondContainer-header-subtitle'>$0 USD</span>
              </div>
            </Grid>
          </Grid>
        </SubContainerAccountBalanceData>
      </Box>
    </>
  )
}

export default HeaderTable
