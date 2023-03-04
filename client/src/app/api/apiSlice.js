import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../../features/auth/authSlice'

// baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// baseQueryWithAuth
const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    // store the new token
    if (refreshResult.data) {
      const { token } = refreshResult.data.data
      const auth = api.getState().auth
      api.dispatch(setCredentials({ ...auth, token }))
    }
    // retry the original request
    result = await baseQuery(args, api, extraOptions)
  } else {
    api.dispatch(logout())
  }
  return result
}

// createApi
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
})
