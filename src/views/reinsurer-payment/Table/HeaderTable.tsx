// ** MUI Imports
import {
  ContainerTotalBalance,
  SubContainerReinsurerPaymenData
} from '@/styles/Payments/ReinsurerPayment/reinsurerPayment'
import { Grid, Typography } from '@mui/material'
import { ContainerHeader, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

const HeaderTable = () => {
  return (
    <ContainerHeader>
      <SubContainerReinsurerPaymenData>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{ display: 'flex', flexDirection: 'row', alingItems: 'center' }}
        >
          <Grid item xs={12} sm={3} md={3} sx={{ mt: 2 }}>
            <ContainerTitle>
              <Typography
                variant='h6'
                sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}
              >
                Reinsurer Payment
              </Typography>
            </ContainerTitle>
          </Grid>
          <Grid item xs={12} sm={5} md={5}></Grid>
          <Grid item xs={12} sm={4} md={4}>
            <ContainerTotalBalance>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Pendign Payments</span>
                <span className='form-secondContainer-header-subtitle'>144</span>
              </div>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Total Balance</span>
                <span className='form-secondContainer-header-subtitle'>$1,000,000 USD</span>
              </div>
            </ContainerTotalBalance>
          </Grid>
        </Grid>
      </SubContainerReinsurerPaymenData>
    </ContainerHeader>
  )
}

export default HeaderTable
