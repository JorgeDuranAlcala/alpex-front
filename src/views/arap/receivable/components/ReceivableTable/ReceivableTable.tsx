import TablePagination from '@/@core-custom/paginations/TablePagination'
import CollapsibleRowTable from '@/@core-custom/tables/CollapsibleRowTable/CollapsibleRowTable'
import { createCollapsibleRowData } from '@/@core-custom/tables/CollapsibleRowTable/utils/createCollapsibleRowData'
import Link from 'next/link'
import { useContext } from 'react'

import { TextBody2 } from '@/views/arap/_commons/styles/TextBody2'
import { Card, styled } from '@mui/material'
import { ReceivableContext } from '../../context/ReceivableContext'

// import CustomPagination from './CustomPagination';
import { ReceivableColumn } from '../../interfaces/ReceivableGrid'
import { receivableColumns } from './ReceivableColumns'
import ReceivableTableHeader from './ReceivableTableHeader'

// import { columns } from './columns/Columns';

export const ReceivableTable = () => {
  const { receivableGrid, onChangePage } = useContext(ReceivableContext)

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
            <Link href={`receivables/broker?id=${rows[0].capability_id}`}>
              <TextBody2 sx={{ color: '#2535A8' }}>{key}</TextBody2>
            </Link>
          )
        })}
      />

      {receivableGrid ? (
        <TablePagination
          page={Number(receivableGrid.info.page.toString())}
          pageCount={Number(receivableGrid.info.pages.toString())}
          pageSize={Number(receivableGrid.info.take.toString())}
          rowCount={Number(receivableGrid.info.count.toString())}
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
