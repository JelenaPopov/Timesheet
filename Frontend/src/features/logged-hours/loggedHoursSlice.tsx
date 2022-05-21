import { apiSlice } from '../../app/apiSlice';
import { Category } from '../categories/categoriesSlice';
import { Project } from '../projects/projectsSlice';

export interface LoggedHours {
  id: number
  version: number
  project: Project
  category: Category
  description: string
  hours: number,
  created: string
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLoggedHours: builder.query<{ loggedHours: LoggedHours[], totalPages: number }, {pageNo: number, created: string | null}>({
      query: (arg) => {
        let { pageNo, created } = arg;
        return {
            url: `/logged-hours?pageNo=${pageNo - 1}&pageSize=6&created=${created}`
        }
      },
      transformResponse(loggedHours: LoggedHours[], meta) {
        return { loggedHours, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Logged Hours']
    }),
    getLoggedHours: builder.query({
      query: (postId) => `/logged-hours/${postId}`,
      providesTags: ['Logged Hours']
    }),
    addNewLoggedHours: builder.mutation({
      query: (initialLoggedHours) => ({
        url: '/logged-hours',
        method: 'POST',
        body: initialLoggedHours,
      }),
      invalidatesTags: ['Logged Hours']
    }),
    editLoggedHours: builder.mutation({
      query: (loggedHours) => ({
        url: `logged-hours/${loggedHours.id}`,
        method: 'PUT',
        body: loggedHours,
      }),
      invalidatesTags: ['Logged Hours']
    }),
    deleteLoggedHours: builder.mutation({
      query: (id) => ({
        url: `logged-hours/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Logged Hours']
    })
  }),
})

export const {
  useGetAllLoggedHoursQuery,
  useGetLoggedHoursQuery,
  useAddNewLoggedHoursMutation,
  useEditLoggedHoursMutation,
  useDeleteLoggedHoursMutation
} = extendedApiSlice


