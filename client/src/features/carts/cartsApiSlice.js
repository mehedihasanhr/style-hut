import { apiSlice } from '../../app/api/apiSlice';

export const cartsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // mutation
    addCart: builder.mutation({
      query: (cart) => ({
        url: '/carts',
        method: 'POST',
        body: cart,
      }),

      invalidatesTags: ['Cart'],

      async onQueryStarted(cart, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          cartsApiSlice.util.updateQueryData('getCart', (draft) => {
            draft.carts.push(data);
          }),
        );
      },
    }),
  }),
});

export const { useAddCartMutation } = cartsApiSlice;
