import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import { CrudModule } from '~/UI/organisms/CrudModule';

import {
  useAddYouTubeVideoMutation,
  useDeleteYouTubeVideoMutation,
  useEditYouTubeVideoMutation,
  useGetAllYouTubeVideosQuery,
} from './service';
import { useYoutubeVideoTableConf } from './useConfig';

const YoutubeVideo: FC = () => {
  const dispatch = useAppDispatch();
  const { tableConfig, formConfig, defaultValues } = useYoutubeVideoTableConf();
  const { data, isFetching, refetch } = useGetAllYouTubeVideosQuery();
  const [onCreate, { isLoading: isCreating }] = useAddYouTubeVideoMutation();
  const [onEdit, { isLoading: isEditing }] = useEditYouTubeVideoMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteYouTubeVideoMutation();

  const handleData2Dto = useCallback(
    (rowData: IYoutubeVideoFull): IYoutubeVideoDto => ({
      ...rowData,
      projects: rowData.projects?.map((project) => project._id),
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: IYoutubeVideoDto) => {
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
    async (editData: IYoutubeVideoDto & { _id: string }) => {
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
    async (data: IYoutubeVideoFull) => {
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

export default memo(YoutubeVideo);
