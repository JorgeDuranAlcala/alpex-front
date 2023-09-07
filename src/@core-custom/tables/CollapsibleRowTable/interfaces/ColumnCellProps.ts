import { RefObject } from "@fullcalendar/core";
import { CollapsibleRowTableColumn } from "./CollapsibleRowTableColumn";


export interface ColumnCellProps<T> extends CollapsibleRowTableColumn<T> {
  columnRef: RefObject<HTMLElement>;
}