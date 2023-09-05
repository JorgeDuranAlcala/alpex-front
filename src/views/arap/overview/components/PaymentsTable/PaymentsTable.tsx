import { Card, CircularProgress, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { PaymentsContext } from '../../context/payments/PaymentsContext';
import CustomPagination from './CustomPagination';
import TableHeader from './TableHeader';
import { columns } from './columns/Columns';

export const PaymentsTable = () => {

  const { isLoading, paymentsGrid } = useContext(PaymentsContext);

  console.log("esto se mapea", paymentsGrid);

  return (
    <CardTableContainer>
      {isLoading ? <><CircularProgress /></> :
        <>

          <TableHeader />
        </>}
      <DataGrid
        loading={isLoading}
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        rows={paymentsGrid?.paymentsGridList.map(paymentItem => ({
          ...paymentItem,
          id: paymentItem.transactionId
        })) || []}
        columns={columns}
        pagination
        pageSize={10}

        components={{
          Pagination: CustomPagination
        }}
        className={'account-datagrid'}

      // selectionModel={selectAllFlag ? selectAll : undefined}
      // onSelectionModelChange={rows => setSelectedRows(rows)}
      />
    </CardTableContainer>
  )
}

const CardTableContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',

  // gap: '16px',


}))
