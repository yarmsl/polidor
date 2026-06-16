import { FC, memo } from 'react';

import Box from '@mui/material/Box';

import { useGetMainVideoQuery } from '~/store/Data';
import VideoCarousel from '~/UI/molecules/VideoCarousel';

const MainVideo: FC = () => {
  const { data } = useGetMainVideoQuery();

  return (
    <Box sx={styles.root}>
      <VideoCarousel videos={data} />
    </Box>
  );
};

const styles: TStyles = {
  root: {
    maxWidth: '900px',
    width: '100%',
    p: { xs: '0px 10px 50px', md: '0 0 50px' },
  },
};

export default memo(MainVideo);
