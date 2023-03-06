import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';

import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';

import App from './App';
import ErrorBoundary from './errorBoundary';
import appStore from './store';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <ErrorBoundary>
    <StoreProvider store={appStore}>
      <SnackbarProvider autoHideDuration={5000} maxSnack={5}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </SnackbarProvider>
    </StoreProvider>
  </ErrorBoundary>,
);
