import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER = import.meta.env.VITE_USER;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const credentials = btoa(`${USER}:${PASSWORD}`);

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Basic ${credentials}`)
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["artists", "albums", "songs", "playlists"],
})