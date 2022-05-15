import { apiSlice } from '../../app/apiSlice';

export interface Client {
  id: number
  version: number
  firstName: string
  lastName: string
  country: string
  city: string
  street: string
  postalCode: string
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<{ clients: Client[], totalPages: number }, number>({
      query: (pageNo = 0) => `/clients?pageNo=${pageNo - 1}&pageSize=6`,
      transformResponse(clients: Client[], meta) {
        return { clients, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Clients']
    }),
    getAllClients: builder.query({
      query: () => `/clients/all`,
      providesTags: ['Clients']
    }),
    getClient: builder.query({
      query: (postId) => `/clients/${postId}`,
      providesTags: ['Clients']
    }),
    addNewClient: builder.mutation({
      query: (initialClient) => ({
        url: '/clients',
        method: 'POST',
        body: initialClient,
      }),
      invalidatesTags: ['Clients']
    }),
    editClient: builder.mutation({
      query: (client) => ({
        url: `clients/${client.id}`,
        method: 'PUT',
        body: client,
      }),
      invalidatesTags: ['Clients']
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Clients']
    })
  }),
})

export const {
  useGetClientsQuery,
  useGetAllClientsQuery,
  useGetClientQuery,
  useAddNewClientMutation,
  useEditClientMutation,
  useDeleteClientMutation
} = extendedApiSlice


