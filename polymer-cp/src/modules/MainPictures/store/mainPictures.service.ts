import { controlPanelAPI } from '~/store/service';

const mainPicturesAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addMainPicture: build.mutation<IMainPicture, FormData>({
      query: (request) => ({
        url: '/main_pictures',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['MainPicture', 'User'],
    }),
    deleteMainPicture: build.mutation<IMessage, string>({
      query: (mainPictureId) => ({
        url: `/main_pictures/${mainPictureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MainPicture', 'User'],
    }),
    getMainPictures: build.query<IMainPicture[], void>({
      query: () => ({
        url: '/main_pictures/cp',
        method: 'GET',
      }),
      providesTags: ['MainPicture'],
    }),
  }),
});

export const { useAddMainPictureMutation, useDeleteMainPictureMutation, useGetMainPicturesQuery } =
  mainPicturesAPI;
