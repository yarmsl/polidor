import { controlPanelAPI } from '~/store/service';

const fileAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addFile: build.mutation<IMessage, FormData>({
      query: (data) => ({
        url: '/file',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['File', 'User'],
    }),
    deleteFile: build.mutation<IMessage, string>({
      query: () => ({
        url: '/file',
        method: 'DELETE',
      }),
      invalidatesTags: ['File', 'User'],
    }),
    getFileInfo: build.query<IPresFileFull, string>({
      query: () => ({
        url: '/file/cp',
        method: 'GET',
      }),
      providesTags: ['File'],
    }),
  }),
});

export const { useAddFileMutation, useDeleteFileMutation, useGetFileInfoQuery } = fileAPI;
