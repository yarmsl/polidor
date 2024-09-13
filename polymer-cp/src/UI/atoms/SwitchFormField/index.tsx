import { Controller, useFormContext } from 'react-hook-form';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { genericMemo } from '~/lib/constants';

export const SwitchFormField = genericMemo(
  <T,>({ label, name, defaultValue, type: _type, ...rest }: ISwitchFormFieldProps<T>) => {
    const { control } = useFormContext();
    return (
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name as string}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={<Switch checked={value} onChange={onChange} {...rest} />}
            label={label}
          />
        )}
      />
    );
  },
);
