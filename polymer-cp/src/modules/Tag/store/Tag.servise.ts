import { controlPanelAPI } from '~/store/service';

const tagAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addTag: build.mutation<ITag, IAddTag>({
      query: (tagData) => ({
        url: '/tag',
        method: 'POST',
        body: tagData,
      }),
      invalidatesTags: ['Tag', 'User'],
    }),
    editTag: build.mutation<ITag, IEditTag>({
      query: (editTagData) => ({
        url: `/tag/${editTagData.id}`,
        method: 'PUT',
        body: editTagData.data,
      }),
      invalidatesTags: ['Tag'],
    }),
    deleteTag: build.mutation<IMessage, string>({
      query: (tagId) => ({
        url: `/tag/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag', 'Project', 'User'],
    }),
    getAllTags: build.query<ITagFull[], string>({
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
