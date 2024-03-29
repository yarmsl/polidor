import React from 'react';

import { useMedia } from '~/lib/useMedia';

import MainAbout from './components/MainAbout';
import MainAboutMobile from './components/MainAboutMobile';
import MainVideo from './components/MainVideo';
import TrustUs from './components/TrustUs';

const Home: React.FC = () => {
  const { matchesMobile } = useMedia();
  return (
    <>
      {matchesMobile ? <MainAboutMobile /> : <MainAbout />}
      <TrustUs />
      <MainVideo />
    </>
  );
};

export default Home;
