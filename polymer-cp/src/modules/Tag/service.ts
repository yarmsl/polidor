import { controlPanelAPI } from '~/store/service';

const tagAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addTag: build.mutation<ITag, ITagDto>({
      query: (tagData) => ({
        url: '/tag',
        method: 'POST',
        body: tagData,
      }),
      invalidatesTags: ['Tag', 'User', 'Project'],
    }),
    editTag: build.mutation<ITag, IEdit<ITagDto>>({
      query: ({ id, dto }) => ({
        url: `/tag/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Tag', 'Project'],
    }),
    deleteTag: build.mutation<IMessage, string>({
      query: (tagId) => ({
        url: `/tag/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag', 'Project', 'User'],
    }),
    getAllTags: build.query<ITag[], void>({
      query: () => ({
        url: '/tag/cp',
        method: 'GET',
      }),
      providesTags: ['Tag'],
    }),
  }),
});

export const { useAddTagMutation, useEditTagMutation, useDeleteTagMutation, useGetAllTagsQuery } =
  tagAPI;
