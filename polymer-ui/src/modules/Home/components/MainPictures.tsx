import { FC, memo } from 'react';

import { Box, Container, Skeleton } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { useGetMainPicturesQuery } from '~/store/Data';

const MainPictures: FC = () => {
  const { data, isFetching } = useGetMainPicturesQuery();
  return (
    <Container maxWidth='md' sx={styles.root}>
      {data?.map((pic) => (
        <Box key={pic.order}>
          {isFetching ? (
            <Skeleton sx={{ height: '100%' }} variant='rectangular' />
          ) : (
            <img alt={`${pic.order}`} src={`${SERVER_URL}/${pic.src}`} />
          )}
        </Box>
      ))}
    </Container>
  );
};

const styles: TStyles = {
  root: {
    height: { xs: 'unset', md: '180px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    p: '12px 0',
    boxSizing: 'border-box',
    '&>*:not(:last-of-type)': {
      mr: { xs: 'unset', md: '20px' },
      mb: { xs: '10px', md: 'unset' },
    },
    '&>div': {
      width: { xs: '100%', md: '33.33%' },
      height: '100%',
      boxSizing: 'border-box',

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      },
    },
  },
};

export default memo(MainPictures);
