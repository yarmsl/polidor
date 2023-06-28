import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '~/modules/Auth/store';

import { rtkQueryErrorLogger } from './middlewares';
import { ModalStackReducer } from './ModalStack';
import { notificationsReducer } from './Notifications';
import { controlPanelAPI } from './service';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notifications: notificationsReducer,
  modalStack: ModalStackReducer,
  [controlPanelAPI.reducerPath]: controlPanelAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rtkQueryErrorLogger,
      controlPanelAPI.middleware,
    ),
});

export * from './hooks';
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore['dispatch'];
export default appStore;
