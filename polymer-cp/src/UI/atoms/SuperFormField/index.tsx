import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { genericMemo, SERVER_URL } from '~/lib/constants';

import { styles } from './styles';
import { SuperFormMenuItem } from './SuperFormMenuItem';

export const SuperFormField = genericMemo(
  <T,>({ name, defaultValue, type, rules, selectItems, ...rest }: ISuperFormFieldProps<T>) => {
    const { control } = useFormContext();
    return (
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name as string}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            helperText={error ? error.message : null}
            maxRows={type === 'multiline' ? 8 : undefined}
            minRows={type === 'multiline' ? 3 : undefined}
            multiline={type === 'multiline'}
            select={['select', 'multiselect'].includes(type!)}
            value={value}
            SelectProps={{
              multiple: type === 'multiselect',
              renderValue: (selected) => {
                if (['select', 'multiselect'].includes(type!)) {
                  const itemsMap: Record<string, { label: string; src?: string }> = {};
                  selectItems?.forEach(({ src, label, value }) => {
                    itemsMap[value] = { label, src };
                  });

                  if (type === 'multiselect') {
                    return (
                      <>
                        {(selected as string[])?.map((id) => {
                          const { src, label } = itemsMap[id] || {};

                          return <SuperFormMenuItem key={id} label={label} src={src} value={id} />;
                        })}
                      </>
                    );
                  } else if (type === 'select') {
                    const { src, label } = itemsMap[selected as string] || {};

                    return <SuperFormMenuItem label={label} src={src} value={selected as string} />;
                  }
                }
              },
              MenuProps: {
                PaperProps: { style: { maxHeight: 380, marginTop: 5 } },
              },
            }}
            onChange={onChange}
            {...rest}
          >
            {['select', 'multiselect'].includes(type!) && selectItems
              ? selectItems.map(({ src, value, label }) => (
                  <MenuItem value={value}>
                    <Box sx={styles.listItem}>
                      {src ? (
                        <ListItemIcon sx={styles.listItemIcon}>
                          <img alt={label} src={`${SERVER_URL}/${src}`} />
                        </ListItemIcon>
                      ) : null}
                      <ListItemText>{label}</ListItemText>
                    </Box>
                  </MenuItem>
                ))
              : null}
          </TextField>
        )}
        rules={{
          required: rest.required ? 'Обязательное поле' : false,
          ...rules,
        }}
        {...rest}
      />
    );
  },
);
