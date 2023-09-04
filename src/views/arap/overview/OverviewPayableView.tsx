import { Box, styled } from "@mui/material"


const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const OverviewPayableView = () => {
  return (
    <ViewContainer>
      Render table
    </ViewContainer>
  )
}
