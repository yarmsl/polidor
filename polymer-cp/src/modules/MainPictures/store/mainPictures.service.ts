import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const mainPicturesAPI = createApi({
  reducerPath: 'mainPicturesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/main_pictures`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['MainPicture'],
  endpoints: (build) => ({
    addMainPicture: build.mutation<IMainPicture, FormData>({
      query: (request) => ({
        url: '/',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['MainPicture'],
    }),
    deleteMainPicture: build.mutation<IMessage, string>({
      query: (mainPictureId) => ({
        url: `/${mainPictureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MainPicture'],
    }),
    getMainPictures: build.query<IMainPicture[], void>({
      query: () => ({
        url: '/cp',
        method: 'GET',
      }),
      providesTags: ['MainPicture'],
    }),
  }),
});

export const { useAddMainPictureMutation, useDeleteMainPictureMutation, useGetMainPicturesQuery } =
  mainPicturesAPI;
