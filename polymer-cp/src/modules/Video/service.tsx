import { controlPanelAPI } from '~/store/service';

const videoAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addVideo: build.mutation<IVideo, IVideoDto>({
      query: (dto) => ({
        url: '/videos',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Video', 'Project', 'User'],
    }),
    editVideo: build.mutation<IVideo, IEdit<Partial<IVideoDto>>>({
      query: ({ id, dto }) => ({
        url: `/videos/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Video', 'Project'],
    }),
    deleteVideo: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Video', 'Project', 'User'],
    }),
    getAllVideos: build.query<IVideoFull[], void>({
      query: () => ({
        url: '/videos/cp',
        method: 'GET',
      }),
      providesTags: ['Video'],
    }),
  }),
});

export const {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useEditVideoMutation,
  useGetAllVideosQuery,
} = videoAPI;
