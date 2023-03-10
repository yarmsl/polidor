import React from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Typography } from '@mui/material';

import { ReactComponent as Logotype } from '~/assets/Logo.svg';

interface ILogoProps {
  closeBurger?: () => void;
}

const Logo: React.FC<ILogoProps> = ({ closeBurger }) => {
  const router = useHistory();
  return (
    <Button
      color='inherit'
      sx={styles.root}
      onClick={() => {
        router.push('/');
        if (closeBurger) closeBurger();
      }}
    >
      <Logotype />
      <Box sx={styles.title}>
        <Typography color='MenuText'>УРАЛ-ПОЛИМЕР</Typography>
        <Typography color='MenuText'>POLIDOR GROUP</Typography>
      </Box>
    </Button>
  );
};

const styles: TStyles = {
  root: {
    minWidth: '160px',
    height: '100%',
    p: '16px 4px',
    display: 'flex',
    borderRadius: 0,
    userSelect: 'none',
  },
  title: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    ml: '8px',
    '& p': {
      fontSize: '14px',
      lineHeight: '14px',
    },
    '& p:first-of-type': {
      fontWeight: 700,
    },
  },
};

export default React.memo(Logo);
