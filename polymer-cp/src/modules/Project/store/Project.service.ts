import { controlPanelAPI } from '~/store/service';

const projectAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addProject: build.mutation<IProject, FormData>({
      query: (projectData) => ({
        url: '/project',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['Project', 'YoutubeVideo', 'Customer', 'User', 'Tag'],
    }),
    editProject: build.mutation<IProject, IEditProject>({
      query: (editTagData) => ({
        url: `/project/${editTagData.id}`,
        method: 'PUT',
        body: editTagData.data,
      }),
      invalidatesTags: ['Project', 'YoutubeVideo', 'Customer', 'User', 'Tag'],
    }),
    deleteProject: build.mutation<IMessage, string>({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project', 'YoutubeVideo', 'Customer', 'User', 'Tag'],
    }),
    getAllProjects: build.query<IProjectFull[], void>({
      query: () => ({
        url: '/project/cp',
        method: 'GET',
      }),
      providesTags: ['Project'],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} = projectAPI;
