import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const controlPanelAPI = createApi({
  reducerPath: 'controlPanelAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'YoutubeVideo',
    'Project',
    'User',
    'Article',
    'Banner',
    'BottomBanner',
    'Customer',
    'Mail',
    'MainPicture',
    'File',
    'Production',
    'Story',
    'StoryArticle',
    'Tag',
    'Vacancy',
  ],
  endpoints: () => ({}),
});
