import { FC } from 'react';

import Tag from '~/modules/Tag';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const Tags: FC = () => {
  return (
    <ControlPanelPage title='Теги'>
      <Tag />
    </ControlPanelPage>
  );
};

export default Tags;
