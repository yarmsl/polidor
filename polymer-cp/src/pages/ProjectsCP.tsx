import { ReactElement } from 'react';
import { FC } from 'react';

import Project from '~/modules/Project';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const ProjectsCP: FC = () => {
  return (
    <ControlPanelPage title='Проекты'>
      <Project />
    </ControlPanelPage>
  );
};

export default ProjectsCP;
