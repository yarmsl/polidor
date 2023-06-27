import { memo, useCallback } from 'react';
import { DeepPartial, FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import SuperMenu from '~/UI/atoms/SuperMenu';
import SuperForm from '~/UI/molecules/SuperForm';
import SuperTable from '~/UI/molecules/SuperTable';

interface ICrudModuleProps<T, K> {
  data: T[];
  isLoading: boolean;
  tableConfig: ISuperTableConfig<T>[];
  formConfig: ISuperFormConfig<K>[];
  defaultValues: import('react-hook-form').DeepPartial<K>;
  handleData2Dto: (rowData: T) => DeepPartial<K>;
  onCreate?: (data: K) => Promise<void>;
  onEdit?: (data: K & { _id: string }) => Promise<void>;
  onDelete?: (data: T) => Promise<void>;
  onRefresh?: () => void;
}

function CrudModule<T extends IBase, K extends FieldValues>({
  data,
  isLoading,
  tableConfig,
  formConfig,
  defaultValues,
  handleData2Dto,
  onRefresh,
  onCreate,
  onDelete,
  onEdit,
}: ICrudModuleProps<T, K>) {
  const dispatch = useAppDispatch();

  const openFormModal = useCallback(
    (
      formConfig: ISuperFormConfig<K>[],
      defaultValues: DeepPartial<K>,
      onSave?: (data: K) => Promise<void>,
    ) =>
      dispatch(
        openModal(
          <Box sx={styles.formModal}>
            <SuperForm config={formConfig} defaultValues={defaultValues} onSave={onSave} />
          </Box>,
        ),
      ),
    [dispatch],
  );

  const handleCreate = useCallback(
    () => openFormModal(formConfig, defaultValues, onCreate),
    [defaultValues, formConfig, onCreate, openFormModal],
  );

  const handleEdit = useCallback(
    (rowData: T) => {
      openFormModal(
        formConfig,
        handleData2Dto(rowData),
        onEdit ? (data: K) => onEdit({ _id: rowData._id, ...data }) : undefined,
      );
    },
    [formConfig, onEdit, handleData2Dto, openFormModal],
  );

  return (
    <Container maxWidth='lg' sx={styles.root} disableGutters>
      <SuperMenu onCreate={handleCreate} onRefresh={onRefresh} />
      <SuperTable
        config={tableConfig}
        data={data || []}
        isLoading={isLoading}
        onDelete={onDelete}
        onEdit={onEdit && handleEdit}
      />
    </Container>
  );
}

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    my: 0,
  },
  formModal: {
    width: '500px',
    p: 4,
  },
};

export default memo(CrudModule) as typeof CrudModule;
