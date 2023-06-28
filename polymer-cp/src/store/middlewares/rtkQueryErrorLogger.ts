import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { AppDispatch } from '..';
import { showWarningSnackbar } from '../Notifications';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI<AppDispatch>) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(showWarningSnackbar(action?.payload?.data?.message || 'Неизвестная ошибка'));
    }

    return next(action);
  };
