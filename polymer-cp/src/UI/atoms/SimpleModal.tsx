import { FC, memo, useCallback } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';

interface ISimpleModalProps {
  title: string;
  text: string;
}

const SimpleModal: FC<ISimpleModalProps> = ({ title, text }) => {
  const dispatch = useAppDispatch();
  const onClose = useCallback(() => dispatch(closeModalAction()), [dispatch]);
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ wordBreak: 'break-all' }}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='success' onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default memo(SimpleModal);
