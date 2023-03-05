import { FC } from 'react';

import Production from '~/modules/Production';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const ProductionCP: FC = () => {
  return (
    <ControlPanelPage title='Статьи - Производство'>
      <Production />
    </ControlPanelPage>
  );
};

export default ProductionCP;
