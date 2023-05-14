import React from 'react';

import { Box } from '@mui/material';

import MainAboutMobileCard from './MainAboutMobileCard';
import MainPictures from './MainPictures';
import { abouts } from '../../../lib/about';

const MainAboutMobile = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      {abouts.map((about, i) => (
        <React.Fragment key={i}>
          <MainAboutMobileCard about={about} />
          <MainPictures swiperIndex={i} />
        </React.Fragment>
      ))}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    display: 'flex',
    flexDirection: 'column',
    p: '35px 30px',
    '&>*:not(:last-of-type)': {
      mb: '16px',
    },
  },
};

export default MainAboutMobile;
