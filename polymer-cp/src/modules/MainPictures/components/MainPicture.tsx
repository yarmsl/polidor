import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';

import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { str2rusDate } from '~/lib/Dates';
import { file2optiDataurl, file2optiFile } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar } from '~/store/Notifications';

interface IMainPictureProps extends Partial<IMainPicture> {
  onSave: (image: File, order: number) => Promise<void>;
  onDelete: (pictureId: string) => Promise<void>;
  isAdding: boolean;
  isDeleting: boolean;
  safeOrder: number;
}

const MainPicture: FC<IMainPictureProps> = ({
  src,
  author,
  updatedAt,
  _id,
  onDelete,
  onSave,
  safeOrder,
  isAdding,
  isDeleting,
}) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isUpLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const fileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (inputRef?.current?.files?.length) {
          const res = await file2optiFile(inputRef.current.files[0], 1024, 0.85, 'webp');
          setFile(res);
          const prRes = await file2optiDataurl(inputRef.current.files[0], 1024, 0.75, 'webp');
          setPreview(prRes);
          e.target.value = '';
        }
      } catch (e) {
        dispatch(showErrorSnackbar('ошибка загрузки файла'));
      } finally {
        setUpLoading(false);
      }
    },
    [dispatch],
  );

  const handleUploadClick = useCallback(() => inputRef.current?.click(), []);

  const imageSource = useMemo(() => {
    if (preview) return preview;
    if (src) return `${SERVER_URL}/${src}`;
    return undefined;
  }, [preview, src]);

  const handleSave = useCallback(async () => {
    await onSave(file!, safeOrder);
    setFile(null);
    setPreview('');
  }, [file, onSave, safeOrder]);

  const handleDelete = useCallback(async () => {
    if (_id) {
      onDelete(_id);
    }
  }, [_id, onDelete]);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreview('');
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.img}>
        {imageSource ? (
          <img alt={`${safeOrder}`} src={imageSource} />
        ) : (
          <Box sx={styles.placeholder}>
            <ImageNotSupportedIcon />
            <Typography>Нет изображения</Typography>
          </Box>
        )}
      </Box>

      <Box sx={styles.about}>
        <input
          ref={inputRef}
          accept='image/*'
          style={{ display: 'none' }}
          type='file'
          onChange={fileUpload}
        />
        {author && !preview ? <Typography>Автор: {author.name}</Typography> : null}
        {updatedAt && !preview ? (
          <Typography>Дата изменения: {str2rusDate(updatedAt)}</Typography>
        ) : null}
      </Box>
      <Box sx={styles.controls}>
        {file ? (
          <Button
            color='info'
            startIcon={isAdding && <CircularProgress color='inherit' size={20} />}
            variant='contained'
            onClick={handleSave}
          >
            Сохранить
          </Button>
        ) : (
          <Button
            color='success'
            startIcon={isUpLoading && <CircularProgress color='inherit' size={20} />}
            variant='outlined'
            onClick={handleUploadClick}
          >
            Загрузить изображение
          </Button>
        )}
        {file && (
          <Button color='warning' variant='contained' onClick={handleClear}>
            Очистить
          </Button>
        )}
        {!file && _id ? (
          <Button
            color='error'
            startIcon={isDeleting && <CircularProgress color='inherit' size={20} />}
            variant='contained'
            onClick={handleDelete}
          >
            Удалить
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '640px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*:not(:last-of-type)': {
      mb: '5px',
    },
  },
  img: {
    width: '100%',
    height: '480px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'grey.100',
    borderRadius: 4,
  },
  about: {
    width: '100%',
    height: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    '&>*:not(:last-of-type)': {
      mr: '10px',
    },
  },
  controls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '&>*:not(:last-of-type)': {
      mr: '10px',
    },
  },
};

export default memo(MainPicture);
