import { Box, styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import { CollapsibleRowTableRows } from '../interfaces/CollapsibleRowTableRows';

export const DataRow = <T,>({ rowIndex, columns, rows, columnRefs }: CollapsibleRowTableRows<T>) => {

  const $boxRef = useRef<HTMLElement[]>([]);
  const rowData: T | null = rows[rowIndex] || null;

  useEffect(() => {
    columnRefs.forEach((columnRef, index) => {
      $boxRef.current[index].style.minWidth = columnRef.current?.offsetWidth + 'px' || '100px';
    })
  }, [columnRefs]);

  if (!rowData) return null;

  return (
    <BoxCellStyled>
      {columns.map((column, index) => (
        <Box
          ref={(el: HTMLElement) => $boxRef.current.push(el)}
          key={`row_column_cell_${index}_${rowIndex}_${column.name}`}
          padding="none"
          sx={{
            // border: '1px solid blue',
            padding: '16px !important',
            borderTop: '1px solid rgba(87, 90, 111, 0.12)',
            ...(column.sx ? column.sx : {}),
          }}
        >
          {column.renderCell ?
            column.renderCell({
              row: rowData,
              rows: rows,
              rowIndex,
            })
            :
            (rowData as { [key: string]: any })[column.name]
          }
        </Box>
      ))}

    </BoxCellStyled>
  )
}

const BoxCellStyled = styled(Box)(() => ({
  display: 'flex', alignItems: 'stretch',

  color: 'rgba(77, 80, 98, 0.87)',
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '142.857%',
  letterSpacing: '0.15px',
}))
