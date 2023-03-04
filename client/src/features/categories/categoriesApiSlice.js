import { apiSlice } from '../../app/api/apiSlice'
import { setCategories } from './categoriesSlice'

// Define a service using a base URL and expected endpoints
export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      // Use the `setCategories` action defined in the categoriesSlice
      // to update the categories state
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(setCategories(result.data.data))
        })
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoriesQuery } = categoriesApiSlice
