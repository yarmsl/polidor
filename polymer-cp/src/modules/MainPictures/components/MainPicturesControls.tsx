import { FC, memo, useCallback, useState } from 'react';

import { Box, LinearProgress, Tab, Tabs } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import MainPicture from './MainPicture';
import {
  useAddMainPictureMutation,
  useDeleteMainPictureMutation,
  useGetMainPicturesQuery,
} from '../store/mainPictures.service';

const orders = [1, 2, 3];
const tabs: { tab: TMainPicturesTabs; label: string }[] = [
  { tab: 'design', label: 'Дизайн' },
  { tab: 'model', label: 'От эскиза до 3D модели' },
  { tab: 'engineering', label: 'Инжиниринг' },
  { tab: 'production', label: 'Производство' },
  { tab: 'perfect', label: 'Совершенствование конструкции' },
];

const MainPicturesControls: FC = () => {
  const [tab, setTab] = useState<TMainPicturesTabs>('design');
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetMainPicturesQuery();
  const [deleteMainPicture, { isLoading: isDeleting }] = useDeleteMainPictureMutation();
  const [saveMainPicture, { isLoading: isAdding }] = useAddMainPictureMutation();

  const handleChangeTab = useCallback(
    (e: React.SyntheticEvent<Element, Event>, tab: TMainPicturesTabs) => setTab(tab),
    [],
  );

  const handleDeleteMainPicture = useCallback(
    async (pictureId: string) => {
      try {
        await deleteMainPicture(pictureId).unwrap();
        dispatch(showSuccessSnackbar('Изображение удалено'));
      } catch {
        dispatch(showErrorSnackbar('Ошибка удаления'));
      }
    },
    [deleteMainPicture, dispatch],
  );

  const handleSaveMainPicture = useCallback(
    async (image: File, order: number) => {
      try {
        const sendData = new FormData();
        sendData.append('order', `${order}`);
        sendData.append('tab', `${tab}`);
        sendData.append('src', image as Blob);
        await saveMainPicture(sendData).unwrap();
        dispatch(showSuccessSnackbar(`Изображение создано`));
      } catch {
        dispatch(showErrorSnackbar('Ошибка загрузки файла'));
      }
    },
    [dispatch, saveMainPicture, tab],
  );

  const getData = useCallback(
    (order: number) => data?.find((pic) => pic.order === order && pic.tab === tab),
    [data, tab],
  );

  return (
    <Box sx={styles.root}>
      <Tabs value={tab} onChange={handleChangeTab}>
        {tabs.map(({ tab, label }) => (
          <Tab key={tab} label={label} value={tab} />
        ))}
      </Tabs>
      <Box sx={styles.loader}>{isFetching && <LinearProgress color='primary' />}</Box>

      {orders.map((order) => (
        <MainPicture
          key={`${tab}-${order}`}
          {...getData(order)}
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
