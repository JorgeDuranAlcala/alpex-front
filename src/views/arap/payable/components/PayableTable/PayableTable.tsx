import CollapsibleRowTable from '@/@core-custom/tables/CollapsibleRowTable/CollapsibleRowTable'
import { createCollapsibleRowData } from '@/@core-custom/tables/CollapsibleRowTable/utils/createCollapsibleRowData'

import { Card, styled } from '@mui/material'
import { useContext } from 'react'
import { PayableContext } from '../../context/PayableContext'

// import CustomPagination from './CustomPagination';
import TablePagination from '@/@core-custom/paginations/TablePagination'
import { TextBody2 } from '@/views/arap/_commons/styles/TextBody2'
import Link from 'next/link'
import { PayableColumn } from '../../interfaces/PayableGrid'
import { payableColumns } from './PayableColumns'
import PayableTableHeader from './PayableTableHeader'

// import { columns } from './columns/Columns';

export const PayableTable = () => {
  const {  payableGrid, onChangePage } = useContext(PayableContext)

  return (
    <CardTableContainer>
      <PayableTableHeader />

      <CollapsibleRowTable
        id={'payable_table'}
        columns={payableColumns}
        rows={createCollapsibleRowData<PayableColumn>({
          data: payableGrid ? payableGrid.payableGridList : [],
          groupByColumnName: 'capability_name',
          collapsibleRow: (key, rows) => (
            <Link href={`payables/reinsurer?id=${rows[0].capability_id}`}>
              <TextBody2 sx={{ color: '#2535A8' }}>{key}</TextBody2>
            </Link>
          )
        })}
      />

      {payableGrid ? (
        <TablePagination
          page={Number(payableGrid.info.page.toString())}
          pageCount={Number(payableGrid.info.pages.toString())}
          pageSize={Number(payableGrid.info.take.toString())}
          rowCount={Number(payableGrid.info.count.toString())}
          onChangePage={onChangePage}
        />
      ) : null}
    </CardTableContainer>
  )
}

const CardTableContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '80dvh',

  [theme.breakpoints.down('sm')]: {
    maxHeight: '100%'
  }

  // gap: '16px',
}))
