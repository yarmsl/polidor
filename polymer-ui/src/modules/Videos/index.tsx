import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import { useGetVideosQuery } from '~/store/Data';
import VideoBox from '~/UI/atoms/VideoBox';
import ProjectsDrawer from '~/UI/molecules/ProjectsDrawer';

const Videos: React.FC = () => {
  const { data } = useGetVideosQuery();

  return (
    <Container maxWidth='md' sx={styles.root}>
      {data?.map(({ autoplay, embedId, title, mute, projects }) => (
        <Box key={embedId} sx={styles.main}>
          <Typography variant='h5' gutterBottom>
            {title}
          </Typography>
          <VideoBox autoplay={autoplay} embedId={embedId} mute={mute} title={title} />
          <Box sx={styles.projects}>
            <ProjectsDrawer projects={projects} />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '80px',
    pb: '50px',
    gap: '30px',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
};

export default React.memo(Videos);
