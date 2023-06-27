type TTextFieldProps = Omit<
  import('@mui/material').TextFieldProps,
  'value' | 'onChange' | 'error' | 'helperText' | 'name' | 'defaultValue' | 'type' | 'children'
>;

interface ISuperFormFieldProps<T> extends ISuperFormConfig<T>, TTextFieldProps {}
