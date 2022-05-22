import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { setNewValue } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.set('X-Auth-Token', token);
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    window.localStorage.removeItem('token');
    api.dispatch(setNewValue(null));
    api.dispatch(apiSlice.util.resetApiState());
  }
  return result
}

export interface UserLogin {
  username: String
  password: String
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories', 'Clients', 'Projects','User Projects', 'Users', 'Employees on Project', 'Logged Hours','Logged Hours for some period'],
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

export const { useSignInMutation } = apiSlice
