interface ISuperFormProps<T, Dto> {
  defaultValues?: import('react-hook-form').DeepPartial<Dto>;
  config: ISuperFormConfig<T>[];
  size?: 'small' | 'medium';
  onSave?: (data: Dto) => Promise<void>;
}

interface ISuperFormConfig<T> {
  label: string;
  name: keyof T;
  type?: 'string' | 'number' | 'select' | 'multiselect' | 'boolean' | 'multiline';
  required?: boolean;
  defaultValue: string | number | boolean | string[];
  selectItems?: { src?: string; value: string; label: string }[];
  rules?: Omit<
    import('react-hook-form').RegisterOptions<import('react-hook-form').FieldValues, string>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'required'
  >;
}
