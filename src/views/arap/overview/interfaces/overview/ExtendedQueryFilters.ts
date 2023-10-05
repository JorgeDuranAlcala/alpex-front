import { ExtendedDifferenceQueryFilters } from "./DifferenceGrid";
import { ExtendedPayableQueryFilters } from "./PayableGrid";
import { ExtendedReceivableQueryFilters } from "./ReceivableGrid";

export interface ExtendedQueryFilters extends  ExtendedReceivableQueryFilters, ExtendedPayableQueryFilters, ExtendedDifferenceQueryFilters {
  page?: number;
}