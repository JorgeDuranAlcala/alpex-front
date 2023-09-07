import CollapsibleRowTable from '@/@core-custom/tables/CollapsibleRowTable/CollapsibleRowTable';
import { createCollapsibleRowData } from '@/@core-custom/tables/CollapsibleRowTable/utils/createCollapsibleRowData';

import { Card, styled } from '@mui/material';
import { useContext } from 'react';
import { PayableContext } from '../../context/PayableContext';

// import CustomPagination from './CustomPagination';
import { TextBody2 } from '@/views/arap/_commons/styles/TextBody2';
import Link from 'next/link';
import { PayableColumn } from '../../interfaces/PayableGrid';
import { payableColumns } from './PayableColumns';
import PayableTableHeader from './PayableTableHeader';

// import { columns } from './columns/Columns';

export const PayableTable = () => {

  const { isLoading, payableGrid } = useContext(PayableContext);

  console.log(isLoading);

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
            <Link href={`#${rows[0].capability_id}`} >
              <TextBody2 sx={{ color: '#2535A8' }}>
                {key}
              </TextBody2>
            </Link>
          )
        })}
      />
    </CardTableContainer>
  )
}

const CardTableContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',

  // gap: '16px',

}))
