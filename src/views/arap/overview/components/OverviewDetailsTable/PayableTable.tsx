import { Card, CircularProgress, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect } from 'react';
import { OverviewDetailsContext } from '../../context/overviewDetails/OverviewDetailsContext';
import { DetailsType } from '../../interfaces/overview/DetailsType';
import CustomPagination from './CustomPagination';
import TableHeader from './TableHeader';
import { columns } from './columns/PayableColumns';

const DETAILS_TYPE: DetailsType = 'Payable';

export const PayableTable = () => {

  const { isLoading, loadDetailsGrid, payableGrid } = useContext(OverviewDetailsContext);

  useEffect(() => {
    loadDetailsGrid(DETAILS_TYPE)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <CardTableContainer>
      {isLoading ?
        <CircularProgress />
        :
        <TableHeader
          title="Payable"
          subtitle="Total amount of money to be paid per month"
          rightTitle="Total Amount Paid"
          detailsType={DETAILS_TYPE}
        />
      }
      <DataGrid
        loading={isLoading}
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        rows={payableGrid?.payableGridList.map(item => ({
          ...item,
          id: item.transactionId
        })) || []}
        columns={columns}
        pagination
        pageSize={10}
        components={{
          Pagination: () => <CustomPagination detailsType={DETAILS_TYPE} />
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
