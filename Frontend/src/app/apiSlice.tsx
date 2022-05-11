import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.set('X-Auth-Token', JSON.parse(token))
    }
    return headers
  },
})

export interface UserLogin {
  username: String
  password: String
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Categories', 'Clients'],
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string | undefined | null }, UserLogin>({
      query: (userLoginInfo: UserLogin) => ({
        url: '/auth/login',
        method: 'POST',
        body: userLoginInfo,
      }),
      transformResponse(_, meta) {
        return { token: meta?.response?.headers.get('X-Auth-Token') };
      }
    })
  }),
})

export const { useSignInMutation} = apiSlice
