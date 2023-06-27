import { FC, memo, useCallback } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';

interface IListModalProps {
  listData: { src?: string; title: string; onClick?: () => void }[];
  title: string;
}

const ListModal: FC<IListModalProps> = ({ listData, title }) => {
  const dispatch = useAppDispatch();
  const onClose = useCallback(() => dispatch(closeModalAction()), [dispatch]);
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <List>
        {listData.map(({ src, title, onClick }) => (
          <ListItemButton key={title} onClick={onClick ? onClick : undefined}>
            {src ? (
              <ListItemIcon sx={styles.listItemIcon}>
                <img alt={title} src={src} />
              </ListItemIcon>
            ) : null}
            <ListItemText>{title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <DialogActions>
        <Button color='success' onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

const styles: TStyles = {
  listItemIcon: {
    width: '56px',
    height: '56px',
    borderRadius: 10,
    overflow: 'hidden',
    mr: 2,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
};

export default memo(ListModal);
