import { Fragment, useCallback } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { genericMemo } from '~/lib/constants';
import { SuperFormField } from '~/UI/atoms/SuperFormField';
import { SwitchFormField } from '~/UI/atoms/SwitchFormField';

import { styles } from './styles';

export const SuperForm = genericMemo(
  <T, Dto extends FieldValues>({
    defaultValues,
    config,
    size = 'medium',
    onSave,
  }: ISuperFormProps<T, Dto>) => {
    const methods = useForm<Dto>({ defaultValues });
    const { reset, handleSubmit } = methods;

    const handleReset = useCallback(() => reset(defaultValues), [defaultValues, reset]);
    const handleSave = handleSubmit(async (data) => {
      if (onSave) await onSave(data);
    });

    return (
      <FormProvider {...methods}>
        <Box component='form' sx={styles.root}>
          {config.map((conf) => (
            <Fragment key={conf.name as string}>
              {conf.type === 'boolean' ? (
                <SwitchFormField size={size} {...conf} />
              ) : (
                <SuperFormField size={size} {...conf} />
              )}
            </Fragment>
          ))}
        </Box>
        <Box sx={styles.actions}>
          <Button color='error' variant='contained' onClick={handleReset}>
            Очистить
          </Button>
          <Button color='info' variant='contained' onClick={handleSave}>
            Сохранить
          </Button>
        </Box>
      </FormProvider>
    );
  },
);
