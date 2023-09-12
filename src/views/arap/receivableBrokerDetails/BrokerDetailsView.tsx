import { Box, styled } from '@mui/material'
import { BrokerCardHeader } from './components/BrokerCardHeader'
import { BrokerDetails } from './components/BrokerDetails'

const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'

  // padding: '16px 16px',
}))

export const BrokerDetailsView = () => {
  return (
    <ViewContainer>
      <BrokerCardHeader />
      <BrokerDetails />
    </ViewContainer>
  )
}
