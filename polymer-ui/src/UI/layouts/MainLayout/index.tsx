import { FC, Suspense, useMemo, lazy, memo } from 'react';
import { useRouteMatch } from 'react-router';

import { Container } from '@mui/material';

import Loading from '~/UI/atoms/Loading';
import MainBanner from '~/UI/molecules/MainBanner';

import { pages } from './consts';
import Header from '../Header';

const Footer = lazy(() => import('../Footer'));

const MainLayout: FC<Child> = ({ children }) => {
  const match = useRouteMatch();
  const showBanner = useMemo(
    () =>
      ['/', ...pages.map((page) => page.path).filter((path) => path !== '/contacts')].includes(
        match.path,
      ) && match.isExact,
    [match],
  );
  return (
    <>
      <Header />
      {showBanner && <MainBanner />}
      <Container maxWidth={false} sx={styles.root} disableGutters>
        <>{children}</>
      </Container>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

const styles: TStyles = {
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default memo(MainLayout);
