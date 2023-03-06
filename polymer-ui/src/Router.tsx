import { FC, lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import NotFound from './pages/404';
import Loading from './UI/atoms/Loading';
import MainLayout from './UI/layouts/MainLayout';

const About = lazy(() => import('./pages/AboutPage'));
const Contacts = lazy(() => import('./pages/ContactsPage'));
const Customer = lazy(() => import('./pages/CustomerPage'));
const Home = lazy(() => import('./pages/HomePage'));
const IndDesEngineering = lazy(() => import('./pages/IndDesEngineeringPage'));
const Production = lazy(() => import('./pages/ProductionPage'));
const Project = lazy(() => import('./pages/ProjectPage'));
const Projects = lazy(() => import('./pages/ProjectsPage'));
const Tags = lazy(() => import('./pages/TagsPage'));
const ScrollToTop = lazy(() => import('./UI/atoms/ScrollToTop'));

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={[
            '/',
            '/indastrial_design_and_engineering',
            '/production',
            '/about',
            '/contacts',
            '/projects',
            '/customer/:slug',
            '/project/:slug',
            '/tag/:slug',
          ]}
          exact
        >
          <MainLayout>
            <Suspense fallback={<Loading />}>
              <ScrollToTop />
              <Switch>
                <Route component={Home} path='/' exact />
                <Route
                  component={IndDesEngineering}
                  path='/indastrial_design_and_engineering'
                  exact
                />
                <Route component={Production} path='/production' exact />
                <Route component={About} path='/about' exact />
                <Route component={Contacts} path='/contacts' exact />
                <Route component={Projects} path='/projects' exact />
                <Route component={Customer} path='/customer/:slug' exact />
                <Route component={Project} path='/project/:slug' exact />
                <Route component={Tags} path='/tag/:slug' exact />
              </Switch>
            </Suspense>
          </MainLayout>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
