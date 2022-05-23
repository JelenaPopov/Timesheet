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
            url: `/logged-hours?pageNo=${pageNo - 1}&pageSize=6&createdAt=${created}`
        }
      },
      transformResponse(loggedHours: LoggedHours[], meta) {
        return { loggedHours, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Logged Hours']
    }),
    getAllLoggedHoursForSomePeriod: builder.query<LoggedHours[], {startDate: string, endDate: string}>({
      query: (arg) => {
        let { startDate, endDate } = arg;
        return {
            url: `/logged-hours/all?startDate=${startDate}&endDate=${endDate}`
        }
      },
      providesTags: ['Logged Hours for certain time period']
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
      invalidatesTags: ['Logged Hours', 'Logged Hours for certain time period']
    }),
    editLoggedHours: builder.mutation({
      query: (loggedHours) => ({
        url: `logged-hours/${loggedHours.id}`,
        method: 'PUT',
        body: loggedHours,
      }),
      invalidatesTags: ['Logged Hours', 'Logged Hours for certain time period']
    }),
    deleteLoggedHours: builder.mutation({
      query: (id) => ({
        url: `logged-hours/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Logged Hours', 'Logged Hours for certain time period']
    })
  }),
})

export const {
  useGetAllLoggedHoursQuery,
  useGetAllLoggedHoursForSomePeriodQuery,
  useGetLoggedHoursQuery,
  useAddNewLoggedHoursMutation,
  useEditLoggedHoursMutation,
  useDeleteLoggedHoursMutation
} = extendedApiSlice


