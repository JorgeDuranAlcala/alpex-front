import { RefObject } from "react";
import { CollapsibleRowTableColumn } from "./CollapsibleRowTableColumn";

export interface CollapsibleRowTableRows<T> {
  rowIndex: number;
  rows: T[];
  columns: CollapsibleRowTableColumn<T>[];
  columnRefs: RefObject<HTMLElement>[]
}