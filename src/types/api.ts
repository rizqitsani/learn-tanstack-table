export interface PaginatedApiResponse<DataType> {
  code: number;
  status: string;
  data: DataType;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
