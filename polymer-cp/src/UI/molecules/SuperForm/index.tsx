import { memo, Fragment, useCallback } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SuperFormField from '~/UI/atoms/SuperFormField';
import SwitchFormField from '~/UI/atoms/SwitchFormField';

const SuperForm = <T, Dto extends FieldValues>({
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
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&>*:not(:last-child)': {
      mb: 2,
    },
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
    '&>*:not(:last-of-type)': {
      mr: 2,
    },
  },
};

export default memo(SuperForm) as typeof SuperForm;
