// ** MUI Imports
import { Box, Grid, Typography } from '@mui/material'

import { ContainerAmounts, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

const HeaderTable = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: '20px 20px 16px 20px' }}>
      <Grid container spacing={{ xs: 1, sm: 1, md: 1 }} sx={{ alignItems: 'center' }}>
        <Grid item xs={12} sm={2} md={2}>
          <ContainerTitle>
            <Typography
              variant='h6'
              sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}
            >
              Installments
            </Typography>
          </ContainerTitle>
        </Grid>
        <Grid item xs={12} sm={6} md={6}></Grid>
        <Grid item xs={12} sm={4} md={4}>
          <ContainerAmounts>
            <div className='container-total-installments'>
              <span className='form-secondContainer-header-title'>Total Installments</span>
              <span className='form-secondContainer-header-subtitle'>144</span>
            </div>
            <div className='container-total-pending'>
              <span className='form-secondContainer-header-title'>Total Pending</span>
              <span className='form-secondContainer-header-subtitle'>$3,000,000 USD</span>
            </div>
          </ContainerAmounts>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HeaderTable
