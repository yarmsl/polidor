import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { genericMemo, SERVER_URL } from '~/lib/constants';

import { styles } from './styles';

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
            SelectProps={{ multiple: type === 'multiselect' }}
            error={!!error}
            helperText={error ? error.message : null}
            maxRows={type === 'multiline' ? 8 : undefined}
            minRows={type === 'multiline' ? 3 : undefined}
            multiline={type === 'multiline'}
            select={type && ['select', 'multiselect'].includes(type)}
            value={value}
            onChange={onChange}
            {...rest}
          >
            {type && ['select', 'multiselect'].includes(type) && selectItems
              ? selectItems.map(({ src, label, value }) => (
                  <MenuItem key={value} value={value}>
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
