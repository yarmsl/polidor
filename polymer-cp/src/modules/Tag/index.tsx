import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import CrudModule from '~/UI/organisms/CrudModule';

import {
  useAddTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
  useGetAllTagsQuery,
} from './service';
import { useYoutubeVideoTableConf } from './useConfig';

const Tag: FC = () => {
  const dispatch = useAppDispatch();
  const { tableConfig, formConfig, defaultValues } = useYoutubeVideoTableConf();
  const { data, isFetching, refetch } = useGetAllTagsQuery();
  const [onCreate, { isLoading: isCreating }] = useAddTagMutation();
  const [onEdit, { isLoading: isEditing }] = useEditTagMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteTagMutation();

  const handleData2Dto = useCallback(
    (rowData: ITag): ITagDto => ({
      name: rowData.name,
      slug: rowData.slug,
      order: rowData.order,
      projects: rowData.projects?.map((project) => project._id),
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: ITagDto) => {
      try {
        const res = await onCreate(data).unwrap();
        dispatch(showSuccessSnackbar(`Тег ${res.name} успешно добавлен`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при добавлении тега'));
      }
    },
    [onCreate, dispatch],
  );

  const handleEdit = useCallback(
    async (editData: ITagDto & { _id: string }) => {
      try {
        const { _id, ...dto } = editData;
        const res = await onEdit({ id: _id, dto }).unwrap();
        dispatch(showSuccessSnackbar(`Тег ${res.name} успешно изменен`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при изменении тега'));
      }
    },
    [dispatch, onEdit],
  );

  const handleDelete = useCallback(
    async (data: ITag) => {
      try {
        await onDelete(data._id).unwrap();
        dispatch(showSuccessSnackbar(`Тег ${data.name} успешно удален`));
      } catch {
        dispatch(showErrorSnackbar('Ошибка при удалении тега'));
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

export default memo(Tag);
