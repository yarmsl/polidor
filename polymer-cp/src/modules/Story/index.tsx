import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import { CrudModule } from '~/UI/organisms/CrudModule';

import { defaultValues, formConfig, tableConfig } from './config';
import {
  useAddStoryMutation,
  useDeleteStoryMutation,
  useEditStoryMutation,
  useGetAllStoriesQuery,
} from './service';

const Story: FC = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching, refetch } = useGetAllStoriesQuery();
  const [onCreate, { isLoading: isCreating }] = useAddStoryMutation();
  const [onEdit, { isLoading: isEditing }] = useEditStoryMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteStoryMutation();

  const handleData2Dto = useCallback(
    (rowData: IStory): IStoryDto => ({
      content: rowData.content,
      from: rowData.from,
      to: rowData.to,
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: IStoryDto) => {
      try {
        await onCreate(data).unwrap();
        dispatch(showSuccessSnackbar('История успешно добавлена'));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при добавлении истории'));
      }
    },
    [onCreate, dispatch],
  );

  const handleEdit = useCallback(
    async (editData: IStoryDto & { _id: string }) => {
      try {
        const { _id, ...dto } = editData;
        await onEdit({ id: _id, dto }).unwrap();
        dispatch(showSuccessSnackbar('История успешно изменена'));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при изменении истории'));
      }
    },
    [dispatch, onEdit],
  );

  const handleDelete = useCallback(
    async (data: IStory) => {
      try {
        await onDelete(data._id).unwrap();
        dispatch(showSuccessSnackbar('История успешно удалена'));
      } catch {
        dispatch(showErrorSnackbar('Ошибка при удалении истории'));
      }
    },
    [onDelete, dispatch],
  );

  const isLoading = useMemo(
    () => isFetching || isCreating || isEditing || isDeleting,
    [isCreating, isDeleting, isEditing, isFetching],
  );

  return (
    <CrudModule
      data={data || []}
      defaultValues={defaultValues}
      formConfig={formConfig}
      handleData2Dto={handleData2Dto}
      isLoading={isLoading}
      tableConfig={tableConfig}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onRefresh={refetch}
    />
  );
};

export default memo(Story);
