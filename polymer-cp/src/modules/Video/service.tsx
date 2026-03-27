import { controlPanelAPI } from '~/store/service';

const videoAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addYouTubeVideo: build.mutation<IVideo, IVideoDto>({
      query: (dto) => ({
        url: '/videos',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Video', 'Project', 'User'],
    }),
    editYouTubeVideo: build.mutation<IVideo, IEdit<Partial<IVideoDto>>>({
      query: ({ id, dto }) => ({
        url: `/videos/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Video', 'Project'],
    }),
    deleteYouTubeVideo: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Video', 'Project', 'User'],
    }),
    getAllYouTubeVideos: build.query<IVideoFull[], void>({
      query: () => ({
        url: '/videos',
        method: 'GET',
      }),
      providesTags: ['Video'],
    }),
  }),
});

export const {
  useAddYouTubeVideoMutation,
  useDeleteYouTubeVideoMutation,
  useEditYouTubeVideoMutation,
  useGetAllYouTubeVideosQuery,
} = videoAPI;
