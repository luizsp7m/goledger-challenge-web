import { apiSlice } from "./apiSlice";

export const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      providesTags: ["artists"],
      query: () => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "artist"
            }
          }
        }
      })
    })
  })
})

export const {
  useLazyGetArtistsQuery
} = artistsApiSlice