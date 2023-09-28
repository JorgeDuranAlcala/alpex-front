import { Box, styled } from "@mui/material"
import { ReceivableTable } from "./components/ReceivableTable/ReceivableTable"
import { ReceivableProvider } from "./context/ReceivableProvider"


const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const ReceivableView = () => {
  return (
    <ReceivableProvider>
      <ViewContainer>
        <ReceivableTable />
      </ViewContainer>
    </ReceivableProvider>
  )
}
