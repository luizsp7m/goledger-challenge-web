import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const USER_NAME = import.meta.env.VITE_USER_NAME
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD

const credentials = btoa(`${USER_NAME}:${USER_PASSWORD}`);

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Basic ${credentials}`)

    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['artists', 'albums', 'songs', 'playlists'],
})