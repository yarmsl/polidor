import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';

export const dataAPI = createApi({
  reducerPath: 'dataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
  }),
  endpoints: (build) => ({
    getProjectsData: build.query<IProject[], string>({
      query: () => ({
        url: '/project',
        method: 'GET',
      }),
    }),
    getTagsData: build.query<ITag[], string>({
      query: () => ({
        url: '/tag',
        method: 'GET',
      }),
    }),
    getCustomersData: build.query<ICustomer[], string>({
      query: () => ({
        url: '/customer',
        method: 'GET',
      }),
    }),
    getArticlesData: build.query<IArticle[], string>({
      query: () => ({
        url: '/article',
        method: 'GET',
      }),
    }),
    getProductionArticlesData: build.query<IProductionArticle[], string>({
      query: () => ({
        url: '/production/article',
        method: 'GET',
      }),
    }),
    getStoriesData: build.query<IStory[], string>({
      query: () => ({
        url: '/story',
        method: 'GET',
      }),
    }),
    getStoryArticlesData: build.query<IStoryArticle[], string>({
      query: () => ({
        url: '/storyarticle',
        method: 'GET',
      }),
    }),
    getVacanciesData: build.query<IVacancy[], string>({
      query: () => ({
        url: '/vacancy',
        method: 'GET',
      }),
    }),
    getBanners: build.query<IBanner[], string>({
      query: () => ({
        url: '/banner',
        method: 'GET',
      }),
    }),
    getBottomBanner: build.query<IBottomBanner, string>({
      query: () => ({
        url: '/banner/bottom',
        method: 'GET',
      }),
    }),
    sendFileToMail: build.mutation<IMessage, IWantFile>({
      query: (data) => ({
        url: '/mail/file',
        method: 'POST',
        body: data,
      }),
    }),
    feedback: build.mutation<IMessage, IFeedback>({
      query: (data) => ({
        url: '/mail/feedback',
        method: 'POST',
        body: data,
      }),
    }),
    getMainPictures: build.query<IMainPicture[], void>({
      query: () => ({
        url: '/main_pictures',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCustomersDataQuery,
  useGetProjectsDataQuery,
  useGetTagsDataQuery,
  useGetArticlesDataQuery,
  useGetProductionArticlesDataQuery,
  useGetStoriesDataQuery,
  useGetStoryArticlesDataQuery,
  useGetVacanciesDataQuery,
  useGetBannersQuery,
  useGetBottomBannerQuery,
  useSendFileToMailMutation,
  useFeedbackMutation,
  useGetMainPicturesQuery,
} = dataAPI;
