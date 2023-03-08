import { FC, memo, useCallback } from 'react';

import { Box, LinearProgress } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import MainPicture from './MainPicture';
import {
  useAddMainPictureMutation,
  useDeleteMainPictureMutation,
  useGetMainPicturesQuery,
} from '../store/mainPictures.service';

const orders = [1, 2, 3];

const MainPicturesControls: FC = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetMainPicturesQuery();
  const [deleteMainPicture, { isLoading: isDeleting }] = useDeleteMainPictureMutation();
  const [saveMainPicture, { isLoading: isAdding }] = useAddMainPictureMutation();

  const handleDeleteMainPicture = useCallback(
    async (pictureId: string) => {
      await deleteMainPicture(pictureId);
      dispatch(showSuccessSnackbar('Изображение удалено'));
    },
    [deleteMainPicture, dispatch],
  );

  const handleSaveMainPicture = useCallback(
    async (image: File, order: number) => {
      try {
        const sendData = new FormData();
        sendData.append('order', `${order}`);
        sendData.append('src', image as Blob);
        await saveMainPicture(sendData);
        dispatch(showSuccessSnackbar(`Изображение создано`));
      } catch {
        dispatch(showErrorSnackbar('Ошибка загрузки файла'));
      }
    },
    [dispatch, saveMainPicture],
  );

  const getDataByOrder = useCallback(
    (order: number) => data?.find((pic) => pic.order === order),
    [data],
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.loader}>{isFetching && <LinearProgress color='primary' />}</Box>

      {orders.map((order) => (
        <MainPicture
          key={order}
          {...getDataByOrder(order)}
          isAdding={isAdding}
          isDeleting={isDeleting}
          safeOrder={order}
          onDelete={handleDeleteMainPicture}
          onSave={handleSaveMainPicture}
        />
      ))}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*:not(:last-of-type)': {
      mb: '30px',
    },
  },
  loader: {
    width: '100%',
    height: '4px',
    overflow: 'hidden',
  },
};

export default memo(MainPicturesControls);
