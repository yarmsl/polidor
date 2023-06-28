import { controlPanelAPI } from '~/store/service';

const mailAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addMails: build.mutation<IMessage, IAddMails>({
      query: (data) => ({
        url: '/mail',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Mail'],
    }),
    sendFileToMail: build.mutation<IMessage, IWantFile>({
      query: (data) => ({
        url: '/mail/file',
        method: 'POST',
        body: data,
      }),
    }),
    feedback: build.mutation<IMessage, Ifeedback>({
      query: (data) => ({
        url: '/mail/feedback',
        method: 'POST',
        body: data,
      }),
    }),
    deleteMails: build.mutation<IMessage, void>({
      query: () => ({
        url: '/mail',
        method: 'DELETE',
      }),
      invalidatesTags: ['Mail'],
    }),
    getMails: build.query<IMails, void>({
      query: () => ({
        url: '/mail/cp',
        method: 'GET',
      }),
      providesTags: ['Mail'],
    }),
  }),
});

export const {
  useAddMailsMutation,
  useSendFileToMailMutation,
  useFeedbackMutation,
  useDeleteMailsMutation,
  useGetMailsQuery,
} = mailAPI;
