import { FC, memo } from 'react';

import { Box, Skeleton } from '@mui/material';

import { styles } from './styles';

export const SkeletonProjectCard: FC = memo(() => {
  return (
    <Box sx={styles.root}>
      <Skeleton sx={styles.imgWrapper} variant='rectangular' />
      <Skeleton variant='text' />
      <Skeleton variant='text' />
    </Box>
  );
});
