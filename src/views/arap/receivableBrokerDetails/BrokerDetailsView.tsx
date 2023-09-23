import { Box, styled } from '@mui/material'
import { ArapBreadcrumbs } from '../_commons/components/breadcrumbs/ArapBreadcrumbs'
import { InsuredSelectorProvider } from '../_commons/context/InsuredSelector/InsuredSelectorProvider'
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
    <InsuredSelectorProvider>
      <ViewContainer>
        <ArapBreadcrumbs />
        <BrokerCardHeader />
        <BrokerDetails />
      </ViewContainer>
    </InsuredSelectorProvider>
  )
}
