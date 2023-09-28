import { RowCollapsibleData } from "../interfaces/CollapsibleRowTableProps";
import { CreateCollapsibleDataProps } from "../interfaces/CreateCollapsibleDataProps";


export const createCollapsibleRowData = <T,>({ data, groupByColumnName, collapsibleRow }: CreateCollapsibleDataProps<T>): RowCollapsibleData<T>[] => {

  const groupedData = data.reduce((acc: { [key: string]: T[] }, curr: T) => {
    const groupBy = (curr as { [key: string]: string })[groupByColumnName];

    if (!acc[groupBy]) {
      acc[groupBy] = [];
    }

    acc[groupBy].push(curr);

    return acc;

  }, {});

  return Object.keys(groupedData).map((key) => {
    return {
      collapsibleRow: collapsibleRow(key, groupedData[key] as T[]),
      collapsibleRowData: groupedData[key] as T[]
    }
  })
}
