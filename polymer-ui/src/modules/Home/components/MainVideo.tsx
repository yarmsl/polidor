import { FC, memo } from 'react';

import Box from '@mui/material/Box';

import { useGetMainYoutubeVideoQuery } from '~/store/Data';
import YouTubeBox from '~/UI/atoms/YouTubeBox';

const MainVideo: FC = () => {
  const { data } = useGetMainYoutubeVideoQuery();
  if (!data || !data?.embedId) return null;
  return (
    <Box sx={styles.root}>
      <YouTubeBox
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
