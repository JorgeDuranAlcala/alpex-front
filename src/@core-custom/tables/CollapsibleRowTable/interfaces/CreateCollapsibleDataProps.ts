export interface CreateCollapsibleDataProps<T> {
  data: T[];
  groupByColumnName: string;
  collapsibleRow: (key: string, rows: T[]) => JSX.Element;
}