import { FC } from 'react';

import Video from '~/modules/Video';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const VideoPage: FC = () => {
  return (
    <ControlPanelPage title='Videos'>
      <Video />
    </ControlPanelPage>
  );
};

export default VideoPage;
