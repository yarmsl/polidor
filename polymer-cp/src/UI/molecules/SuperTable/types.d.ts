interface ISuperTableProps<T> extends TMuiTableProps {
  data: T[];
  config: ISuperTableConfig<T>[];
  isLoading?: boolean;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  onOpen?: (rowData: T) => void;
}

interface ISuperTableConfig<T> {
  title: string;
  id: keyof T;
  type?: 'string' | 'number' | 'date' | 'boolean';
  render?: (rowData: T) => React.ReactNode;
  ellipsis?: boolean;
}

interface ISuperCellProps<T> {
  config: ISuperTableConfig<T>;
  rowData: T;
}

interface IEllipsisCellProps {
  title: string;
  value: string;
  length?: number;
}

interface IListCellProps {
  title: string;
  listData: { src?: string; title: string; onClick?: () => void }[];
}
