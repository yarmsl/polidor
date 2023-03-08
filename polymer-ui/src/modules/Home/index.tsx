import React from 'react';

import { useMedia } from '~/lib/useMedia';

import MainAbout from './components/MainAbout';
import MainAboutMobile from './components/MainAboutMobile';
import MainPictures from './components/MainPictures';
import TrustUs from './components/TrustUs';

const Home: React.FC = () => {
  const { matchesMobile } = useMedia();
  return (
    <>
      {matchesMobile ? <MainAboutMobile /> : <MainAbout />}
      <MainPictures />
      <TrustUs />
    </>
  );
};

export default Home;
