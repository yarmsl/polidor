import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';

import Router from '~/Router';
import ModalStack from '~/UI/atoms/ModalStack';
import useNotifier from '~/UI/atoms/Notifer';
import theme from '~/UI/theme';

const App = () => {
  useNotifier();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <ModalStack />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
