import IconifyIcon from '@/@core/components/icon';
import { Box, CircularProgress, styled } from '@mui/material';
import { useContext } from 'react';
import { MasterFiltersContext } from '../../context/masterFilters/MasterFiltersContext';
import { CardDetail } from './CardDetail';





export const BalanceOfPayments = () => {

  const { isLoading, balanceOfPayments, queryParams } = useContext(MasterFiltersContext);

  return (
    <CardsContainer>

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : null}
      {balanceOfPayments && !isLoading ? (
        <>
          <CardDetail
            title="Receivable"
            href={`/receivable?${queryParams}`}
            amount={balanceOfPayments.receivableAmount}
            currency={balanceOfPayments.currency}
            footerDescription='Total amount of money received per month'
          />

          <IconifyIcon icon="ph:minus-fill" style={{ minWidth: '50px' }} />

          <CardDetail
            title="Payable"
            href={`/payable?${queryParams}`}
            amount={balanceOfPayments.payableAmount}
            currency={balanceOfPayments.currency}
            footerDescription='Total amount of money to be paid per month'
          />

          <IconifyIcon icon="ph:equals-fill" style={{ minWidth: '50px' }} />

          <CardDetail
            title="Difference"
            href={`/difference?${queryParams}`}
            amount={balanceOfPayments.differenceAmount}
            currency={balanceOfPayments.currency}
            footerDescription='Total amount of money left per month'
          />
        </>) : null}
    </CardsContainer>
  )
}

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '8px',
  }
}));


const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '133px',
}));
