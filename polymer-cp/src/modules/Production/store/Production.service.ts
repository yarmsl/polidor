import { controlPanelAPI } from '~/store/service';

const productionAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addProductionArticle: build.mutation<IProductionArticleFull, IAddProductionArticle>({
      query: (data) => ({
        url: '/production/article',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Production', 'User'],
    }),
    editProductionArticle: build.mutation<IProductionArticleFull, IEditProductionArticle>({
      query: (data) => ({
        url: `/production/article/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['Production'],
    }),
    deleteProductionArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/production/article/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Production', 'User'],
    }),
    getAllProductionArticles: build.query<IProductionArticleFull[], string>({
      query: () => ({
        url: '/production/article/cp',
        method: 'GET',
      }),
      providesTags: ['Production'],
    }),
    addProductionStep: build.mutation<IStepFull, FormData>({
      query: (data) => ({
        url: '/production/step',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Production', 'User'],
    }),
    editProductionStep: build.mutation<IStepFull, IEditStep>({
      query: (data) => ({
        url: `/production/step/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['Production'],
    }),
    deleteProductionStep: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/production/step/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Production', 'User'],
    }),
    getAllSteps: build.query<IStepFull[], string>({
      query: () => ({
        url: '/production/step/cp',
        method: 'GET',
      }),
      providesTags: ['Production'],
    }),
  }),
});

export const {
  useAddProductionArticleMutation,
  useEditProductionArticleMutation,
  useDeleteProductionArticleMutation,
  useGetAllProductionArticlesQuery,
  useAddProductionStepMutation,
  useEditProductionStepMutation,
  useDeleteProductionStepMutation,
  useGetAllStepsQuery,
} = productionAPI;
