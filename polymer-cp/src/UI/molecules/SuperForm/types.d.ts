interface ISuperFormProps<T, Dto> {
  defaultValues?: import('react-hook-form').DeepPartial<Dto>;
  config: ISuperFormConfig<T>[];
  size?: 'small' | 'medium';
  onSave?: (data: Dto) => Promise<void>;
}

interface ISuperFormConfig<T> {
  label: string;
  name: keyof T;
  type?: 'string' | 'number' | 'select' | 'multiselect' | 'boolean';
  required?: boolean;
  defaultValue: string | number | boolean | string[];
  selectItems?: { src?: string; value: string; label: string }[];
}
