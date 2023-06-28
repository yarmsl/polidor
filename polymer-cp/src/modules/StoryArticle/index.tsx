import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import CrudModule from '~/UI/organisms/CrudModule';

import { defaultValues, formConfig, tableConfig } from './config';
import {
  useAddStoryArticleMutation,
  useDeleteStoryArticleMutation,
  useEditStoryArticleMutation,
  useGetAllStoryArticlesQuery,
} from './service';

const StoryArticle: FC = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching, refetch } = useGetAllStoryArticlesQuery();
  const [onCreate, { isLoading: isCreating }] = useAddStoryArticleMutation();
  const [onEdit, { isLoading: isEditing }] = useEditStoryArticleMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteStoryArticleMutation();

  const handleData2Dto = useCallback(
    (rowData: IStoryArticle): IStoryArticleDto => ({
      content: rowData.content,
      title: rowData.title,
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: IStoryArticleDto) => {
      try {
        await onCreate(data).unwrap();
        dispatch(showSuccessSnackbar('Статья успешно добавлена'));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при добавлении статьи'));
      }
    },
    [onCreate, dispatch],
  );

  const handleEdit = useCallback(
    async (editData: IStoryArticleDto & { _id: string }) => {
      try {
        const { _id, ...dto } = editData;
        await onEdit({ id: _id, dto }).unwrap();
        dispatch(showSuccessSnackbar('Статья успешно изменена'));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при изменении статьи'));
      }
    },
    [dispatch, onEdit],
  );

  const handleDelete = useCallback(
    async (data: IStoryArticle) => {
      try {
        await onDelete(data._id).unwrap();
        dispatch(showSuccessSnackbar('Статья успешно удалена'));
      } catch {
        dispatch(showErrorSnackbar('Ошибка при удалении статьи'));
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

export default memo(StoryArticle);
