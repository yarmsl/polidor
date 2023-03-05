import { FC, memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import ControlPanelLayout from '~/UI/layouts/ControlPanelLayout';

import ArticlesCP from './pages/ArticlesCP';
import AuthPage from './pages/AuthPage';
import BannersCP from './pages/BannersCP';
import ControlPanel from './pages/ControlPanel';
import CustomersCP from './pages/CustomersCP';
import MailCP from './pages/MailCP';
import PresentationCP from './pages/PresentationCP';
import ProductionCP from './pages/ProductionCP';
import ProjectsCP from './pages/ProjectsCP';
import StoryArticleCP from './pages/StoryArticleCP';
import StoryCP from './pages/StoryCP';
import Tags from './pages/Tags';
import UserManagment from './pages/UserManagment';
import VacancyCP from './pages/VacancyCP';

interface IRoutesProps {
  isAuth: boolean;
  role: RoleTypes;
}

const Routes: FC<IRoutesProps> = ({ isAuth, role }) => {
  return (
    <Switch>
      <Route
        path={[
          '/',
          '/user_managment',
          '/tags',
          '/customers',
          '/projects',
          '/banners',
          '/mail',
          '/presentation',
          '/ind_des_engin_articles',
          '/production',
          '/stories',
          '/story_articles',
          '/vacancies',
          '/cp',
          '/castle',
        ]}
        exact
      >
        {isAuth ? (
          <ControlPanelLayout>
            <Switch>
              <Route component={ControlPanel} path='/castle' exact />
              {role !== 'user' && <Route component={UserManagment} path='/user_managment' exact />}
              <Route component={Tags} path='/tags' exact />
              <Route component={CustomersCP} path='/customers' exact />
              <Route component={ProjectsCP} path='/projects' exact />
              <Route component={BannersCP} path='/banners' exact />
              <Route component={MailCP} path='/mail' exact />
              <Route component={PresentationCP} path='/presentation' exact />
              <Route component={ArticlesCP} path='/ind_des_engin_articles' exact />
              <Route component={ProductionCP} path='/production' exact />
              <Route component={StoryCP} path='/stories' exact />
              <Route component={StoryArticleCP} path='/story_articles' exact />
              <Route component={VacancyCP} path='/vacancies' exact />
            </Switch>
          </ControlPanelLayout>
        ) : (
          <Route component={AuthPage} />
        )}
      </Route>
      <Route component={ControlPanel} />
    </Switch>
  );
};

export default memo(Routes);
