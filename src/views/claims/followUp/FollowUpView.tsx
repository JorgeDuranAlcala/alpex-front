import { Box, styled } from "@mui/material"
import { FollowUpTable } from "./components/Table/FollowUpTable"
import { FollowUpProvider } from "./context/followUp/FollowUpProvider"
import { MasterFiltersProvider } from "./context/masterFilters/MasterFiltersProvider"

// import { HeaderCard } from "./components/HeaderCard"

const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const OverviewView = () => {
  return (
    <FollowUpProvider>
      <MasterFiltersProvider>
        <ViewContainer>
          <FollowUpTable />
        </ViewContainer>
      </MasterFiltersProvider>
    </FollowUpProvider>
  )
}
