import { formatDateTemplate } from '@/utils/formatDates';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useEffect } from 'react';
import { useGetPaymentsHistory } from '../../hooks/useGetPaymentsHistory';
import { VerticalChecks } from './VerticalChecks';

interface PaymentsHistoryProps {
  transactionId: string;
}

export const PaymentsHistory = ({ transactionId }: PaymentsHistoryProps) => {

  const {
    isLoading,
    paymentsHistory,
    getPaymentsHistoryByTransactionId
  } = useGetPaymentsHistory();

  useEffect(() => {

    getPaymentsHistoryByTransactionId(transactionId);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }


  if (!paymentsHistory) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        No payments found
      </Box>
    )
  }

  return (
    <ColumnsContainer>
      <ColumnItemTextsContainer>
        <ItemTitle>Policy Created</ItemTitle>
        <ItemSubtitle>{formatDateTemplate(paymentsHistory.policyCreated)}</ItemSubtitle>
      </ColumnItemTextsContainer>

      <ColumnConnector />

      <ColumnItemTextsContainer>
        <ItemTitle>Installments</ItemTitle>
        <ItemSubtitle>{paymentsHistory.installments.filter(item => item.isChecked).length} / {paymentsHistory.installments.length}</ItemSubtitle>

        <VerticalChecks items={paymentsHistory.installments.map(item => ({
          ...item,
          title: item.name,
          date: formatDateTemplate(item.paymentDate),
        }))} />
      </ColumnItemTextsContainer>

      <ColumnConnector />

      <ColumnItemTextsContainer>
        <ItemTitle>Endorsements</ItemTitle>
        <ItemSubtitle>{paymentsHistory.endorsements.filter(item => item.isChecked).length} / {paymentsHistory.endorsements.length}</ItemSubtitle>

        <VerticalChecks items={paymentsHistory.endorsements.map(item => ({
          ...item,
          title: item.name,
          date: formatDateTemplate(item.changedDate),
        }))} />
      </ColumnItemTextsContainer>

      <ColumnConnector />

      <ColumnItemTextsContainer>
        <ItemTitle>Claims</ItemTitle>
        <ItemSubtitle>{paymentsHistory.claims.filter(item => item.isChecked).length} / {paymentsHistory.claims.length}</ItemSubtitle>

        <VerticalChecks items={paymentsHistory.claims.map(item => ({
          ...item,
          title: item.name,
          date: formatDateTemplate(item.claimDate),
        }))} />
      </ColumnItemTextsContainer>

    </ColumnsContainer>
  )
}

const ColumnsContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '24px',

}));

const ColumnItemTextsContainer = styled(Box)(() => ({

  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const ColumnConnector = styled(StepConnector)(() => ({

  flexShrink: '1',
  padding: '20px 10px',

  minWidth: '100px',
  width: '100%',

  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#2535A8',
    borderWidth: '3px',
  },
}));

const ItemTitle = styled(Typography)(() => ({

  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '150%',
  textWrap: 'nowrap',
  color: 'rgba(77, 80, 98, 0.87)',
})) as typeof Typography;

const ItemSubtitle = styled(Typography)(() => ({

  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '125%',
  letterSpacing: '0.4px',

  color: 'rgba(77, 80, 98, 0.68)',
})) as typeof Typography;
