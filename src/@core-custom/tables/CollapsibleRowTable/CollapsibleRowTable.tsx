import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

// import TableCell from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, createRef } from 'react';
import { CollapsibleRow } from './components/CollapsibleRow';
import { ColumnCell } from './components/ColumnCell';
import { DataRow } from './components/DataRow';
import { CollapsibleRowTableProps } from './interfaces/CollapsibleRowTableProps';



export default function CollapsibleRowTable<T>({ id, columns, rows, ariaLabel }: CollapsibleRowTableProps<T>) {

  const $columnCellRefs = columns.map(() => createRef<HTMLElement>());



  return (
    <TableContainer component={Paper}>
      <Table aria-label={ariaLabel || `${id} 'collapsible table' `}>
        <TableHead>
          <TableRow>

            {columns.map((column, index) => (
              <ColumnCell<T>
                key={column.name}
                name={column.name}
                columnRef={$columnCellRefs[index]}
                label={column.label}
                sx={column.sx}
                tableCellProps={column.tableCellProps}
                filterMenu={column.filterMenu}
              />
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CollapsibleRow
              key={`${id}_${index}`}
              collapsibleRow={row.collapsibleRow}
              colSpan={columns.length}
            >
              {$columnCellRefs.length > 0 ?
                row.collapsibleRowData.map((rowDataItem, rowIndex) => (

                  <Fragment key={`rowData_${id}_${index}_${rowIndex}`}>
                    <DataRow<T>
                      rowIndex={rowIndex}
                      rows={row.collapsibleRowData}
                      columns={columns}
                      columnRefs={$columnCellRefs}
                    />
                  </Fragment>
                ))
                : null}

            </CollapsibleRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
