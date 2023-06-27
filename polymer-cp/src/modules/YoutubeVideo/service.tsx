import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const youtubeVideoAPI = createApi({
  reducerPath: 'youtubeVideoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/youtube_videos`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['YoutubeVideo'],
  endpoints: (build) => ({
    addYouTubeVideo: build.mutation<IYoutubeVideo, IYoutubeVideoDto>({
      query: (dto) => ({
        url: '/',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['YoutubeVideo'],
    }),
    editYouTubeVideo: build.mutation<IYoutubeVideo, { id: string; dto: Partial<IYoutubeVideoDto> }>(
      {
        query: ({ id, dto }) => ({
          url: `/${id}`,
          method: 'PUT',
          body: dto,
        }),
        invalidatesTags: ['YoutubeVideo'],
      },
    ),
    deleteYouTubeVideo: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['YoutubeVideo'],
    }),
    getAllYouTubeVideos: build.query<IYoutubeVideoFull[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['YoutubeVideo'],
    }),
  }),
});

export const {
  useAddYouTubeVideoMutation,
  useDeleteYouTubeVideoMutation,
  useEditYouTubeVideoMutation,
  useGetAllYouTubeVideosQuery,
} = youtubeVideoAPI;
