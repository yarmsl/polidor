import { ChangeEvent, useCallback, useRef, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddFileMutation, useDeleteFileMutation, useGetFileInfoQuery } from '../store';

const AddPresFile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [uploadFile, { isLoading }] = useAddFileMutation();
  const { data: uploadedFile } = useGetFileInfoQuery('');
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          setFile(inputRef.current.files[0]);
          e.target.value = '';
        }
        setUpLoading(false);
      } catch {
        setUpLoading(false);
        dispatch(showErrorSnackbar('ошибка загрузки файла'));
      }
    },
    [dispatch],
  );

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('file', file as Blob);
      const res = await uploadFile(data).unwrap();
      dispatch(showSuccessSnackbar(res?.message || 'Файл успешно сохранен'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add file'));
    }
  }, [dispatch, file, uploadFile]);

  const removeFile = useCallback(async () => {
    try {
      const res = await deleteFile('').unwrap();
      dispatch(showSuccessSnackbar(res?.message || 'Файл успешно удалён'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to delete file'));
    }
  }, [deleteFile, dispatch]);

  return (
    <Container maxWidth={'xs'} sx={styles.wrapper}>
      <Typography align='center' variant='h6' gutterBottom>
        Добавление нового файла
      </Typography>
      <Box sx={styles.root}>
        <Paper sx={styles.preview}>
          <Typography variant='h6'>Имя: {file?.name || ''}</Typography>
          <Typography variant='h6'>
            Размер: {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} Mb` : ''}
          </Typography>
          <Typography variant='h6'>Тип: {file?.type || ''}</Typography>
        </Paper>
        <input ref={inputRef} style={{ display: 'none' }} type='file' onChange={fileUpload} />
        <Box sx={styles.actions}>
          <Button
            color='info'
            variant='outlined'
            startIcon={
              upLoading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                <CloudUploadIcon color='info' />
              )
            }
            onClick={() => inputRef.current?.click()}
          >
            {file ? 'Загрузить другой файл' : 'Загрузить файл'}
          </Button>
          {file && (
            <Button
              color='success'
              startIcon={isLoading && <CircularProgress color='inherit' size={20} />}
              variant='contained'
              onClick={sendFile}
            >
              Сохранить
            </Button>
          )}
        </Box>
      </Box>
      {uploadedFile != null && uploadedFile?.file != null && (
        <Button
          startIcon={isDeleting && <CircularProgress color='inherit' size={20} />}
          sx={{ m: '20px 0' }}
          variant='contained'
          onClick={removeFile}
        >
          Удалить файл с сервера
        </Button>
      )}
    </Container>
  );
};

const styles: TStyles = {
  wrapper: {
    flexDirection: 'column',
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    p: '8px',
    mb: '16px',
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
};

export default AddPresFile;
