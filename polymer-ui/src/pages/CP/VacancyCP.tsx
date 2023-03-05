import { ReactElement } from 'react';
import { FC } from 'react';

import Vacancies from '~/modules/Vacancies';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const VacancyCP: FC = () => {
  return (
    <ControlPanelPage title='Вакансии'>
      <Vacancies />
    </ControlPanelPage>
  );
};

export default VacancyCP;
