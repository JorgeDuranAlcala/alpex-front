import { Box, styled } from '@mui/material'
import { ArapBreadcrumbs } from '../_commons/components/breadcrumbs/ArapBreadcrumbs'
import { InsuredSelectorProvider } from '../_commons/context/InsuredSelector/InsuredSelectorProvider'
import { ReinsurerCardHeader } from './components/ReinsurerCardHeader'
import { ReinsurerDetails } from './components/ReinsurerDetails'

const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'

  // padding: '16px 16px',
}))

export const ReinsurerDetailsView = () => {
  return (
    <InsuredSelectorProvider>
      <ViewContainer>
        <ArapBreadcrumbs />
        <ReinsurerCardHeader />
        <ReinsurerDetails />
      </ViewContainer>
    </InsuredSelectorProvider>
  )
}
