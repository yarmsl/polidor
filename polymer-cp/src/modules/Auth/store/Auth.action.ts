import { batch } from 'react-redux';

import { controlPanelAPI } from '~/store/service';

import { resetAuth } from '.';

export const logout = () => {
  return (dispatch: (arg0: unknown) => void): void => {
    batch(() => {
      dispatch(resetAuth());
      dispatch(controlPanelAPI.util.resetApiState());
    });
  };
};
