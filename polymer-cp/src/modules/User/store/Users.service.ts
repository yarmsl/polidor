import { controlPanelAPI } from '~/store/service';

const usersAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IMessage, formSignUp>({
      query: (signData) => ({
        url: '/user/signup',
        method: 'POST',
        body: signData,
      }),
      invalidatesTags: ['User'],
    }),
    editUserById: build.mutation<IMessage, IEditUserById>({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: build.mutation<IMessage, IEditPassword>({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: 'PUT',
        body: { password: data.password },
      }),
    }),
    getAllUsers: build.query<IUserResponse[], string>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    removeUser: build.mutation<IMessage, IDeleteUser>({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useEditUserByIdMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useRemoveUserMutation,
} = usersAPI;
