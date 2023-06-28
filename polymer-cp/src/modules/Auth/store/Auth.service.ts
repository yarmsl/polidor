import { controlPanelAPI } from '~/store/service';

const authAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<IUser, formSignIn>({
      query: (signData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: signData,
      }),
      invalidatesTags: ['User'],
    }),
    checkAuth: build.query<IUser, string>({
      query: () => ({
        url: '/auth',
      }),
    }),
  }),
});

export const { useSignInMutation, useCheckAuthQuery } = authAPI;
