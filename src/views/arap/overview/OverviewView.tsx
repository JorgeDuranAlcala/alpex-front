import { Box, styled } from "@mui/material"

import { MasterFiltersProvider } from "./context/masterFilters/MasterFiltersProvider"
import { PaymentsProvider } from "./context/payments/PaymentsProvider"

import { BalanceOfPayments } from "./components/BalanceOfPayments/BalanceOfPayments"
import { HeaderCard } from "./components/HeaderCard"
import { MasterFilters } from "./components/MasterFilters/MasterFilters"
import { PaymentsTable } from "./components/PaymentsTable/PaymentsTable"
import { useCleanPaymentsStorage } from "./hooks/useCleanPaymentsStorage"


const ViewContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // padding: '16px 16px',
}))

export const OverviewView = () => {
  useCleanPaymentsStorage();

  return (
    <PaymentsProvider>
      <MasterFiltersProvider>
        <ViewContainer>
          <HeaderCard>
            <MasterFilters />
            <BalanceOfPayments />
          </HeaderCard>
          <PaymentsTable />
        </ViewContainer>
      </MasterFiltersProvider>
    </PaymentsProvider>
  )
}
