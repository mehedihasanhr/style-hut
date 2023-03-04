import { apiSlice } from '../../app/api/apiSlice'

export const sliderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => '/hero-slider',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSlidersQuery } = sliderApiSlice
