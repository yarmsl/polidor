import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { articleAPI } from '~/modules/Articles/store';
import { authReducer, authAPI } from '~/modules/Auth/store';
import { bannerAPI } from '~/modules/Banners/store';
import { customerAPI } from '~/modules/Customer/store';
import { mailAPI } from '~/modules/Mail/store';
import { fileAPI } from '~/modules/PresentationFile/store';
import { productionAPI } from '~/modules/Production/store';
import { projectAPI } from '~/modules/Project/store';
import { storyAPI } from '~/modules/Story/store';

import { ModalStackReducer } from './ModalStack';
import { notificationsReducer } from './Notifications';
import { storyArticleAPI } from '../modules/StoryArticle/store';
import { tagAPI } from '../modules/Tag/store';
import { usersAPI } from '../modules/User/store';
import { vacancyAPI } from '../modules/Vacancies/store';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notifications: notificationsReducer,
  modalStack: ModalStackReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [bannerAPI.reducerPath]: bannerAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [customerAPI.reducerPath]: customerAPI.reducer,
  [tagAPI.reducerPath]: tagAPI.reducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
  [mailAPI.reducerPath]: mailAPI.reducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
  [articleAPI.reducerPath]: articleAPI.reducer,
  [productionAPI.reducerPath]: productionAPI.reducer,
  [storyAPI.reducerPath]: storyAPI.reducer,
  [storyArticleAPI.reducerPath]: storyArticleAPI.reducer,
  [vacancyAPI.reducerPath]: vacancyAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      bannerAPI.middleware,
      usersAPI.middleware,
      customerAPI.middleware,
      tagAPI.middleware,
      projectAPI.middleware,
      mailAPI.middleware,
      fileAPI.middleware,
      articleAPI.middleware,
      productionAPI.middleware,
      storyAPI.middleware,
      storyArticleAPI.middleware,
      vacancyAPI.middleware,
    ),
});

export * from './hooks';
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore['dispatch'];
export default appStore;
