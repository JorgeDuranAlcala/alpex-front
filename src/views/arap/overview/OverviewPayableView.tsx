import { Box, styled } from '@mui/material'
import { ArapBreadcrumbs } from '../_commons/components/breadcrumbs/ArapBreadcrumbs'
import { PayableTable } from './components/OverviewDetailsTable/PayableTable'
import { OverViewDetailsProvider } from './context/overviewDetails/OverviewDetailsProvider'

const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'

  // padding: '16px 16px',
}))

export const OverviewPayableView = () => {
  return (
    <OverViewDetailsProvider>
      <ViewContainer>
        <ArapBreadcrumbs />
        <PayableTable />
      </ViewContainer>
    </OverViewDetailsProvider>
  )
}
