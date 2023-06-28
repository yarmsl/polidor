import { memo, FC, useCallback, useMemo } from 'react';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import CrudModule from '~/UI/organisms/CrudModule';

import { defaultValues, formConfig, tableConfig } from './config';
import {
  useAddVacancyMutation,
  useDeleteVacancyMutation,
  useEditVacancyMutation,
  useGetAllVacanciesQuery,
} from './service';

const Vacancies: FC = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching, refetch } = useGetAllVacanciesQuery();
  const [onCreate, { isLoading: isCreating }] = useAddVacancyMutation();
  const [onEdit, { isLoading: isEditing }] = useEditVacancyMutation();
  const [onDelete, { isLoading: isDeleting }] = useDeleteVacancyMutation();

  const handleData2Dto = useCallback(
    (rowData: IVacancy): IVacancyDto => ({
      title: rowData.title,
      requirements: rowData.requirements,
      wage: rowData.wage,
    }),
    [],
  );

  const handleCreate = useCallback(
    async (data: IVacancyDto) => {
      try {
        const res = await onCreate(data).unwrap();
        dispatch(showSuccessSnackbar(`Вакансия ${res.title} успешно добавлена`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при добавлении вакансии'));
      }
    },
    [onCreate, dispatch],
  );

  const handleEdit = useCallback(
    async (editData: IVacancyDto & { _id: string }) => {
      try {
        const { _id, ...dto } = editData;
        const res = await onEdit({ id: _id, dto }).unwrap();
        dispatch(showSuccessSnackbar(`Вакансия ${res.title} успешно изменена`));
        dispatch(closeModalAction());
      } catch {
        dispatch(showErrorSnackbar('Ошибка при изменении вакансии'));
      }
    },
    [dispatch, onEdit],
  );

  const handleDelete = useCallback(
    async (data: IVacancy) => {
      try {
        await onDelete(data._id).unwrap();
        dispatch(showSuccessSnackbar(`Вакансия ${data.title} успешно удалена`));
      } catch {
        dispatch(showErrorSnackbar('Ошибка при удалении вакансии'));
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

export default memo(Vacancies);
