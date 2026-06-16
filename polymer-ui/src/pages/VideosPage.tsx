import React from 'react';

import Videos from '~/modules/Videos';

import HelmetTitle from '../UI/atoms/Helmet';

const VideosPage: React.FC = () => (
  <>
    <HelmetTitle title='Видео' />
    <Videos />
  </>
);
export default VideosPage;
