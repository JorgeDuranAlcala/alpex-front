import { Box, styled } from "@mui/material"
import { ReceivableTable } from "./components/OverviewDetailsTable/ReceivableTable"
import { OverViewDetailsProvider } from "./context/overviewDetails/OverviewDetailsProvider"


const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const OverviewReceivableView = () => {
  return (
    <OverViewDetailsProvider>
      <ViewContainer>
        <ReceivableTable />
      </ViewContainer>
    </OverViewDetailsProvider>
  )
}
