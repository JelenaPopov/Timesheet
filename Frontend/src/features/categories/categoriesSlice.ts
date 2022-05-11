import { apiSlice } from '../../app/apiSlice';

export interface Category {
  id: number
  version: number
  name: string
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ categories: Category[], totalPages: number }, number>({
      query: (pageNo = 0) => `/categories?pageNo=${pageNo - 1}&pageSize=6`,
      transformResponse(categories: Category[], meta) {
        return { categories, totalPages: Number(meta?.response?.headers.get('Total-Pages')) }
      },
      providesTags: ['Categories']
    }),
    getCategory: builder.query({
      query: (postId) => `/categories/${postId}`,
      providesTags: ['Categories']
    }),
    addNewCategory: builder.mutation({
      query: (initialCategory) => ({
        url: '/categories',
        method: 'POST',
        body: initialCategory,
      }),
      invalidatesTags: ['Categories']
    }),
    editCategory: builder.mutation({
      query: (category) => ({
        url: `categories/${category.id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    })
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation
} = extendedApiSlice


