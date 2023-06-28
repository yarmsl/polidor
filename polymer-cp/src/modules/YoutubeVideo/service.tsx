import { controlPanelAPI } from '~/store/service';

const youtubeVideoAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addYouTubeVideo: build.mutation<IYoutubeVideo, IYoutubeVideoDto>({
      query: (dto) => ({
        url: '/youtube_videos',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['YoutubeVideo', 'Project', 'User'],
    }),
    editYouTubeVideo: build.mutation<IYoutubeVideo, IEdit<Partial<IYoutubeVideoDto>>>({
      query: ({ id, dto }) => ({
        url: `/youtube_videos/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['YoutubeVideo', 'Project'],
    }),
    deleteYouTubeVideo: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/youtube_videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['YoutubeVideo', 'Project', 'User'],
    }),
    getAllYouTubeVideos: build.query<IYoutubeVideoFull[], void>({
      query: () => ({
        url: '/youtube_videos',
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
