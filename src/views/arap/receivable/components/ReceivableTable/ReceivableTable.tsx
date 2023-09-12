import CollapsibleRowTable from '@/@core-custom/tables/CollapsibleRowTable/CollapsibleRowTable';
import { createCollapsibleRowData } from '@/@core-custom/tables/CollapsibleRowTable/utils/createCollapsibleRowData';
import Link from 'next/link';
import { useContext } from 'react';

import { TextBody2 } from '@/views/arap/_commons/styles/TextBody2';
import { Card, styled } from '@mui/material';
import { ReceivableContext } from '../../context/ReceivableContext';

// import CustomPagination from './CustomPagination';
import { ReceivableColumn } from '../../interfaces/ReceivableGrid';
import { receivableColumns } from './ReceivableColumns';
import ReceivableTableHeader from './ReceivableTableHeader';

// import { columns } from './columns/Columns';

export const ReceivableTable = () => {

  const { receivableGrid } = useContext(ReceivableContext);


  return (
    <CardTableContainer>
      <ReceivableTableHeader />

      <CollapsibleRowTable
        id={'payable_table'}
        columns={receivableColumns}
        rows={createCollapsibleRowData<ReceivableColumn>({
          data: receivableGrid ? receivableGrid.receivableGridList : [],
          groupByColumnName: 'capability_name',
          collapsibleRow: (key, rows) => (
            <Link href={`receivables/broker?id=${rows[0].capability_id}`} >
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
