import { controlPanelAPI } from '~/store/service';

const bannerAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addBanner: build.mutation<IBanner, FormData>({
      query: (bannerData) => ({
        url: '/banner',
        method: 'POST',
        body: bannerData,
      }),
      invalidatesTags: ['Banner'],
    }),
    editBanner: build.mutation<IBanner, IEditBanner>({
      query: (editBannerData) => ({
        url: `/banner/${editBannerData.id}`,
        method: 'PUT',
        body: editBannerData.data,
      }),
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: build.mutation<IMessage, string>({
      query: (bannerId) => ({
        url: `/banner/${bannerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
    getAllBanners: build.query<IBanner[], string>({
      query: () => ({
        url: '/banner',
        method: 'GET',
      }),
      providesTags: ['Banner'],
    }),
    editBottomBanner: build.mutation<IMessage, IEditBottomBanner>({
      query: (editBottomBannerReq) => ({
        url: '/banner/bottom',
        method: 'POST',
        body: editBottomBannerReq,
      }),
      invalidatesTags: ['BottomBanner'],
    }),
    getBottomBanner: build.query<IBottomBanner, string>({
      query: () => ({
        url: '/banner/bottom',
        method: 'GET',
      }),
      providesTags: ['BottomBanner'],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetAllBannersQuery,
  useEditBottomBannerMutation,
  useGetBottomBannerQuery,
} = bannerAPI;
