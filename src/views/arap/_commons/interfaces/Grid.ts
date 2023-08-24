export interface Filter {
  type: string;
  value: number | string;
  text: string;
}

export interface PagesInfo {
  count: number;
  page: number | string;
  take: number | string;
  pages: number;
  next: string | null;
  prev: string | null;
}
