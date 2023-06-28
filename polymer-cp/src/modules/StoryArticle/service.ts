import { controlPanelAPI } from '~/store/service';

const storyArticleAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addStoryArticle: build.mutation<IStoryArticle, IStoryArticleDto>({
      query: (data) => ({
        url: '/storyarticle',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['StoryArticle', 'User'],
    }),
    editStoryArticle: build.mutation<IStoryArticle, IEdit<IStoryArticleDto>>({
      query: ({ id, dto }) => ({
        url: `/storyarticle/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['StoryArticle'],
    }),
    deleteStoryArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/storyarticle/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StoryArticle', 'User'],
    }),
    getAllStoryArticles: build.query<IStoryArticle[], void>({
      query: () => ({
        url: '/storyarticle/cp',
        method: 'GET',
      }),
      providesTags: ['StoryArticle'],
    }),
  }),
});

export const {
  useAddStoryArticleMutation,
  useEditStoryArticleMutation,
  useDeleteStoryArticleMutation,
  useGetAllStoryArticlesQuery,
} = storyArticleAPI;
