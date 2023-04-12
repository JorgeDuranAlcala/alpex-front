// ** MUI Imports

// ** MUI Imports
import { Typography } from '@mui/material'
import { Container, ContainerHeader, Frame } from 'src/styles/Dashboard/dashboard'

import BrokersBalanceStatus from 'src/views/dashboards/crm/BrokersBalanceStatus'

import DowlandAccountInfo from 'src/views/dashboards/crm/DowlandAccountInfo'

// import LongMenu from 'src/views/dashboards/crm/filter'

import LastBoundAccount from 'src/views/dashboards/crm/LastBoundAccount'

import CrmTable from 'src/views/dashboards/crm/Table'

// import CrmTable from 'src/views/dashboards/crm/CrmTable'

const CrmDashboard = () => {
  return (
    <Container>
      <ContainerHeader>
        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: '500', fontFamily: 'Inter' }}>
          Hi Alejandro
        </Typography>
        <Typography variant='body2' sx={{ fontFamily: 'Inter' }}>
          Welcome to your dashboard
        </Typography>
      </ContainerHeader>
      <Frame>
        <BrokersBalanceStatus />
        <LastBoundAccount />
      </Frame>
      <CrmTable />
      <DowlandAccountInfo />
    </Container>
  )
}

export default CrmDashboard
