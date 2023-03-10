import { apiSlice } from '../../app/api/apiSlice';
import {
  addProduct,
  addProducts,
  updateStatus,
} from './productsSlice';

import {
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

// product adapter
export const productsAdapter = createEntityAdapter({
  selectId: (product) => product._id,
  sortComparer: (a, b) =>
    a.createdAt.localeCompare(b.createdAt),
});

// product api slice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all products
    getProducts: builder.query({
      query: () => `/products`,
      providesTags: ['Products'],
      transformResponse: (res) => {
        // add products to store
        return productsAdapter.setAll(
          productsAdapter.getInitialState(),
          res.data,
        );
      },

      onQueryStarted: (
        args,
        { dispatch, queryFulfilled },
      ) => {
        // update status
        dispatch(updateStatus('loading'));
        queryFulfilled.then((result) => {
          // add products to store
          dispatch(updateStatus('idle'));
          dispatch(addProducts(result.data));
        });
      },
    }),
  }),
});

// export hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApiSlice;

// create selector for products result
export const selectProductsResult =
  productsApiSlice.endpoints.getProducts.select();

// create selector for products
export const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data,
);

// create selector for products
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors(
  (state) =>
    selectProductsData(state) ??
    productsAdapter.getInitialState(),
);
