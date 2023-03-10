import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },

  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
    },

    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },

    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { addProduct, addProducts, updateStatus } =
  productsSlice.actions;

export default productsSlice.reducer;
