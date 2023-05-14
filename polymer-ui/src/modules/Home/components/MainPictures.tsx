import { FC, memo } from 'react';

import { Box, Skeleton } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { useGetMainPicturesQuery } from '~/store/Data';
interface IMainPicturesProps {
  swiperIndex: number;
}

const tabs = ['design', 'model', 'engineering', 'production', 'perfect'];

const MainPictures: FC<IMainPicturesProps> = ({ swiperIndex }) => {
  const { data, isFetching } = useGetMainPicturesQuery(void 1, {
    selectFromResult: (query) => ({
      ...query,
      data: query.data?.filter((pic) => pic.tab === tabs[swiperIndex]) || [],
    }),
  });

  return (
    <Box sx={styles.root}>
      {data?.map((pic) => (
        <Box key={pic.order}>
          {isFetching ? (
            <Skeleton sx={{ height: '100%' }} variant='rectangular' />
          ) : (
            <img alt={`${pic.order}`} src={`${SERVER_URL}/${pic.src}`} />
          )}
        </Box>
      ))}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    height: { xs: 'unset', md: '180px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
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
