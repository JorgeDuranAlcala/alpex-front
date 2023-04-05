// ** MUI Imports

// ** MUI Imports
import { Typography } from '@mui/material'
import { Container, ContainerHeader, Frame } from 'src/styles/Dashboard/dashboard'

import BrokersBalanceStatus from 'src/views/dashboards/crm/BrokersBalanceStatus'
import CrmTable from 'src/views/dashboards/crm/CrmTable'
import DowlandAccountInfo from 'src/views/dashboards/crm/DowlandAccountInfo'
import LastBoundAccount from 'src/views/dashboards/crm/LastBoundAccount'

const CrmDashboard = () => {
  return (
    <Container>
      <ContainerHeader>
        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: '500' }}>
          Hi Alejandro
        </Typography>
        <Typography variant='body2'>Welcome to your dashboard</Typography>
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
