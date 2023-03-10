import { createSlice } from '@reduxjs/toolkit';

export const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },

  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },

    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
  },
});

export const { setCarts } = cartsSlice.actions;

export default cartsSlice.reducer;
