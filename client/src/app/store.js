import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from '../features/auth/authSlice';
import categoriesSlice from '../features/categories/categoriesSlice';
import productsSlice from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    categories: categoriesSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:
    process.env.NODE_ENV !== 'production' ? true : false,
});
