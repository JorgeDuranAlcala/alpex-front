import { ReactNode } from 'react';
import { CollapsibleRowTableColumn } from "./CollapsibleRowTableColumn";

export interface CollapsibleRowTableProps<T> {
  id: string;
  columns: CollapsibleRowTableColumn<T>[];
  rows: RowCollapsibleData<T>[];

  ariaLabel?: string;

}

export interface RowCollapsibleData<T> {
  collapsibleRow: ReactNode;
  collapsibleRowData: T[];
}

export interface CollapsibleRowProps {
  collapsibleRow: ReactNode;
  colSpan: number;
  children: ReactNode;
}