import { controlPanelAPI } from '~/store/service';

const vacancyAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addVacancy: build.mutation<IVacancy, IVacancyDto>({
      query: (data) => ({
        url: '/vacancy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Vacancy', 'User'],
    }),
    editVacancy: build.mutation<IVacancy, IEdit<IVacancyDto>>({
      query: ({ id, dto }) => ({
        url: `/vacancy/${id}`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Vacancy'],
    }),
    deleteVacancy: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/vacancy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacancy', 'User'],
    }),
    getAllVacancies: build.query<IVacancy[], void>({
      query: () => ({
        url: '/vacancy/cp',
        method: 'GET',
      }),
      providesTags: ['Vacancy'],
    }),
  }),
});

export const {
  useAddVacancyMutation,
  useEditVacancyMutation,
  useDeleteVacancyMutation,
  useGetAllVacanciesQuery,
} = vacancyAPI;
