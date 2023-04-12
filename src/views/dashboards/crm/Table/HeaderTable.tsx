// ** MUI Imports
import { Typography } from '@mui/material'
import { ContainerFilters, ContainerHeader, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

const HeaderTable = () => {
  return (
    <ContainerHeader>
      <ContainerTitle>
        <Typography variant='h6' sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}>
          Nearly payments status
        </Typography>
      </ContainerTitle>
      <ContainerFilters></ContainerFilters>
    </ContainerHeader>
  )
}

export default HeaderTable
