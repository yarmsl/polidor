import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const ScrollToTop = withRouter(({ history }: { history: any }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
});
