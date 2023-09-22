import { Box, styled } from "@mui/material"
import { PayableTable } from "./components/PayableTable/PayableTable"
import { PayableProvider } from "./context/PayableProvider"


const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const PayableView = () => {
  return (
    <PayableProvider>
      <ViewContainer>
        <PayableTable />
      </ViewContainer>
    </PayableProvider>
  )
}
