import { apiSlice } from '../../app/apiSlice';

export interface User {
    id: number
    version: number
    firstName: string
    lastName: string
    weeklyWorkingHours: number
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/users/all`,
            providesTags: ['Users']
        }),
    }),
})

export const {
    useGetAllUsersQuery
} = extendedApiSlice
