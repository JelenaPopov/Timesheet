import { apiSlice } from '../../app/apiSlice';
import { User } from '../auth/authSlice';
import { Client } from '../clients/clientsSlice';

export interface Project {
  id: number
  version: number
  name: string,
  description: string,
  client: Client, 
  teamLead: User
}

export interface EmployeeOnProject {
  id: string | null,
  projectId: number | undefined,
  employee: User,
  startDate: string,
  endDate: string
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<{ projects: Project[], totalPages: number }, number>({
      query: (pageNo = 0) => `/projects?pageNo=${pageNo - 1}&pageSize=6`,
      transformResponse(projects: Project[], meta) {
        return { projects, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Projects']
    }),
    getAllUserProjects: builder.query<Project[], string>({
      query: (date) => `/projects/filtered-by-employee?date=${date}`,
      providesTags: ['User Projects']
    }),
    getProject: builder.query({
      query: (postId) => `/projects/${postId}`,
      providesTags: ['Projects']
    }),
    addNewProject: builder.mutation({
      query: (initialProject) => ({
        url: '/projects',
        method: 'POST',
        body: initialProject,
      }),
      invalidatesTags: ['Projects', 'User Projects']
    }),
    editProject: builder.mutation({
      query: (category) => ({
        url: `projects/${category.id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Projects', 'User Projects']
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Projects', 'User Projects']
    }),
    assignEmployeeToProject: builder.mutation({
      query: (data: EmployeeOnProject) => ({
        url: `/projects/${data.projectId}/employees`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Employees on Project', 'User Projects']
    }),
    getEmployeesOnProject: builder.query<{ employeesOnProject: EmployeeOnProject[], totalPages: number }, {pageNo: number, projectId: number}>({
      query: ({pageNo = 0, projectId}) => `/projects/${projectId}/employees?pageNo=${pageNo - 1}&pageSize=6`,
      transformResponse(employeesOnProject: EmployeeOnProject[], meta) {
        return { employeesOnProject, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Employees on Project', 'User Projects']
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useGetAllUserProjectsQuery,
  useGetProjectQuery,
  useAddNewProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useAssignEmployeeToProjectMutation, 
  useGetEmployeesOnProjectQuery
} = extendedApiSlice


