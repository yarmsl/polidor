type TSwitchProps = Omit<
  import('@mui/material').SwitchProps,
  'type' | 'defaultValue' | 'name' | 'value' | 'onChange' | 'checked' | 'type'
>;

interface ISwitchFormFieldProps<T> extends ISuperFormConfig<T>, TSwitchProps {}
