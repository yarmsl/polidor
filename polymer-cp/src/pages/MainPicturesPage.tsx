import { FC } from 'react';

import MainPictures from '~/modules/MainPictures';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const MainPicturesPage: FC = () => {
  return (
    <ControlPanelPage title='Картинки на главной'>
      <MainPictures />
    </ControlPanelPage>
  );
};

export default MainPicturesPage;
