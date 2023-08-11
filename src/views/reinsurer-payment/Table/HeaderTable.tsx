// ** MUI Imports
import { Typography } from '@mui/material'
import { ContainerFilters, ContainerHeader, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

const HeaderTable = () => {
  return (
    <ContainerHeader>
      <ContainerTitle>
        <Typography variant='h6' sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}>
          Reinsurer Payment
        </Typography>
      </ContainerTitle>
      <ContainerFilters>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Pendign Payments</span>
          <span className='form-secondContainer-header-subtitle'>144</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Total Balance</span>
          <span className='form-secondContainer-header-subtitle'>$1,000,000 USD</span>
        </div>
      </ContainerFilters>
    </ContainerHeader>
  )
}

export default HeaderTable
