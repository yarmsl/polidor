import { FC, memo } from 'react';

import Box from '@mui/material/Box';

import { useGetMainVideoQuery } from '~/store/Data';
import VideoBox from '~/UI/atoms/VideoBox';

const MainVideo: FC = () => {
  const { data } = useGetMainVideoQuery();
  if (!data || !data?.embedId) return null;
  return (
    <Box sx={styles.root}>
      <VideoBox
        autoplay={data?.autoplay}
        embedId={data.embedId}
        mute={data?.mute}
        title={data?.title}
      />
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
