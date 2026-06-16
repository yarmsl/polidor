import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import { CrudModule } from '~/UI/organisms/CrudModule';

import {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useEditVideoMutation,
  useGetAllVideosQuery,
} from './service';
import { useVideoTableConf } from './useConfig';

const Video: FC = () => {
  const dispatch = useAppDispatch();
  const { tableConfig, formConfig, defaultValues } = useVideoTableConf();
  const { data, isFetching, refetch } = useGetAllVideosQuery();
  const [onCreate, { isLoading: isCreating }] = useAddVideoMutation();
  const [onEdit, { isLoading: isEditing }] = useEditVideoMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteVideoMutation();

  const handleData2Dto = useCallback(
    (rowData: IVideoFull): IVideoDto => ({
      ...rowData,
      projects: rowData.projects?.map((project) => project._id),
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: IVideoDto) => {
      try {
        const res = await onCreate(data).unwrap();
        dispatch(showSuccessSnackbar(`Видео ${res.title} успешно добавлено`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при добавлении видео'));
      }
    },
    [onCreate, dispatch],
  );

  const handleEdit = useCallback(
    async (editData: IVideoDto & { _id: string }) => {
      try {
        const { _id, ...dto } = editData;
        const res = await onEdit({ id: _id, dto }).unwrap();
        dispatch(showSuccessSnackbar(`Видео ${res.title} успешно изменено`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при изменении видео'));
      }
    },
    [dispatch, onEdit],
  );

  const handleDelete = useCallback(
    async (data: IVideoFull) => {
      try {
        await onDelete(data._id).unwrap();
        dispatch(showSuccessSnackbar(`Видео ${data.title} успешно удалено`));
      } catch {
        dispatch(showErrorSnackbar('Ошибка при удалении видео'));
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

export default memo(Video);
