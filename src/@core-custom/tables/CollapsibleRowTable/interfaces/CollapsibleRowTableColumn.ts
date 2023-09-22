
import { SxProps, TableCellProps } from '@mui/material';
import { ReactNode } from 'react';

interface RenderCellProps<T> {
  row: T;
  rows: T[];
  rowIndex: number;
}

export interface CollapsibleRowTableColumn<T> {
  name: string;
  label: string | ReactNode;
  sx?: SxProps;
  tableCellProps?: TableCellProps;
  filterMenu?: ReactNode;
  renderCell?: ({ row, rows, rowIndex }: RenderCellProps<T>) => ReactNode;
}
