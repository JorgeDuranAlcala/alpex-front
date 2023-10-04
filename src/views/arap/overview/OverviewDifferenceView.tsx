import { Box, styled } from '@mui/material'
import { ArapBreadcrumbs } from '../_commons/components/breadcrumbs/ArapBreadcrumbs'
import { DifferenceTable } from './components/OverviewDetailsTable/DifferenceTable'
import { OverViewDetailsProvider } from './context/overviewDetails/OverviewDetailsProvider'

const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'

  // padding: '16px 16px',
}))

export const OverviewDifferenceView = () => {
  return (
    <OverViewDetailsProvider>
      <ViewContainer>
        <ArapBreadcrumbs />
        <DifferenceTable />
      </ViewContainer>
    </OverViewDetailsProvider>
  )
}
