import { FC, memo } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface ISuperMenuProps {
  onRefresh?: () => void;
  onCreate?: () => void;
}

const SuperMenu: FC<ISuperMenuProps> = ({ onRefresh, onCreate }) => {
  return (
    <Box component='menu' sx={styles.root}>
      {onRefresh ? (
        <IconButton onClick={onRefresh}>
          <RefreshRoundedIcon />
        </IconButton>
      ) : null}
      {onCreate ? (
        <Button
          color='success'
          startIcon={<AddCircleOutlineRoundedIcon />}
          variant='outlined'
          onClick={onCreate}
        >
          Создать
        </Button>
      ) : null}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    py: 2,
    justifyContent: 'flex-end',
    my: 0,
    '&>*:not(:last-child)': {
      mr: 2,
    },
  },
};

export default memo(SuperMenu);
