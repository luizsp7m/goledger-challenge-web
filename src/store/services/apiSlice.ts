import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL, PASSWORD, USER } from "~/constants/Credentials";

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