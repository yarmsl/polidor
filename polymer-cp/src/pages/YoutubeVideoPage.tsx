import { FC } from 'react';

import YoutubeVideo from '~/modules/YoutubeVideo';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const YoutubeVideoPage: FC = () => {
  return (
    <ControlPanelPage title='Youtube'>
      <YoutubeVideo />
    </ControlPanelPage>
  );
};

export default YoutubeVideoPage;
