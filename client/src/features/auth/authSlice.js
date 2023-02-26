import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: {
    token: null,
    user: null,
  },
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.auth = action.payload
    },

    logout(state) {
      state.auth = { token: null, user: null }
    },

    setLoading(state, action) {
      state.loading = action.payload
    },

    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const { setCredentials, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer
