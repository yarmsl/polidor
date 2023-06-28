import { controlPanelAPI } from '~/store/service';

const storyAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addStory: build.mutation<IStory, IStoryDto>({
      query: (data) => ({
        url: '/story',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Story', 'User'],
    }),
    editStory: build.mutation<IStory, IEdit<IStoryDto>>({
      query: ({ id, dto }) => ({
        url: `/story/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Story'],
    }),
    deleteStory: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/story/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Story', 'User'],
    }),
    getAllStories: build.query<IStory[], void>({
      query: () => ({
        url: '/story/cp',
        method: 'GET',
      }),
      providesTags: ['Story'],
    }),
  }),
});

export const {
  useAddStoryMutation,
  useEditStoryMutation,
  useDeleteStoryMutation,
  useGetAllStoriesQuery,
} = storyAPI;
