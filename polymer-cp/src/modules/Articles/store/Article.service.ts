import { controlPanelAPI } from '~/store/service';

const articleAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addArticle: build.mutation<IArticleFull, FormData>({
      query: (data) => ({
        url: '/article',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Article', 'User'],
    }),

    editArticle: build.mutation<IArticleFull, IEditArticle>({
      query: (data) => ({
        url: `/article/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/article/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article', 'User'],
    }),
    getAllArticles: build.query<IArticleFull[], string>({
      query: () => ({
        url: '/article/cp',
        method: 'GET',
      }),
      providesTags: ['Article'],
    }),
  }),
});

export const {
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} = articleAPI;
