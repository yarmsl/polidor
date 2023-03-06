import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataAPI } from './Data';
import { ModalStackReducer } from './ModalStack';
import { notificationsReducer } from './Notifications';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  modalStack: ModalStackReducer,
  [dataAPI.reducerPath]: dataAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(dataAPI.middleware),
});

export * from './hooks';
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore['dispatch'];
export default appStore;
